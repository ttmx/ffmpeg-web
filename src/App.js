import React, { Component } from 'react';
import { ModuleList } from './ModuleList';
import { EncodingMod } from './EncodingMod';
import { CutMod } from './CutMod';
import { InputMod } from './InputMod';
import './App.css';
import './FileList.css';
import './Module.css';

var draggedModuleId;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      streams: [],
    }

    this.dropHandler = this.dropHandler.bind(this);
    this.fileHandler = this.fileHandler.bind(this);
  }

  componentDidMount() {

  }

  fileHandler(uploadedFiles) {
    const streams = this.state.streams;
    for (const file of uploadedFiles) {
      streams.push({ file: file, modules: [] });
    }
    this.setState({ streams: streams });
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

  moduleDragHandler(event, id) {
    draggedModuleId = id;
  }

  moduleDropHandler(event, i) {
    const streams = this.state.streams;
    streams[i].modules.push({ id: draggedModuleId, arguments: [] });
    this.setState({ streams: streams });
  }

  render() {
    return (
      <div className="App" onDrop={this.dropHandler} onDragEnter={this.dragEnterHandler} onDragLeave={this.dragLeaveHandler} onDragOver={this.dragOverHandler}>
        <ModuleList>
          <h1>Modules</h1>
          <InputMod dragHandler={this.moduleDragHandler} />
          <EncodingMod dragHandler={this.moduleDragHandler} />
          <CutMod dragHandler={this.moduleDragHandler} />
        </ModuleList>
        <div id="sequence-container">
          {Object.keys(this.state.streams).map((i) => {
            return <div key={i} className="module-sequence" onDrop={(event) => this.moduleDropHandler(event, i)}>
              <InputMod file={this.state.streams[i].file} />
              {this.state.streams[i].modules.map((module, idx) => {
                switch (module.id) {
                  case 2:
                    return <EncodingMod key={idx} />
                  case 3:
                    return <CutMod key={idx} />
                  default:
                    break;
                }
              })}
            </div>
          })}
        </div>
      </div>
    );
  }
}