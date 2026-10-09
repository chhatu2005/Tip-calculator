
const billAmount = document.getElementById("billAmount")
const customTip = document.getElementById("customTip")
const people = document.getElementById("people")

const tipAmount = document.getElementById("tipAmount")
const totalBill = document.getElementById("totalBill")
const perPerson = document.getElementById("perPerson")

const errorMessage = document.getElementById("error-message")

const tipButtons = document.getElementsByClassName("tip-button")[0].getElementsByTagName("button")

let selectedTip = 10


// Select Tip Percentage
const selectTip = (percentage) =>
{
    selectedTip = percentage

    customTip.value = ""

    for(let i = 0; i < tipButtons.length; i++)
    {
        tipButtons[i].classList.remove("active")
    }

    for(let i = 0; i < tipButtons.length; i++)
    {
        if(parseFloat(tipButtons[i].innerText) === percentage)
        {
            tipButtons[i].classList.add("active")
        }
    }

    errorMessage.innerText = ""
}


// Calculate Tip
const calculateTip = () =>
{
    const bill = parseFloat(billAmount.value)
    const personCount = Number(people.value)

    let percentage = selectedTip

    if(customTip.value !== "")
    {
        percentage = Number(customTip.value)
    }

    if(billAmount.value.trim() === "" || !Number.isFinite(bill) || bill <= 0)
    {
        errorMessage.innerText = "Please enter a valid bill amount"
        return
    }

    if(customTip.value !== "" && (!Number.isFinite(percentage) || percentage < 0))
    {
        errorMessage.innerText = "Please enter a valid tip percentage"
        return
    }

    if(people.value.trim() === "" || !Number.isInteger(personCount) || personCount < 1)
    {
        errorMessage.innerText = "Please enter a valid number of people"
        return
    }

    const tip = bill * percentage / 100
    const total = bill + tip
    const amountPerPerson = total / personCount

    tipAmount.innerText = "₹" + tip.toFixed(2)
    totalBill.innerText = "₹" + total.toFixed(2)
    perPerson.innerText = "₹" + amountPerPerson.toFixed(2)

    errorMessage.innerText = ""
}


// Reset Calculator
const resetCalculator = () =>
{
    billAmount.value = ""
    customTip.value = ""
    people.value = 2

    selectedTip = 10

    tipAmount.innerText = "₹0.00"
    totalBill.innerText = "₹0.00"
    perPerson.innerText = "₹0.00"

    errorMessage.innerText = ""

    for(let i = 0; i < tipButtons.length; i++)
    {
        tipButtons[i].classList.remove("active")
    }

    tipButtons[0].classList.add("active")
}
