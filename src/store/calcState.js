import { makeAutoObservable } from "mobx";
class CalcState {
    btnValues = '1234567890.=-+/*←c'.split('')
    value1 = ''
    value2 = ''
    currentOperator = ''
    display = ''
    history = []
    constructor() {
        makeAutoObservable(this)
        this.start()
    }

    start() {
        this.history = JSON.parse(localStorage.getItem("calc")) || []
    }

    deleteHistory() {
        localStorage.removeItem('calc');
        this.start()
    }

    extend() {
        const extArr = ['x*', 'sqrt', 'x2']
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
            case 'c': return this.value1 = '', this.value2 = '', this.display = ''
            case '←': return this.currentOperator
                ? this.value2 = this.value2.substring(0, this.value2.length - 1)
                : this.value1 = this.value1.substring(0, this.value1.length - 1)
            case 'x*': return v1 ** v2
            case 'sqrt': return this.value1 = Math.sqrt(v1)
            case 'x2': return this.value1 = v1 * v1
        }
    }

    btnHandler = (btn) => {
        if (btn == 'sqrt' || btn == '←' || btn == 'c' || btn == 'x2') {
            return this.calc(+this.value1, +this.value2, btn)
        }
        const isOperator = this.btnValues.slice(11).some(v => v == btn)
        if (isOperator) {
            if (this.value2 !== '' && this.currentOperator) {
                this.value1 = this.calc(+this.value1, +this.value2, this.currentOperator)
                this.display += this.value2
                this.value2 = ''
            }
            this.currentOperator = btn === '=' ? '' : btn
            if (btn === '=') {
                if (this.btnValues.slice(11).join('').includes(this.display[this.display.length - 1])) {
                    this.display = this.display.substring(0, this.display.length - 1)
                }
                return this.history.unshift({
                    value: this.display ? this.display + '=' + this.value1 : this.value1,
                    time: Date.now()
                })
                    , this.value1 = ''
                    , this.display = ''
                    , localStorage.setItem('calc', JSON.stringify(this.history));
            }
            if (this.btnValues.slice(11).join('').includes(this.display[this.display.length - 1])) {
                this.display = this.display.substring(0, this.display.length - 1)
            }
            if (this.currentOperator && !this.display) { this.display += this.value1 }
            this.display += btn

        } else {
            if (this.currentOperator) {
                this.value2 += btn
            } else {
                this.value1 += btn
            }
        }
    }
}

export default new CalcState()
