import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Form, Radio, InputNumber, Input, message } from 'antd';

import * as Jt from '../../assets/jtopo/jtopo-0.4.8-min.js';
import * as Toolbar from '../../assets/jtopo/toolbar.js';

import styles from './Tree.css';

const FormItem = Form.Item;


@connect(state => ({
  emulate_data: state.emulate,
}))
@Form.create()

export default class Topology extends PureComponent {
  state = {

  };

  componentDidMount() {
    let canvas = this.refs.canvas;
    let stage = new JTopo.Stage(canvas);
    console.log(stage);

    // showJTopoToobar(stage);//显示工具栏
    var scene = new JTopo.Scene(stage);
    // scene.background = '../../assets/logo.png';
    scene.backgroundColor = 'black';

    var node = new JTopo.Node("Hello");
    node.setLocation(20, 20);
    scene.add(node);
    node.mousedown(function(event){
      if(event.button == 2){
        node.text = '按下右键';
      }else if(event.button == 1){
        node.text = '按下中键';
      }else if(event.button == 0){
        node.text = '按下左键';
      }
    });

    node.mouseup(function(event){
      if(event.button == 2){
        node.text = '松开右键';
      }else if(event.button == 1){
        node.text = '松开中键';
      }else if(event.button == 0){
        node.text = '松开左键';
      }
    });
    node.click(function(event){
      console.log("单击");
    });
    node.dbclick(function(event){
      console.log("双击");
    });
    node.mousedrag(function(event){
      console.log("拖拽");
    });
    node.mouseover(function(event){
      console.log("mouseover");
    });
    node.mousemove(function(event){
      console.log("mousemove");
    });
    node.mouseout(function(event){
      console.log("mouseout");
    });

    const { dispatch } = this.props;
    dispatch({
      type: 'emulate/fetch_graph',
    });
  }

  render() {
    let { data } = this.props;



    return (
      <div style={{ height: '85%' }} >
        <canvas ref='canvas' style={{ height: '100%', width: '100%' }} ></canvas>
      </div>
    );
  }
}
