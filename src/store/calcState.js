import { makeAutoObservable } from "mobx";

class CalcState {
    btnValues = '1234567890.=-+/*←c'.split('')
    value1 = ''
    value2 = ''
    currentOperator = ''
    display = []
    constructor() {
        makeAutoObservable(this)
    }

    extend() {
        const extArr = ['x*', 'sqrt']
        this.btnValues.length === 18
            ? this.btnValues.push(...extArr)
            : this.btnValues.splice((this.btnValues.length - extArr.length), extArr.length)
    }

    calc(v1, v2, c) {
        switch (c) {
            case '+': return v1 + v2
            case '-': return v1 - v2
            case '*': return v1 * v2
            case '/': return v1 / v2
            case 'c': return this.value1 = '', this.value2 = '', this.display = []
            case '←': return this.currentOperator
                ? this.value2 = this.value2.substring(0, this.value2.length - 1)
                : this.value1 = this.value1.substring(0, this.value1.length - 1)
            case 'x*': return v1 ** v2
            case 'sqrt': return this.value1 = Math.sqrt(v1)
        }
    }

    btnHandler = (btn) => {
        if (btn == 'sqrt' || btn == '←' || btn == 'c') {
            return this.calc(+this.value1, +this.value2, btn)
        }
        this.display.push(btn)

        const isOperator = this.btnValues.slice(11).some(v => v == btn)
        if (isOperator) {
            if (this.value2 !== '' && this.currentOperator) {
                this.value1 = this.calc(+this.value1, +this.value2, this.currentOperator)
                this.value2 = ''
                this.display.push(this.calc(+this.value1, +this.value2, this.currentOperator))
            }
            this.currentOperator = btn === '=' ? '' : btn
        } else {
            if (this.currentOperator) {
                this.value2 = this.value2 + btn
            } else {
                this.value1 = this.value1 + btn
            }
        }
    }
}

export default new CalcState()
