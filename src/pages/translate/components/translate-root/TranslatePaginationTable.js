import React, { Component } from 'react'
import PaginationTable from 'components/PaginationTable'
import { actions } from 'mirrorx';
import { Button,Message,Modal, Loading } from 'tinper-bee';
import Select from 'bee-select';
import moment from "moment/moment";
import Header from 'components/Header';
import TranslateForm from '../translate-form';
import AcExport from '../translate-export';
import AcUpload from 'ac-upload';
import 'ac-upload/build/ac-upload.css';
import './index.less'
export default class TranslatePaginationTable extends Component {
    constructor(props){
        super(props);
        let self=this;
        this.state = {
            // 表格中所选中的数据，拿到后可以去进行增删改查
            selectData: [],
            step: 10,
            showModal:false,
            delData:[],
            column:[

                {
                    title: "资源编码",
                    dataIndex: "propertyCode",
                    key: "propertyCode",
                     width:200,
                },
                
                {
                    title: "中文",
                    dataIndex: "chinese",
                    key: "chinese",
                     width:200,
                },
                {
                    title: "中文繁体",
                    dataIndex: "traditional",
                    key: "traditional",
                     width:200,
                },
                
                {
                    title: "英文",
                    dataIndex: "english",
                    key: "english",
                     width:200,
                },
                {
                    title: "法文",
                    dataIndex: "french",
                    key: "french",
                    render(text, record, index) {
                        return (
                            <div >
                                {text == null || text == "null" || text == ""  ? "" : text}
                            </div>
                        )
                    }  
                },
                {
                    title: "操作",
                    dataIndex: "d",
                    key: "d",
                    width:200,
                    fixed: "right",
                    render(text, record, index) {
                        return (
                            <div className='operation-btn'>
                                <i size='sm' className='uf uf-search edit-btn' onClick={() => { self.cellClick(record,2) }}></i>
                                <i size='sm' className='uf uf-pencil edit-btn' onClick={() => { self.cellClick(record,1) }}></i>
                                {/*<i size='sm' className='uf uf-del del-btn' onClick={() => { self.delItem(record, index) }}></i>*/}
                            </div>
                        )
                    }
                }
            ]
        }
    }
    
    componentDidMount(){
        // this.setState({ step: this.props.pageSize })
        actions.translate.loadList();//table数据
    }

    tabelSelect = (data) => {//tabel选中数据
        this.setState({
            selectData: data
        })
    }
    /**
     * 编辑,详情，增加
     */

    cellClick = async (record,btnFlag) => {
        await actions.translate.updateState({
            rowData : record,
        });

        let id = "";
        if(record){
            id = record["id"];
        }
        actions.routing.push(
            {
                pathname: 'translate-edit',
                search:`?search_id=${id}&btnFlag=${btnFlag}`
            }
        )
    }

    // 删除操作
    delItem = (record, index) => {
        this.setState({
            showModal:true,
            delData:[{ id: record.id,ts: record.ts }]
        });

    }

    // 表格勾选回调函数，返回选中数据
    onTableSelectedData = data => {

        this.setState({
            selectData: data
        })
    }

    // 分页单页数据条数选择函数
    onPageSizeSelect = (index, value) => {
        actions.translate.loadList({
            pageSize: value
        })
        actions.translate.updateState({
            pageSize: value
        })
    }

    // 分页组件点击页面数字索引执行函数
    onPageIndexSelect = value => {
        actions.translate.loadList({
            pageIndex: value
        })
        actions.translate.updateState({
            pageIndex: value
        })
    }

    // 流程提交成功后回调函数
    onSubmitSuc = async ()=>{
        await actions.translate.loadList();
        actions.translate.updateState({showLoading:false});
        Message.create({content: '单据提交成功', color: 'success'});

    }
    
    // 提交操作初始执行操作
    onSubmitStart = ()=>{
        actions.translate.updateState({showLoading:true});

    }
    // 提交失败回调函数
    onSubmitFail = (error)=>{
        actions.translate.updateState({showLoading:false});
        Message.create({content: error.msg, color: 'danger'});

    }

    // 撤回成功回调函数
    onRecallSuc = async ()=>{
        console.log("onRecallSuc 成功进入recall回调");
        await actions.translate.loadList();
        actions.translate.updateState({showLoading:false});
        Message.create({content: '单据撤回成功', color: 'success'});

    }

