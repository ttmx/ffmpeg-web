import { Module } from './Module';
import { encodings } from './encodings'

export function EncodingMod(props) {
    return <Module name="Change Encoding" id={2} dragHandler={props.dragHandler}>
        <select name="encoding" id="encoding-name" style={{ maxWidth: 200 }}>
            {Object.keys(encodings).map((encoding, idx) => {
                return <option key={idx} value={encoding}>{encodings[encoding]}</option>
            })}
        </select>
    </Module>
}