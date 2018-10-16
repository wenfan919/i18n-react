import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import queryString from 'query-string';
import { Switch, InputNumber,Loading, Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Radio } from "tinper-bee";
import Header from "components/Header";
import options from "components/RefOption";
import DatePicker from 'bee-datepicker';
import Form from 'bee-form';
import Select from 'bee-select';
import RefWithInput from 'yyuap-ref/dist2/refWithInput'
import moment from "moment";
import 'yyuap-ref/dist2/yyuap-ref.css'//参照样式
import './edit.less';
import 'ac-upload/build/ac-upload.css';
import { setCookie, getCookie} from "utils";

const FormItem = Form.FormItem;
const Option = Select.Option;
const format = "YYYY-MM-DD HH:mm:ss";

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: {},
            fileNameData: props.rowData.attachment || [],//上传附件数据
        }
    }
    async componentWillMount() {
        await actions.translate.getOrderTypes();
        let searchObj = queryString.parse(this.props.location.search);
        let { btnFlag } = searchObj;
        if (btnFlag && btnFlag > 0) {
            let { search_id } = searchObj;
            let tempRowData = await actions.translate.queryDetail({ search_id });
            let rowData = this.handleRefShow(tempRowData) || {};

            console.log('rowData',rowData);
            this.setState({
                rowData:rowData,
            })
        }

    }
    save = () => {//保存
        this.props.form.validateFields(async (err, values) => {
            values.attachment = this.state.fileNameData;
            let numArray = [
            ];
            for(let i=0,len=numArray.length; i<len; i++ ) {
                values[numArray[i]] = Number(values[numArray[i]]);
            }


            if (err) {
                Message.create({ content: '数据填写错误', color: 'danger' });
            } else {
                let {rowData,
                } = this.state;
                if (rowData && rowData.id) {
                    values.id = rowData.id;
                    values.ts = rowData.ts;
                }

                await actions.translate.save(
                    values,
                );
            }
        });
    }

    // 处理参照回显
    handleRefShow = (tempRowData) => {
        let rowData = {};
        if(tempRowData){

            let {
            } = tempRowData;

            this.setState({
            })
            rowData = Object.assign({},tempRowData,
                {
                }
            )
        }
        return rowData;
    }

    onBack = async() => {
        window.history.go(-1);
    }

    // 动态显示标题
    onChangeHead = (btnFlag) => {
        let titleArr = ["新增","编辑","详情"];
        return titleArr[btnFlag]||'新增';
    }


    arryDeepClone = (array)=>{
        let result = [];
        if(array){
            array.map((item)=>{
                let temp = Object.assign([],item);
                result.push(temp);
            })
        }
    }

    // 通过search_id查询数据

    render() {
        const self = this;

        let { btnFlag,appType, id, processDefinitionId, processInstanceId } = queryString.parse(this.props.location.search);
        btnFlag = Number(btnFlag);
        let {rowData,
        } = this.state;


        let title = this.onChangeHead(btnFlag);
        let { chinese,traditional,propertyCode,english,reserve1,reserve2,french, } = rowData;
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <div className='translate-detail'>
                <Loading
                    showBackDrop={true}
                    loadingType="line"
                    show={this.props.showLoading}
                />
                <Header title={title} back={true} backFn={this.onBack}>
                    {(btnFlag < 2) ? (
                        <div className='head-btn'>
                            <Button className='head-cancel' onClick={this.onBack}>取消</Button>
                            <Button className='head-save' onClick={this.save}>保存</Button>
                        </div>
                    ) : ''}
                </Header>
                <Row className='detail-body'>

                            <Col md={4} xs={6}>
                                <Label>
                                    资源编码：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('propertyCode', {
                                            validateTrigger: 'onBlur',
                                            initialValue: propertyCode || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入资源编码',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('propertyCode')}
                                </span>
                            </Col>
                            
                            <Col md={4} xs={6}>
                                <Label>
                                    中文：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('chinese', {
                                            validateTrigger: 'onBlur',
                                            initialValue: chinese || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入中文',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('chinese')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    中文繁体：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('traditional', {
                                            validateTrigger: 'onBlur',
                                            initialValue: traditional || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入中文繁体',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('traditional')}
                                </span>
                            </Col>
                            
                            <Col md={4} xs={6}>
                                <Label>
                                    英文：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('english', {
                                            validateTrigger: 'onBlur',
                                            initialValue: english || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入英文',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('english')}
                                </span>
                            </Col>
                            <Col md={4} xs={6}>
                                <Label>
                                    法文：
                                </Label>
                                    <FormControl disabled={btnFlag == 2||false}
                                        {
                                        ...getFieldProps('french', {
                                            validateTrigger: 'onBlur',
                                            initialValue: french || '',
                                            rules: [{
                                                type:'string',required: true,pattern:/\S+/ig, message: '请输入法文',
                                            }],
                                        }
                                        )}
                                    />


                                <span className='error'>
                                    {getFieldError('french')}
                                </span>
                            </Col>
                </Row>


            </div>
        )
    }
}

export default Form.createForm()(Edit);
