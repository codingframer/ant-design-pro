import React from 'react';
import { connect } from 'dva';
import styles from './Emulate/Tree.css';

function Tree() {
  return (
    <div className={styles.normal}>
      Route Component: /Emulate/Tree
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Tree);
