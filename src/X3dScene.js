import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

// TODO don't rely on this syntax and put this in the webpack config
// (do this once we've ejected from create-react-app
import x3dom from 'exports?x3dom!x3dom'; // eslint-disable-line import/no-webpack-loader-syntax
import 'x3dom/x3dom.css';

// Disable double-clicking to change rotation point
x3dom.Viewarea.prototype.onDoubleClick = () => {}

export default class X3dScene extends Component {
  componentDidMount() {
    // Reload X3DOM asynchronously so that it tracks the re-created instance
    setTimeout(() => x3dom.reload());
  }

  render() {
    const styles = StyleSheet.create({
      x3dScene: {
        width: '100%',
        height: '100%',
        padding: 0,
        margin: 0,
        border: 'none',
      }
    });

    return (
      <x3d className={css(styles.x3dScene)}>
        <scene>
          <viewpoint is position="0,0,5"></viewpoint>
          { this.props.children }
        </scene>
      </x3d>
    );
  }
}
