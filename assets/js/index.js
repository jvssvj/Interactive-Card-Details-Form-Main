let cardNumber = document.querySelector('#card-number')
let cardName = document.querySelector('#card-name')
let cardMonth = document.querySelector('#card-month')
let cardYear = document.querySelector('#card-year')
let cardCvv = document.querySelector('#card-cvv')
let confirmBtn = document.querySelector('#confirm-btn')
let continueBtn = document.querySelector('#continue-btn')

function error(className, indexClass, displayStyle, idInput, colorBorderInput) {
    document.getElementsByClassName(className)[indexClass].style.display = displayStyle
    document.querySelector(idInput).style.borderColor = colorBorderInput
}

function namePreview() {
    cardName.addEventListener('input', function(){
        let namePreview = document.querySelector('#name-preview')

        if(cardName.value == '') {
            namePreview.textContent = 'Jane Appleseed'
            error('error', 0, 'block', '#card-name', 'hsl(0, 100%, 66%)')
        } else {
            error('error', 0, 'none', '#card-name', '')
            namePreview.textContent = cardName.value
        }
     })
}

function numberPreview() {
    cardNumber.addEventListener('input', function(ev) {
        let numberPreview = document.querySelector('#number-preview');
        let regex = /^[0-9]*$/
        if (cardNumber.value.length > 16) {
            cardNumber.value = cardNumber.value.slice(0, 16);
        } else if (cardNumber.value.length === 0 || !regex.test(cardNumber.value)) {
            numberPreview.textContent = '0000 0000 0000 0000';
            error('error', 1, 'block', '#card-number', 'hsl(0, 100%, 66%)');
        } else {
            error('error', 1, 'none', '#card-number', '');
            let numberCardValue = cardNumber.value.replace(/\s/g, '');
            let newValue = '';
            for (let i = 0; i < numberCardValue.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    newValue += ' ';
                }
                newValue += numberCardValue[i];
            }
            numberPreview.textContent = newValue;
        }
    });
}

function expMonth() {
    cardMonth.addEventListener('input', function(){
        let monthPreview = document.querySelector('#month-preview')

        if(cardMonth.value.length > 2) {
            cardMonth.value = cardMonth.value.slice(0,2)
        } else if(cardMonth.value.length === 0) {
            monthPreview.textContent = '00'
            error('error', 2, 'block', '#card-month', 'hsl(0, 100%, 66%)')
        } else if (cardMonth.value > 12) {
            error('error', 3, 'block', '#card-month', 'hsl(0, 100%, 66%)')
        }
        else {
            error('error', 2, 'none', '#card-month', '')
            error('error', 3, 'none', '#card-month', '')
            monthPreview.textContent = cardMonth.value
        }
    })
}

function expYear() {
    cardYear.addEventListener('input', function(){
        let yearPreview = document.querySelector('#year-preview')

        if (cardYear.value.length > 2) {
            cardYear.value = cardYear.value.slice(0,2)
        } else if (cardYear.value.length === 0) {
            error('error', 3, 'none', '#card-month', '')
            error('error', 2, 'block', '#card-year', 'hsl(0, 100%, 66%)')
            yearPreview.textContent = '00'
        } else {
            error('error', 2, 'none', '#card-year', '')
            yearPreview.textContent = cardYear.value
        }
    })
}

function cvv() {
    cardCvv.addEventListener('input', function(){
        let cvvPreview = document.querySelector('#cvv-preview')

        if(cardCvv.value.length > 3) {
            cardCvv.value = cardCvv.value.slice(0,3)
        } else if(cardCvv.value.length === 0) {
            cvvPreview.textContent = '000'
            error('error', 4, 'block', '#card-cvv', 'hsl(0, 100%, 66%)')
        } else {
            error('error', 4, 'none', '#card-cvv', '')
            cvvPreview.textContent = cardCvv.value
        }
    })
}

numberPreview()
namePreview()
expMonth()
expYear()
cvv()

function checkInputs() {
    if (cardName.value == '') {
        error('error', 0, 'block', '#card-name', 'hsl(0, 100%, 66%)')
    }

    if (cardNumber.value == '' || cardNumber.value.length < 16) {
        error('error', 1, 'block', '#card-number', 'hsl(0, 100%, 66%)')
    }

    if (cardMonth.value == '' || cardMonth.value <= 0) {
        error('error', 2, 'block', '#card-month', 'hsl(0, 100%, 66%)')
    }

    if(cardYear.value == '') {
        error('error', 2, 'block', '#card-year', 'hsl(0, 100%, 66%)')
    }

    if(cardCvv.value == '' || cardCvv.value.length < 3) {
        error('error', 4, 'block', '#card-cvv', 'hsl(0, 100%, 66%)')
    }

    if (cardName.value !== '' && cardNumber.value.length === 16 && /^\d+$/.test(cardNumber.value) && parseFloat(cardMonth.value) >= 1 && parseFloat(cardMonth.value) <= 12 && cardCvv.value.length === 3) {
        document.querySelector('.card_information').style.display = 'none'
        document.querySelector('.thanks').style.display = 'block'
    }  
}

function home() {
    window.location.href = 'index.html'
}

confirmBtn.addEventListener('click', checkInputs)
continueBtn.addEventListener('click', home)