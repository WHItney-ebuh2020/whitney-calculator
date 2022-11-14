class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
        
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = ''
        this.lock = false
    }

    delete() {
        if ( this.lock ) return

        if (this.currentOperand != " " )this.currentOperand = this.currentOperand.slice(0,-1)

    }

    appendNumber(number) {
        if ( this.lock ) return

        if (number === '.' && this.currentOperand.includes('.')) return
       
        this.currentOperand += number.toString()
    }

    chooseOperation(operation) {
        if ( this.lock ) return

        this.operation = operation 
        if ( this.previousOperand == ""){
            this.previousOperand = this.currentOperand
            this.currentOperand = ''
        }
       
    }

    compute() {

       this.lock= true
        let temp 

        if( this.operation == "+" ) {
            temp =parseInt(this.previousOperand) + parseInt(this.currentOperand)  
        }

        
        if( this.operation == "-" ) {
            temp =parseInt(this.previousOperand) - parseInt(this.currentOperand) 
        }

        
        if( this.operation == "*" ) {
            temp = parseInt(this.previousOperand)  * parseInt(this.currentOperand) 
        }

        
        if( this.operation == "/" ) {
            temp = parseInt(this.previousOperand) / parseInt(this.currentOperand)
        }


        this.previousOperandTextElement.innerText = this.previousOperand + this.operation + this.currentOperand 
        this.currentOperandTextElement.innerText = temp
     }

    updateDisplay() {
       this.currentOperandTextElement.innerText = this.currentOperand
       this.previousOperandTextElement.innerText = this.previousOperand + " " + this.operation
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(button.innerText)
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        console.log(this.operation)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener("click",   () => {
    calculator.compute()
    calculator.clear()
 })

 deleteButton.addEventListener( "click", ()=> 
 {
    calculator.delete()
    calculator.updateDisplay()
} )

allClearButton.addEventListener( "click", ()=> 
{
   calculator.clear()
   calculator.updateDisplay()
} )