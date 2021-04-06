import React from 'react';
import '../styles/toolbar.scss'
import CalcState from '../store/calcState'
import { observer } from 'mobx-react-lite'

const Calculator = observer(() => {
    return (
        <div className="Calculator">
            {/* <h2>{CalcState.display.join('')}</h2> */}
            <div className={'Calculator__panel'}>
                <h2> {CalcState.value2 == '' ? CalcState.value1 : CalcState.value2}</h2>
                <button onClick={() => CalcState.extend()}>расширенный режим</button>
                <div >
                    {CalcState.btnValues.map((btn, i) => (
                        <button className="Calculator__panel__btn" onClick={() => CalcState.btnHandler(btn)} key={i}>{btn} </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
)

export default Calculator;
