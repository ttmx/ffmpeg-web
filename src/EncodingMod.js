import { Module } from './Module';
import { encodings } from './encodings'

export class EncodingMod extends Module {
    constructor(props) {
        super(props);
    }

    render() {
        return super.wrapper(<div>
            <div className="main-container">
                <div>

                    <select name="encoding" id="encoding-name">
                        {Object.keys(encodings).map((encoding) => {
                            return <option value={encoding}>{encodings[encoding]}</option>
                        })}
                    </select>


                </div>
                <div>

                </div>
            </div>
        </div>, "Change encoding", 2);
    }
}