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

class TranslateForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            chinese: '',
            traditional: '',
            propertyCode: '',
            english: '',
            reserve1: '',
            reserve2: '',
            french: '',
        }
    }
    componentWillMount(){
        // 获得资源翻译列表数据
        actions.translate.getOrderTypes();
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
            await actions.translate.loadList(values);
        });


    }
    /**
     * 重置
     */
    reset = () => {
        this.setState({
            chinese:'',
            traditional:'',
            propertyCode:'',
            english:'',
            reserve1:'',
            reserve2:'',
            french:'',
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
                    className='translate-form'
                    form={this.props.form}
                    reset={this.reset}
                    search={this.search}>
                <Row>

                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>资源编码</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('propertyCode', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>

                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>中文</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('chinese', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>中文繁体</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('traditional', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>
                            
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>英文</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('english', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>法文</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('french', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>
                </Row>
            </SearchPanel>
        )
    }
}

export default Form.createForm()(TranslateForm)