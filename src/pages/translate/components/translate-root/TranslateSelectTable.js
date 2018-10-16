import React, { Component } from 'react';
import { Button,Checkbox,Table } from 'tinper-bee';
import moment from "moment/moment";
import multiSelect from "tinper-bee/lib/multiSelect.js";
import Header from 'components/Header';
import TranslateForm from '../translate-form';
const MultiSelectTable = multiSelect(Table, Checkbox);

export default class TranslateSelectTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectData:[]
        }
    }
    /**
     * 编辑
     */
    edit = () =>{
        console.log('进入编辑');
    }
    /**
     * tabel选中数据
     * @param {*} data
     */
    tabelSelect = (data) => {
        this.setState({
            selectData: data
        })
    }
    render(){
        const self=this;
        const { list,showLoading,pageSize, pageIndex, totalPages } = this.props;
        const column = [
            {
                title: "序号",
                dataIndex: "index",
                key: "index",
                width: 100,
                render(record, text, index) {
                    return index + 1;
                }
            },
                {
                    title: "中文",
                    dataIndex: "chinese",
                    key: "chinese",
                    width: 100,
                },
                {
                    title: "中文繁体",
                    dataIndex: "traditional",
                    key: "traditional",
                    width: 100,
                },
                {
                    title: "资源编码",
                    dataIndex: "propertyCode",
                    key: "propertyCode",
                    width: 100,
                },
                {
                    title: "英文",
                    dataIndex: "english",
                    key: "english",
                    width: 100,
                },
                {
                    title: "法文",
                    dataIndex: "french",
                    key: "french",
                    width: 100,
                },
            {
                title: "操作",
                dataIndex: "e",
                key: "e",
                render(text, record, index) {
                    return (
                        <div className='operation-btn'>
                            <Button size='sm' className='edit-btn' onClick={() => { self.edit(record,true) }}>编辑</Button>
                        </div>
                    )
                }
            }
        ];
        return (
            <div className="translate-select-table">
                <Header title='资源翻译' back={true} />
                <TranslateForm { ...this.props }/>
                <div className="table-list">
                    <MultiSelectTable
                        loading={{ show: showLoading, loadingType: "line" }}
                        rowKey={(r, i) => i}
                        columns={column}
                        data={list}
                        multiSelect={{ type: "checkbox" }}
                        getSelectedDataFunc={this.tabelSelect}
                    />
                </div>
            </div>
        )
    }
}