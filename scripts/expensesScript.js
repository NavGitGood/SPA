let expenseCategory = document.getElementById('expenseCategory');
let fixedExpenseType = document.getElementById('fixedExpenseType');
let variableExpenseType = document.getElementById('variableExpenseType');

function saveExpensesFormState() {
    sessionStorage.setItem("expenseAmount", document.getElementById("expenseAmount").value);
    sessionStorage.setItem("expenseDate", document.getElementById("expenseDate").value);
    if (!document.getElementById("variableExpenseTypeDiv").classList.contains("d-none")) {
        sessionStorage.setItem("variableExpenseType", document.getElementById("variableExpenseType").value);
    }
    if(!document.getElementById("fixedExpenseTypeDiv").classList.contains("d-none")) {
        console.log(sessionStorage.getItem("fixedExpenseType"));
    }
    console.log(sessionStorage.getItem("expenseCategory"));
    console.log(sessionStorage.getItem("expenseAmount"));
    console.log(sessionStorage.getItem("expenseDate"));
    document.getElementById("expenses_form_div").style.display = "none";
    return false;
}

function saveFixedExpenseType() {
    sessionStorage.setItem("fixedExpenseType", fixedExpenseType.value);
}

function showExpenseType() {
    sessionStorage.setItem("expenseCategory", expenseCategory.value);
    switch (expenseCategory.value) {
        case 'Variable':
            document.getElementById("variableExpenseTypeDiv").classList.remove("d-none");
            document.getElementById("fixedExpenseTypeDiv").classList.add("d-none");
            document.getElementById("variableExpenseTypeDiv").required = true;
            break;
        case 'Fixed':
            document.getElementById("fixedExpenseTypeDiv").classList.remove("d-none");
            document.getElementById("variableExpenseTypeDiv").classList.add("d-none");
            document.getElementById("variableExpenseTypeDiv").removeAttribute("required");
            break;
    }
}
expenseCategory.addEventListener('change', showExpenseType, false);
fixedExpenseType.addEventListener('change', saveFixedExpenseType, false);
