import React, { PureComponent } from 'react';
import moment from 'moment';
import { Table } from 'antd';
import styles from '../StandardTable/index.less';

export default class StandardTable extends PureComponent {

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  render() {
    const { data: { list, pagination }, loading } = this.props;
    const columns = [
      { title: '变电站', width: 100, dataIndex: 'station_name', sorter: true, fixed: 'left' },
      { title: '线路名称', width: 130, dataIndex: 'line_name', sorter: true, fixed: 'left' },
      { title: '设备名称', dataIndex: 'tower_name', sorter: true },
      { title: '平均值', dataIndex: 'avg_value', sorter: true },
      { title: '最大值', dataIndex: 'max_value', sorter: true },
      { title: '最小值', dataIndex: 'min_value', sorter: true },
      { title: '最大值时间', dataIndex: 'max_datetime', sorter: true, render: val => <span>{moment(val).format('YYYY.MM.DD HH')}</span> },
      { title: '最小值时间', dataIndex: 'min_datetime', sorter: true, render: val => <span>{moment(val).format('YYYY.MM.DD HH')}</span> },
      {
        title: '详情',
        width: 60,
        dataIndex: 'detail',
        render: (text, record) => (
          <span>
            <a href="#" title="点击查看24小时明细">详情</a>
          </span>),
        fixed: 'right',
      },
      /*
      { title: '0时', dataIndex: 'value_0', sorter: true },
      { title: '1时', dataIndex: 'value_1', sorter: true },
      { title: '2时', dataIndex: 'value_2', sorter: true },
      {
        title: '3时',
        dataIndex: 'value_3',
        sorter: true,
      },
      {
        title: '4时',
        dataIndex: 'value_4',
        sorter: true,
      },
      {
        title: '5时',
        dataIndex: 'value_5',
        sorter: true,
      },
      {
        title: '6时',
        dataIndex: 'value_6',
        sorter: true,
      },
      {
        title: '7时',
        dataIndex: 'value_7',
        sorter: true,
      },
      {
        title: '8时',
        dataIndex: 'value_8',
        sorter: true,
      },
      {
        title: '9时',
        dataIndex: 'value_9',
        sorter: true,
      },
      {
        title: '10时',
        dataIndex: 'value_10',
        sorter: true,
      },
      {
        title: '11时',
        dataIndex: 'value_11',
        sorter: true,
      },
      {
        title: '12时',
        dataIndex: 'value_12',
        sorter: true,
      },
      {
        title: '13时',
        dataIndex: 'value_13',
        sorter: true,
      },
      {
        title: '14时',
        dataIndex: 'value_14',
        sorter: true,
      },
      {
        title: '15时',
        dataIndex: 'value_15',
        sorter: true,
      },
      {
        title: '16时',
        dataIndex: 'value_16',
        sorter: true,
      },
      {
        title: '17时',
        dataIndex: 'value_17',
        sorter: true,
      },
      {
        title: '18时',
        dataIndex: 'value_18',
        sorter: true,
      },
      {
        title: '19时',
        dataIndex: 'value_19',
        sorter: true,
      },
      {
        title: '20时',
        dataIndex: 'value_20',
        sorter: true,
      },
      {
        title: '21时',
        dataIndex: 'value_21',
        sorter: true,
      },
      {
        title: '22时',
        dataIndex: 'value_22',
        sorter: true,
      },
      {
        title: '23时',
        dataIndex: 'value_23',
        sorter: true,
      },
       */
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };


    return (
      <div className={styles.standardTable}>
        <Table
          loading={loading}
          rowKey={record => record.id}
          dataSource={list}
          columns={columns}
          scroll={{ x: 1500 }}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}
