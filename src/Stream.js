import { Module } from './Module';

export function Stream(props) {
    return <Module name={"Stream #" + props.streamId} id={2} dragHandler={props.dragHandler}>
        <span>{props.type}</span>
    </Module>
}