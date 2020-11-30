import React, { Component } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { ModuleList } from './ModuleList';
import { EncodingMod } from './EncodingMod';
import { CutMod } from './CutMod';
import { Input } from './Input';
import { Stream } from './Stream';
import './App.css';
import './FileList.css';
import './Module.css';

const ffmpeg = createFFmpeg({ log: true });

var draggedModuleId;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: [],
    }

    this.dropHandler = this.dropHandler.bind(this);
    this.fileHandler = this.fileHandler.bind(this);

    ffmpeg.load();
  }

  componentDidMount() {

  }

  fileHandler(uploadedFiles) {
    ffmpeg.setLogger(({ message }) => {
      message = message.trim().split(": ");
      if (message[0].includes("Stream #")) {
        const inputs = this.state.inputs;
        if (!inputs[uploadedFiles[0].name])
          inputs[uploadedFiles[0].name] = { file: uploadedFiles[0], streams: [] };
        inputs[uploadedFiles[0].name].streams.push({ type: message[1], modules: [] });
        this.setState({ inputs: inputs });
      }
    });

    (async () => { // TODO wait for ffmpeg loaded
      for (const file of uploadedFiles) {
        ffmpeg.FS("writeFile", file.name, await fetchFile(file));
        await ffmpeg.run("-i", file.name);
      }
    })();
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

  moduleDropHandler(event, input, stream) {
    const inputs = this.state.inputs;
    inputs[input].streams[stream].modules.push({ id: draggedModuleId, arguments: [] });
    this.setState({ inputs: inputs });
  }

  render() {
    return (
      <div className="App" onDrop={this.dropHandler} onDragEnter={this.dragEnterHandler} onDragLeave={this.dragLeaveHandler} onDragOver={this.dragOverHandler}>
        <ModuleList>
          <h1>Modules</h1>
          <EncodingMod dragHandler={this.moduleDragHandler} />
          <CutMod dragHandler={this.moduleDragHandler} />
        </ModuleList>
        <div id="sequence-container">
          {Object.keys(this.state.inputs).map(input => {
            return <div key={input} className="input">
              <Input file={this.state.inputs[input].file} />
              <div className="module-sequence-container">
                {Object.keys(this.state.inputs[input].streams).map(stream => {
                  return <div key={stream} className="module-sequence" onDrop={(event) => this.moduleDropHandler(event, input, stream)}>
                    <Stream streamId={stream} type={this.state.inputs[input].streams[stream].type} />
                    {this.state.inputs[input].streams[stream].modules.map((module, idx) => {
                      switch (module.id) {
                        case 3:
                          return <EncodingMod key={idx} />
                        case 4:
                          return <CutMod key={idx} />
                        default:
                          break;
                      }
                    })}
                  </div>
                })}
              </div>
            </div>
          })}
        </div>
      </div>
    );
  }
}