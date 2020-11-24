import React, { Component } from 'react';
import { FileManager } from './FileManager';
import { ProcessingModules } from './ProcessingModules';
import { Module } from './Module';
import { ModuleList } from './ModuleList';
import { EncodingMod } from './EncodingMod';
import { InputMod } from './InputMod';
import './App.css';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: {},
    }

    this.dropHandler = this.dropHandler.bind(this);
    this.fileHandler = this.fileHandler.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }

  componentDidMount() {
    console.log(new Module);
  }

  fileHandler(uploadedfiles) {
    var files = this.state.files;
    for (const file of uploadedfiles) {
      files[file.name] = file;
    }
    this.setState({ files: files });
  }

  removeFile(fileName) {
    const files = this.state.files;
    delete files[fileName];
    this.setState({ files: files });
  }

  dropHandler(event) {
    event.preventDefault();
    this.fileHandler(event.dataTransfer.files);
  }

  dragEnterHandler(event) {
    event.preventDefault();
  }

  dragLeaveHandler(event) {
    event.preventDefault();
  }

  dragOverHandler(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="App" onDrop={this.dropHandler} onDragEnter={this.dragEnterHandler} onDragLeave={this.dragLeaveHandler} onDragOver={this.dragOverHandler}>
        <FileManager title="Files" id="file-manager" files={this.state.files} removeAction={this.removeFile}></FileManager>
        <div className="main-wrapper">
          <ModuleList>
            <InputMod dragHandler={(event, id) => console.log(id)} />
            <EncodingMod dragHandler={(event, id) => console.log(id)} />
          </ModuleList>
        </div>
      </div>
    );
  }
}