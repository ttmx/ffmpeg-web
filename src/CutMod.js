import { Module } from './Module';

export function CutMod(props) {
    return <Module name="Cut" id={3} dragHandler={props.dragHandler}>
        <input className="time-input" type="time" step="0.001" />
        <input className="time-input" type="time" step="0.001" />
    </Module>
}