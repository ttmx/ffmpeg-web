import React, { Component } from 'react';

export class ModuleList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="module-list">
      {this.props.children}
    </div>;
  }
}