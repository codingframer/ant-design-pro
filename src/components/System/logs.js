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
      {
        title: '单位',
        dataIndex: 'org_name',
      },
      {
        title: '姓名',
        dataIndex: 'user_name',
      },
      {
        title: '用户名',
        dataIndex: 'username',
        sorter: true,
      },
      {
        title: '用户IP',
        dataIndex: 'ip',
      },
      {
        title: '服务器IP',
        dataIndex: 'server_ip',
        sorter: true,
      },
      {
        title: '访问地址',
        dataIndex: 'uri',
        sorter: true,
      },
      {
        title: '方法名',
        dataIndex: 'class_method',
        sorter: true,
      },
      {
        title: '访问日期',
        dataIndex: 'vist_date',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY.MM.DD HH:mm:ss')}</span>,
      },
      {
        title: '参数',
        dataIndex: 'args',
        sorter: true,
      },
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
          scroll={{ x: 1600 }}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}
