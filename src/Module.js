import { Component } from 'react';
const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');

export class Module extends Component {

    constructor(props) {
        super(props);

        this.arguments = [];
    }

    wrapper(content, name, id) {
        return <div className="module-card" draggable onDragStart={(event) => this.props.dragHandler(event, id)}>
            <div className="item-title">{name}</div>
            {content}
        </div>
    }

    render() {
        return <h1>YOU SHOULDNT SEE THIS EVER</h1>
    }
}