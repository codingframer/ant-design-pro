import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Form, Radio, InputNumber, Input, message } from 'antd';
import styles from './Topology.css';

import Graph from 'react-graph-vis';
import style_vis from 'vis/dist/vis-network.min.css';

const FormItem = Form.Item;

@connect(state => ({
  emulate_data: state.emulate,
}))
@Form.create()
export default class Topology extends PureComponent {
  state = {
    modalVisible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'emulate/fetch_graph',
    });
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }

  handleAdd = () => {
    /*
    this.props.dispatch({
      type: 'rule/add',
      payload: {
        description: this.state.addInputValue,
      },
    });
     */
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        message.success('请检查字段');
        return;
      }

      this.updateNodeHanlder(values);
      console.log(this.updateNodeHanlder);
      form.resetFields();
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  }
  updateNodeHanlder = (nodeData, callback) => {
    callback(nodeData);
    console.log('>>>>');
    console.log(nodeData);
    console.log(callback);
  }


  render() {
    let { emulate_data: { data: { graph } } } = this.props;

    const { getFieldDecorator } = this.props.form;
    const { modalVisible } = this.state;
    const that = this;
    const locales = {
      en: {
        edit: 'edit',
        del: '删除',
        back: '返回',
        addNode: '添加节点',
        addEdge: '添加连接线',
        editNode: '修改节点',
        editEdge: '修改连接线',
        addDescription: '点击空白地方添加新节点。',
        edgeDescription: '点击一个节点并拖动连接线至另一个节点。',
        editEdgeDescription: 'Click on the control points and drag them to a node to connect to it.',
        createEdgeError: '无法将连接线连接到群集。',
        deleteClusterError: '群集不能被删除。',
        editClusterError: '群集不能编辑。',
      },
    };

    const events = {
      select: function (event) {
        const { nodes, edges } = event;
        console.log(nodes);
        console.log(edges);
      },
    }

    const options = {
      // layout: {
      //   hierarchical: {
      //     direction: 'LR',
      //   },
      // },
      edges: {
        color: '#000000',
      },
      physics: {
        enabled: false,
      },
      locales,
      manipulation: {
        // enabled: true, initiallyActive: true, addEdge: true,

        // enabled: true, initiallyActive: false, addEdge: true, showButton:true,
        addNode: function (nodeData, callback) {
          // nodeData.label = 'hello world';
          that.handleModalVisible(true);
          // callback(nodeData);

          that.updateNodeHanlder = that.updateNodeHanlder.bind(this, nodeData, callback);
          console.log(callback);
        },
        // addNodeMode: function () {
        //   return true;
        // },
        // editNode: function (data, callback) {
        //   // filling in the popup DOM elements
        //   console.log('editNode.....');
        // },
        // addEdge: function (edgeData, callback) {
        //   if (edgeData.from === edgeData.to) {
        //     alert('只能连接到其他节点');
        //     // var r = confirm("Do you want to connect the node to itself?");
        //     // if (r === true) {
        //     //     callback(edgeData);
        //     // }
        //   } else {
        //     callback(edgeData);
        //   }
        // },


      },
    };


    const graph2 = {
      nodes: [
        { id: 1, label: '暂无数据', color: '#e04141', shape: 'database' },
      ],
      edges: [],
    };
    graph = (graph && graph.nodes) ? graph : graph2;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
      colon: true,
    };

    return (
      <div style={{ height: '85%' }} >
        <Modal
          title="编辑"
          visible={modalVisible}
          onOk={this.handleAdd}
          onCancel={() => this.handleModalVisible()}
        >

          <Form layout="vertical">
            <FormItem {...formItemLayout} label="类型" className="collection-create-form_last-form-item">
              {getFieldDecorator('shape', {
                initialValue: 'box',
              })(
                <Radio.Group>
                  <Radio value="database">变电站</Radio>
                  <Radio value="box">线路</Radio>
                  <Radio value="dot">开关</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="名称">
              {getFieldDecorator('label', {
                initialValue: '10kV',
                rules: [{ required: true, message: '请输入名称！' }],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="电流">
              {getFieldDecorator('electric', {
                initialValue: '2000',
                rules: [{ required: true, message: '请输入电流值！' }],
              })(<InputNumber style={{ width: '100%' }} InputNumber min={0} max={99999999} />)}
            </FormItem>
          </Form>
        </Modal>

        <Graph graph={JSON.parse(JSON.stringify(graph))} options={options} events={events} />
      </div>
    );
  }
}
