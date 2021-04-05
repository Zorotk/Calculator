import React, { useState } from 'react';
import '../styles/toolbar.scss'


const Calculator = () => {
    const [display, setdisplay] = useState([])
    const [currentOperator, setcurrentOperator] = useState('')
    const [value1, setvalue1] = useState('')
    const [value2, setvalue2] = useState('')
    const [result, setresult] = useState()
    const btnValues = '1234567890=-+/*'.split('')

    function test() {
        let v1 = Number(value1.slice(0, -1))
        let v2 = Number(value2)
        
        return v1 + v2 
    }

    const btnHandler = (btn) => {
        if (value2 === '' && currentOperator == '') {
            setvalue1(value1 + btn)
        }
        console.log(currentOperator)
        if (btnValues.slice(10).some(v => v == btn)) {
            setcurrentOperator(btn)
        }
        if (currentOperator !== '') {
            setvalue2(value2 + btn)
            if (btnValues.slice(10).some(v => v == btn)) {
                setvalue1('')
                setvalue2('')
                setcurrentOperator('')
                setresult(test())                   
            }
        }
        display.push(btn)
        setdisplay([...display])
    }
    console.log(display.map(el => {
        return isNaN(el) ? el : +el
    }))
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
