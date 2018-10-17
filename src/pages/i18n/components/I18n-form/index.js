import React, { Component } from 'react'
import { actions } from "mirrorx";
import { Switch, InputNumber, Col, Row,FormControl, Label, Select, Radio } from "tinper-bee";
import Form from 'bee-form';
import DatePicker from 'bee-datepicker';
import 'bee-datepicker/build/DatePicker.css';
import SearchPanel from 'components/SearchPanel';
const FormItem = Form.FormItem;
import options from "components/RefOption";
const { RangePicker } = DatePicker;
import RefWithInput from 'yyuap-ref/dist2/refWithInput'
import 'yyuap-ref/dist2/yyuap-ref.css'//参照样式
import './index.less'

class I18nForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            projectType: '',
        }
    }
    componentWillMount(){
        // 获得国际化列表数据
        actions.I18n.getOrderTypes();
    }
    /** 查询数据
     * @param {*} error 校验是否成功
     * @param {*} values 表单数据
     */
    search = (error,values) => {
        this.props.form.validateFields(async (err, values) => {
            values.pageIndex = this.props.pageIndex || 0;
            values.pageSize = this.props.pageSize || 10;
            let {
            } = this.state;
            await actions.I18n.loadList(values);
        });


    }
    /**
     * 重置
     */
    reset = () => {
        this.setState({
            name:'',
            projectType: '',
        })
    }
    render(){
        const { getFieldProps, getFieldError } = this.props.form;
        let { orderTypes } = this.props;
        let self = this;
        let {
        } = this.state;
        return (
            <SearchPanel
                    className='I18n-form'
                    form={this.props.form}
                    reset={this.reset}
                    search={this.search}>
                <Row>

                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>名称</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('name', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>项目类型</Label>

                                    <Select
                                            {
                                            ...getFieldProps('projectType', {
                                            initialValue: '',
                                        })
                                    }
                                    >
                                            <Option value="">请选择</Option>
                                                <Option value="1">UUI & JQuery</Option>
                                                <Option value="2">React</Option>
                                    </Select>

                                </FormItem>
                            </Col>
                </Row>
            </SearchPanel>
        )
    }
}

export default Form.createForm()(I18nForm)