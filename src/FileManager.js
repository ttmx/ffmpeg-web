import React, { Component } from 'react';
import { FileList } from './FileList';
import './FileList.css';

export class FileManager extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div id={this.props.id} className="file-zone" onDrop={this.dropHandler} onDragEnter={this.dragEnterHandler} onDragLeave={this.dragLeaveHandler} onDragOver={this.dragOverHandler}>
      <div>{this.props.title}</div>
      <FileList files={this.props.files} removeAction={this.props.removeAction} />
    </div>;
  }
}