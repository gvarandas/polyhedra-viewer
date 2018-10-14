// @flow
import * as React from 'react';
import x3dom from 'x3dom.js';
import 'x3dom/x3dom.css';

import { makeStyles } from 'styles';

// Disable double-clicking to change rotation point
if (x3dom.Viewarea) {
  x3dom.Viewarea.prototype.onDoubleClick = () => {};
}

const styles = makeStyles({
  x3dScene: {
    border: 'none',
    height: '100%',
    width: '100%',
  },
});

interface Props {
  label: string;
  children: React.Node;
}

export default class X3dScene extends React.Component<Props> {
  x3d: *;

  constructor(props: Props) {
    super(props);
    this.x3d = React.createRef();
  }

  componentDidMount() {
    // Reload X3DOM asynchronously so that it tracks the re-created instance
    setTimeout(() => {
      x3dom.reload();
      if (this.x3d.current) {
        // X3DOM generates this canvas which isn't controlled by react,
        // so we have to manually fix things
        const canvas = this.x3d.current.querySelector('canvas');
        canvas.setAttribute('tabIndex', -1);
        canvas.setAttribute('aria-label', this.props.label);
      }
    });
  }

  render() {
    return (
      <x3d is="x3d" class={styles('x3dScene')} ref={this.x3d}>
        <scene is="x3d">
          <viewpoint is="x3d" position="0,0,5" />
          {this.props.children}
        </scene>
      </x3d>
    );
  }
}
