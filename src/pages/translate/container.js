import React from 'react';
import mirror, { connect } from 'mirrorx';

// 组件引入
import TranslateTable from './components/translate-root/TranslateTable';
import TranslateSelectTable from './components/translate-root/TranslateSelectTable';
import TranslatePaginationTable from './components/translate-root/TranslatePaginationTable';
import TranslateEdit from './components/translate-edit/Edit';
// 数据模型引入
import model from './model'
mirror.model(model);

// 数据和组件UI关联、绑定
export const ConnectedTranslateTable = connect( state => state.translate, null )(TranslateTable);
export const ConnectedTranslateSelectTable = connect( state => state.translate, null )(TranslateSelectTable);
export const ConnectedTranslatePaginationTable = connect( state => state.translate, null )(TranslatePaginationTable);
export const ConnectedTranslateEdit = connect( state => state.translate, null )(TranslateEdit);
