import React from 'react';
import '../styles/toolbar.scss'
import CalcState from '../store/calcState'
import { observer } from 'mobx-react-lite'
import { Button, ListGroup, Form, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap'
import calcState from '../store/calcState';

const CalculatorHistory = observer(() => {
    const [checkbox, setCheckbox] = React.useState(true);
    return (
        <ListGroup variant="flush" className='Calculator__history'>
            <div className='Calculator__history__panel'>
                <h5>Журнал</h5>
                <Form.Check checked={checkbox} type="checkbox" onChange={() => setCheckbox(!checkbox)} label="Дата, время и заметки" />
                <Button onClick={() => CalcState.deleteHistory()} variant="success">Очистить</Button>
            </div>
            {checkbox && <>
                <Form.Control
                    type="text" placeholder="Текст заметки"
                    onChange={(e) => { calcState.note = e.target.value }}
                    value={calcState.note} />
                <Form.Text className="text-muted">
                    Все данные сохраняются локально
                            </Form.Text>
            </>}
            {
                calcState.history.map(el =>
                (<ListGroup.Item action variant="light" onDoubleClick={() => CalcState.deleteNote(el.time)}
                    className='Calculator__history__item' key={el.time}>
                    {checkbox
                        ? <span>
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">+ добавить заметку!</Tooltip>}>
                                <span className="d-inline-block">
                                    <Badge onClick={() => CalcState.addNote(el.time)} variant="info" >+</Badge>
                                </span>
                            </OverlayTrigger> Дата:{new Date(el.time).toISOString().slice(0, 10)}  Время:{new Date(el.time).toLocaleTimeString()}
                        </span> : null}   {el.value}  {el.note}</ListGroup.Item>))}
        </ListGroup>
    );
})

export default CalculatorHistory;

