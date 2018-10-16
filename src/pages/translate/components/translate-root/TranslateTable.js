import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";

import Header from 'components/Header';
import TranslateTable from '../translate-table';
import TranslateForm from '../translate-form';

import './index.less';

/**
 * TranslateRoot Component
 */
class TranslateRoot  extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }
    /**
     *
     */
    componentWillMount() {
        this.getTableData();
    }
    /**
     * 获取table表格数据
     */
    getTableData = () => {
        actions.translate.loadList();
    }

    render() {
        let { pageSize, pageIndex, totalPages} = this.props;
        return (
            <div className='translate-root'>
                <Header title='资源翻译' back={true}/>
                <TranslateForm { ...this.props }/>
                <TranslateTable { ...this.props }/>
            </div>
        )
    }
}
export default TranslateRoot;