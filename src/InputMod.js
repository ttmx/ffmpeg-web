import { Module } from './Module';

export class InputMod extends Module {
    constructor(props) {
        super(props);
    }

    render() {
        return super.wrapper(<div>
            <div className="main-container">

            </div>
        </div>, "Input", 1);
    }
}