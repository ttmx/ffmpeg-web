const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');

export class ProcessingModules {
  constructor() {
    this.ffmpeg = createFFmpeg();
    this.modules = {
      "encode": {
        "name": "Convert the encoding",
        "input": ["any"],
        "function": async (inputFile, encoding) => {
          await this.ffmpeg.load();
          this.ffmpeg.FS('writeFile', inputFile.name, fetchFile(inputFile));
        },
        "jsx": () => {

        }
      }
    }
  }
}