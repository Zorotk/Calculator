import React from 'react';
import '../styles/toolbar.scss'
import CalcState from '../store/calcState'
import { observer } from 'mobx-react-lite'
import { Button} from 'react-bootstrap'

import CalculatorHistory from './CalculatorHistory';

const Calculator = observer(() => {
    return (
        <div className="Calculator">
            <div className={'Calculator__panel'}>
                <div className='Calculator__panel__display'>{CalcState.display}</div>
                <h2> {CalcState.value2 == ''
                    ? CalcState.value1 || 0
                    : CalcState.value2}</h2>
                <Button variant="success" className={'Calculator__panel__ext'} onClick={() => CalcState.extend()}>расширенный режим</Button>
                <div >
                    {CalcState.btnValues.map((btn, i) => (
                        <Button variant={i > 10 ? "outline-success" : "light"} className="Calculator__panel__btn" onClick={() => CalcState.btnHandler(btn)} key={i}>{btn} </Button>
                    ))}
                </div>
            </div>
            <CalculatorHistory />
        </div>
    );
}
)

export default Calculator;
