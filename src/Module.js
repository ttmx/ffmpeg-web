import { Component } from 'react';
const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');

export function Module(props) {
    return <div className="module-card" draggable={!!props.dragHandler} onDragStart={(event) => props.dragHandler(event, props.id)}>
        <span className="item-title">{props.name}</span>
        {props.children}
    </div>
}