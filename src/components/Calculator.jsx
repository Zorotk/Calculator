import React from 'react';
import '../styles/toolbar.scss'
import CalcState from '../store/calcState'
import { observer } from 'mobx-react-lite'
import { Button, ListGroup, Form } from 'react-bootstrap'
import calcState from '../store/calcState';
const Calculator = observer(() => {
    const [checkbox, setCheckbox] = React.useState(true);

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
            <ListGroup variant="flush" className='Calculator__history'>
                <div className='Calculator__history__panel'>
                    <h5>Журнал</h5>
                    <Form.Check type="checkbox" onChange={() => setCheckbox(!checkbox)} label="Дата и время" />
                    <Button onClick={()=>CalcState.deleteHistory()} variant="success">Очистить</Button>
                </div>
                {
                    calcState.history.map((el, i) =>
                    (<ListGroup.Item action variant="light" className='Calculator__history__item' key={i}>
                        {checkbox ? <span>Дата:{new Date(el.time).toISOString().slice(0, 10)}  Время:{new Date(el.time).toLocaleTimeString()}</span> : null}   {el.value}</ListGroup.Item>))}
            </ListGroup>
        </div>
    );
}
)

export default Calculator;
