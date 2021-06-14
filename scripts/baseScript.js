let modal = document.getElementById('id01');

function showIncomeForm() {
    document.getElementById('income_form_div').style.display = "block";
}

function showExpensesForm() {
    document.getElementById('expenses_form_div').style.display = "block";
}

function myFunction2() {
    document.getElementsByTagName("h1")[0].innerHTML = "updated 2"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

$(document).ready(function () {
    $(".datepicker").each(function () {
        $(this).datepicker();
    });
});

function getCalculations() {
    let expenses = 0;
    if (sessionStorage.getItem("expensesData") !== null && JSON.parse(sessionStorage.getItem("expensesData")).length) {
        expenses = getTotalExpense();
    }
    let income = sessionStorage.getItem("monthlyIncome");
    let budget = (income * 4) / 5;
    let balance = budget - expenses;
    let savings = income - expenses;
    document.getElementById("budget").innerHTML = budget.toString();
    document.getElementById("expenses").innerHTML = expenses.toString();
    document.getElementById("balance").innerHTML = balance.toString();
    document.getElementById("savings").innerHTML = savings.toString();
    return false;
}

$('.datepicker#budgetDate').datepicker({
    minDate : '+1D'
});

setInterval(function () {
    getCalculations();
}, 1000);