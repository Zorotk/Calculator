import React, { useState } from 'react';
import '../styles/toolbar.scss'

const btnValues = '1234567890=-+/*'.split('')
const Calculator = () => {
    const [display, setdisplay] = useState([])
    const [currentOperator, setcurrentOperator] = useState('')
    const [value1, setvalue1] = useState('')
    const [value2, setvalue2] = useState('')
    const [result, setresult] = useState()


    function calc(v1, v2, c) {
        switch (c) {
            case '+': return v1 + v2
            case '-': return v1 - v2
            case '*': return v1 * v2
            case '/': return v1 / v2
        }
    }

    const btnHandler = (btn) => {
        display.push(btn)
        setdisplay([...display])
        const isOperator = btnValues.slice(10).some(v => v == btn)
        if (isOperator) {
            if (value2 !== '' && currentOperator) {
                setvalue1(calc(+value1, +value2, currentOperator))
                setvalue2('')
                display.push(calc(+value1, +value2, currentOperator))
                setdisplay([...display])
            }
            setcurrentOperator(btn === '=' ? '' : btn)
        } else {
            if (currentOperator) {
                setvalue2(value2 + btn)
            } else {
                setvalue1(value1 + btn)
            }
        }
    }


    return (
        <div className="Calculator">
            <div className={'Calculator__panel'}>
                <h2>{display.join('')}</h2>
                <h2>znak{currentOperator}</h2>
                <h2>1 {value1}</h2>
                <h2>2 {value2}</h2>
                <h2>resul {result}</h2>
                <div className="Calculator__panel__btn">
                    {btnValues.map((btn, i) => (
                        <button onClick={() => btnHandler(btn)} key={i}>{btn}</button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calculator;
