let modal = document.getElementById('id01');

function showForm1() {
    modal.style.display = "block";
    modal.style.width = "auto";
    sessionStorage.setItem("monthlyIncome", "0");
    sessionStorage.setItem("bed", "0");
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
    let income = sessionStorage.getItem("monthlyIncome");
    let budget = (income * 4) / 5;
    let expenses = 0;
    let balance = budget - expenses;
    let savings = income - expenses;
    document.getElementById("budget").innerHTML = budget.toString();
    document.getElementById("expenses").innerHTML = expenses.toString();
    document.getElementById("balance").innerHTML = balance.toString();
    document.getElementById("savings").innerHTML = savings.toString();
    return false;
}

$('.datepicker').datepicker({
    minDate : '+1D'
});

// setInterval(function () {
//     getCalculations();
// }, 1000);