    // 撤回失败回调函数
    onRecallFail = (error)=>{
        actions.translate.updateState({showLoading:false});
        Message.create({content: error.msg, color: 'danger'});

    }


    onSubmitEnd = () => {
        actions.translate.updateState({ showLoading: false });
    }

    // 撤回操作执行起始函数,通常用于设置滚动条
    onRecallStart = ()=>{
        actions.translate.updateState({showLoading:true});
    }

    // 查看方法
    onExamine = async (text, record, index)=> {
        console.log("record", record);
        await actions.translate.updateState({rowData:record});
        await actions.routing.push(
            {
                pathname: 'translate-edit',
                detailObj: record,
            }
        )
    }

    // 模态框确认删除
    onModalDel = async (delFlag)=>{
        let {delData} = this.state;
        if(delFlag){
            await actions.translate.delItem({
                param: delData
            });
        }
        this.setState({
            showModal:false,
            delData:[]
        })
    }
    // 模板下载
    onLoadTemplate = () => {
        window.open(`${GROBAL_HTTP_CTX}/translate/excelTemplateDownload`)
    }

    // 导入成功回调函数
    handlerUploadSuccess = (data)=>{
        // 导入成功后，列表加载数据
        Message.create({content: '导入数据成功', color: 'success'});
        actions.translate.loadList();
    }

    // 导入删除回调函数
    handlerUploadDelete = (file) => {

    }

    // 导出
    exportExcel = () =>{
        //actions.translate.exportExcel(this.queryParams);
        let { selectData } = this.state;
        if(selectData.length > 0) {
            actions.translate.exportExcel({
                dataList : selectData
            });
        }else {
            Message.create({ content: '请选择导出数据', color : 'danger'  });
        }
    }


    // 动态设置列表滚动条x坐标
    getCloumnsScroll = (columns) => {
        let sum = 0;
        columns.forEach((da) => {
            sum += da.width;
        })
        return (sum);
    }

    render(){
        const self=this;
        let { list, showLoading, pageIndex, pageSize, totalPages , total } = this.props;
        let {selectData,showModal} = this.state;
        let exportProps = { total, pageIndex, pageSize, selectData, list};
        console.log("list",list)
        return (
            <div className='translate-root'>
                <Header title='资源翻译'/>
                <TranslateForm { ...this.props }/>
                <div className='table-header mt25'>

                <a href="/fe/i18n#" target="/fe/i18n#" rel="noopener noreferrer" class="u-upload-list-item-name">国际化工具</a>
                    <Button colors="primary" style={{"marginLeft":15}} size='sm' onClick={() => { self.cellClick({},0) }}>
                    新增
                    </Button>
                   


                    <Button colors="primary" className="ml5" size='sm' onClick={ self.onLoadTemplate}>模板下载</Button>
                    <AcUpload
                        title={"导入"}
                        action={`${GROBAL_HTTP_CTX}/translate/toImportExcel`}
                        multiple={false}
                        onError={() => console.log('上传报错了')}
                        onSuccess={self.handlerUploadSuccess}
                        onDelete={ self.handlerUploadDelete}
                    >
                        <Button className="ml5" colors="primary" size='sm'>资源导入</Button>
                    </AcUpload>
                    <AcExport {...exportProps} className="ml5"/>
                </div>
                <PaginationTable
                        data={list}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        totalPages={totalPages}
                        total = {total}
                        columns={this.state.column}
                        checkMinSize={6}
                        getSelectedDataFunc={this.tabelSelect}
                        onTableSelectedData={this.onTableSelectedData}
                        onPageSizeSelect={this.onPageSizeSelect}
                        onPageIndexSelect={this.onPageIndexSelect}
                />
                <Loading show={showLoading} loadingType="line" />
                <Modal
                        show={showModal}
                        onHide={this.close} >
                    <Modal.Header>
                        <Modal.Title>确认删除</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        是否删除选中内容
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={()=>this.onModalDel(false)} shape="border" style={{ marginRight: 50 }}>关闭</Button>
                        <Button onClick={()=>this.onModalDel(true)} colors="primary">确认</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        )

    }
}