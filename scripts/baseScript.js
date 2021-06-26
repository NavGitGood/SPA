let modal = document.getElementById('id01');

function openBudgetForm() {
    document.getElementById('budget_form_div').style.display = "block";
    document.getElementById('budgetValue').value = document.getElementById("budget").innerHTML;
}

function showIncomeForm() {
    document.getElementById('income_form_div').style.display = "block";
}

function showExpensesForm() {
    document.getElementById('expenses_form_div').style.display = "block";
}

$(document).ready(function () {
    $(".datepicker").each(function () {
        $(this).datepicker();
    });
    sessionStorage.setItem("expensesData", "[]");
});

function getCalculations() {
    let expenses = 0;
    if (sessionStorage.getItem("expensesData") !== null && JSON.parse(sessionStorage.getItem("expensesData")).length) {
        expenses = getTotalExpense();
    }
    let income = sessionStorage.getItem("monthlyIncome");
    let budgetDate = sessionStorage.getItem("budgetDate");
    let budget = parseFloat(sessionStorage.getItem("budgetValue"));
    let balance = budget - expenses;
    let savings = income - expenses;
    document.getElementById("income").innerHTML = income;
    document.getElementById("budget").innerHTML = budget.toString();
    document.getElementById("expenses").innerHTML = expenses.toString();
    document.getElementById("balance").innerHTML = balance.toString();
    document.getElementById("savings").innerHTML = savings.toString();

    // for expense form
    document.getElementById("budget-description").innerHTML = `Your budget is Rs. ${budget.toString()} and will end on ${budgetDate}`;

    return false;
}

$('.datepicker#budgetDate').datepicker({
    minDate : '+1D'
});

setInterval(function () {
    getCalculations();
}, 1000);