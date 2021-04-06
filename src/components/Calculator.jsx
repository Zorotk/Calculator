import React from 'react';
import '../styles/toolbar.scss'
import CalcState from '../store/calcState'
import { observer } from 'mobx-react-lite'
import {Button} from 'react-bootstrap'
const Calculator = observer(() => {
    return (
        <div className="Calculator">
            {/* <h2>{CalcState.display.join('')}</h2> */}
            <div className={'Calculator__panel'}>
                <h2> {CalcState.value2 == '' ? CalcState.value1 : CalcState.value2}</h2>
                <Button variant="success" className={'Calculator__panel__ext'} onClick={() => CalcState.extend()}>расширенный режим</Button>
                <div >
                    {CalcState.btnValues.map((btn, i) => (
                        <Button variant="light" className="Calculator__panel__btn" onClick={() => CalcState.btnHandler(btn)} key={i}>{btn} </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}
)

export default Calculator;
