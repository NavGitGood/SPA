let expenseCategory = document.getElementById('expenseCategory');
let fixedExpenseType = document.getElementById('fixedExpenseType');
let variableExpenseType = document.getElementById('variableExpenseType');
let expenseFilter = document.getElementById('expense-type-filter');
let typeOfFixedExpenses = [
    "Rent",
    "EMI",
    "Grocery",
    "Bills"
];

// return total of all the expenses added
function getTotalExpense() {
    if (sessionStorage.getItem("expensesData") !== null && JSON.parse(sessionStorage.getItem("expensesData")).length) {
        return JSON.parse(sessionStorage.getItem("expensesData"))
            .reduce((sum, record) => sum + parseFloat(record.expenseAmount), 0);
    }
    else {
        return 0;
    }
}

function sortOnExpenseDate(dataToPopulate) {
    return dataToPopulate.sort((a, b) => new Date(b.expenseDate).getTime() - new Date(a.expenseDate).getTime());
}

// validate if expense can be updated on list (value must be less than budget and greater than 0)
function validateExpenseOnUpdate(value, oldvalue) {
    let expenseAmount = parseFloat(value);
    let oldExpenseAmount = parseFloat(oldvalue);
    let budgetValue = parseFloat(sessionStorage.getItem("budgetValue"));
    if(expenseAmount <= 0) {
        alert("expense should be greater than 0");
        return false;
    }
    if (expenseAmount > budgetValue) {
        alert("expense cannot be greater than budget");
        return false;
    }
    if (JSON.parse(sessionStorage.getItem("expensesData")).length) {
        let totalExpenseIfSaved = getTotalExpense() + expenseAmount - oldExpenseAmount;
        if (totalExpenseIfSaved > budgetValue) {
            alert("total expense cannot be greater than budget");
            return false;
        }
    }
    return true;
}

function updateExpenseAmount(value, oldvalue, id) {
    if (validateExpenseOnUpdate(value)) {
        let dataToUpdate = JSON.parse(sessionStorage.getItem("expensesData"));
        dataToUpdate = dataToUpdate.map(record => {
            if (record.id.toString() === id.toString()) {
                record.expenseAmount = value;
            }
            return record;
        });
        sessionStorage.setItem("expensesData", JSON.stringify(dataToUpdate));
    }
    else {
        document.getElementById(id).value = oldvalue;
    }
    updateBaseExpenseList();
}

// hide all expenses list if all rows deleted
function hideAllExpensesList() {
    document.getElementById('expenses_list_div').style.display = "none";
}

// populate data in all expenses list
function populateExpensesList() {
    $("table.order-list tbody").empty();
    if (sessionStorage.getItem("expensesData") === null || !JSON.parse(sessionStorage.getItem("expensesData")).length) {
        console.log("no data saved");
        hideAllExpensesList();
        return false;
    }
    let dataToPopulate = sortOnExpenseDate(JSON.parse(sessionStorage.getItem("expensesData")));
    dataToPopulate.forEach(dataRow => {
        let baseListRow = $("<tr>");
        let allListRow = $("<tr>");
        let cols = "";
        cols += `<td>${dataRow.expenseType}</td>`;
        cols += `<td><input type="text" class="no-edit" id="${dataRow.id}" name="expenseAmount" value="${dataRow.expenseAmount}" onfocus="this.oldvalue = this.value;" onchange="updateExpenseAmount(this.value, this.oldvalue, this.id)" readonly></td>`;
        cols += `<td>${dataRow.expenseDate}</td>`;
        if (dataRow.expenseCategory === "Fixed") {
            cols += `<td><input type="button" class="ibtnDel btn btn-md btn-light" id="${dataRow.id}" disabled title="Fixed expense cannot be deleted" value="Delete"></td>`;
        } else {
            cols += `<td><input type="button" class="ibtnDel btn btn-md btn-danger" id="${dataRow.id}" value="Delete"></td>`;
        }
        // do not add checkbox column in base list
        baseListRow.append(cols);
        $("table.base-list").append(baseListRow);

        // add checkbox column in base list
        if (dataRow.expenseCategory === "Fixed") {
            cols += `<td><input type="checkbox" name="selectToDelete" disabled id="${dataRow.id}"  title="Fixed expense cannot be selected for deletion" />&nbsp;</td>`;
        } else {
            cols += `<td><input type="checkbox" name="selectToDelete" id="${dataRow.id}"/>&nbsp;</td>`;
        }
        allListRow.append(cols);
        $("table.all-list").append(allListRow);
    });
    keepTop5InBaseExpenseList();
    hideOnAllExpensesList();
    return true
}

// show all expenses list
function showExpensesList() {
    if (!populateExpensesList()) {
        alert("No Expenses Added!")
    }
    else {
        document.getElementById('expenses_list_div').style.display = "block";
    }
}

// keep at most 5 records in base expense list
function keepTop5InBaseExpenseList() {
    document.getElementById("expenses_base_list")
    if ($("#expenses_base_list > tbody > tr").length > 5) {
        $("#expenses_base_list > tbody > tr").slice(5).remove();
    }
    // $("#expenses_base_list th:last-child, #expenses_base_list td:last-child").remove()
}

function updateBaseExpenseList() {
    populateExpensesList();
}

// validate if a new expense can be added (total expense value must be less than budget)
function validateExpenseOnAdd() {
    let expenseAmount = parseFloat(document.getElementById("expenseAmount").value);
    let budgetValue = parseFloat(sessionStorage.getItem("budgetValue"));
    if (expenseAmount > budgetValue) {
        alert("expense cannot be greater than budget");
        return false;
    }
    if (JSON.parse(sessionStorage.getItem("expensesData")).length) {
        let totalExpenseIfSaved = parseFloat(getTotalExpense()) + expenseAmount;
        if (totalExpenseIfSaved > budgetValue) {
            alert("total expense cannot be greater than budget");
            return false;
        }
    }
    return true;
}

function saveExpensesFormState() {
    expensesData = JSON.parse(sessionStorage.getItem("expensesData"));
    if (validateExpenseOnAdd()) {
        let expenseData = {
            "expenseCategory": "",
            "expenseAmount": "",
            "expenseDate": "",
            "expenseType": "",
            "id": Date.now()
        };
        sessionStorage.setItem("expenseCategory", document.getElementById("expenseCategory").value);
        sessionStorage.setItem("expenseAmount", document.getElementById("expenseAmount").value);
        sessionStorage.setItem("expenseDate", document.getElementById("expenseDate").value);
        expenseData.expenseAmount = document.getElementById("expenseAmount").value;
        expenseData.expenseDate = document.getElementById("expenseDate").value;
        expenseData.expenseCategory = document.getElementById("expenseCategory").value;
        if (!document.getElementById("variableExpenseTypeDiv").classList.contains("d-none")) {
            sessionStorage.setItem("variableExpenseType", document.getElementById("variableExpenseType").value);
            expenseData.expenseType = document.getElementById("variableExpenseType").value;
        }
        if (!document.getElementById("fixedExpenseTypeDiv").classList.contains("d-none")) {
            sessionStorage.setItem("fixedExpenseType", document.getElementById("fixedExpenseType").value);
            expenseData.expenseType = document.getElementById("fixedExpenseType").value;
        }
        expensesData.push(expenseData);
        sessionStorage.setItem("expensesData", JSON.stringify(expensesData));
        console.log(sessionStorage.getItem("expensesData"));
        document.getElementById("expenses_form_div").style.display = "none";
        updateBaseExpenseList();
        return false;
    }
    return false;
}

function saveFixedExpenseType() {
    sessionStorage.setItem("fixedExpenseType", fixedExpenseType.value);
}

// render the expense type on the basis of expenseCategory selected
function showExpenseType() {
    sessionStorage.setItem("expenseCategory", expenseCategory.value);
    switch (expenseCategory.value) {
        case 'Variable':
            document.getElementById("variableExpenseTypeDiv").classList.remove("d-none");
            document.getElementById("fixedExpenseTypeDiv").classList.add("d-none");
            document.getElementById("variableExpenseType").required = true;
            document.getElementById("fixedExpenseType").required = false;

            break;
        case 'Fixed':
            document.getElementById("fixedExpenseTypeDiv").classList.remove("d-none");
            document.getElementById("variableExpenseTypeDiv").classList.add("d-none");
            document.getElementById("variableExpenseType").required = false;
            document.getElementById("fixedExpenseType").required = true;
            break;
    }
}

// validate if budget can be updated to new value (it can never be greater than income and less than total expenses)
function budgetValidator() {
    let updatedBudget = parseFloat(document.getElementById('budgetValue').value);
    let monthlyIncome = parseFloat(sessionStorage.getItem("monthlyIncome"));
    let totalExpense = parseFloat(getTotalExpense());
    if ((updatedBudget <= monthlyIncome) && (updatedBudget >= totalExpense)) {
        return true;
    }
    else if (updatedBudget > monthlyIncome && updatedBudget < totalExpense) {
        alert("budget cannot be greater than income and cannot be less than total expenses");
        return false;
    }
    else if (updatedBudget > monthlyIncome) {
        alert("budget cannot be greater than income");
        return false;
    }
    else if (updatedBudget < totalExpense) {
        alert("budget cannot be less than total expenses");
        return false;
    }
}

// save new updated budget on form submit (if is valid)
function saveBudgetFormState() {
    if (budgetValidator()) {
        sessionStorage.setItem("budgetValue", document.getElementById("budgetValue").value);
        document.getElementById("budget_form_div").style.display = "none";
        return false;
    }
    return false;
}

function deleteMultiFromExpensesList() {
    let rowsToDelete = [...document.querySelectorAll('input[name="selectToDelete"]:checked')]
        .map(selected => selected.id);
    let dataToUpdate = JSON.parse(sessionStorage.getItem("expensesData"))
        .filter(record => !rowsToDelete.includes(record.id.toString()));
        sessionStorage.setItem("expensesData", JSON.stringify(dataToUpdate));
    console.log("updated expenses data: ", sessionStorage.getItem("expensesData"));
    [...document.querySelectorAll('input[name="selectToDelete"]:checked')]
    .forEach(selected => $(selected).closest("tr").remove());    
    populateExpensesList();
}

function hideOnAllExpensesList() {
    let selectedValue = expenseFilter.value;
    if (selectedValue === "Fixed") {
        let rowsToHide = [...document.querySelectorAll('table#expenses_list > tbody > tr')]
        .filter(row => !typeOfFixedExpenses.includes(row.getElementsByTagName("td")[0].innerHTML));
        rowsToHide.forEach(row => $(row).hide());
    }
    else if (selectedValue === "Variable") {
        let rowsToHide = [...document.querySelectorAll('table#expenses_list > tbody > tr')]
        .filter(row => typeOfFixedExpenses.includes(row.getElementsByTagName("td")[0].innerHTML));
        rowsToHide.forEach(row => $(row).hide());
    }
}

function filterExpenses() {
    populateExpensesList();
}

expenseCategory.addEventListener('change', showExpenseType, false);
fixedExpenseType.addEventListener('change', saveFixedExpenseType, false);
expenseFilter.addEventListener('change', filterExpenses, false);

// Close all expenses list on pressing Esc key on keyboard
$(document).keyup(function (e) {
    if (e.keyCode == 27) {
        $("div#expenses_list_div").hide();
    }
});

// make expense value input editable on focus
$("table.order-list").on("focus", "input", function () {
    $(this)
        .prop("readonly", false)
        .removeClass("no-edit");
});

// make expense value input readonly on blur
$("table.order-list").on("blur", "input", function () {
    $(this)
        .prop("readonly", true)
        .addClass("no-edit")
        .siblings("span").text($(this).val());
});

// make expense value input editable on focus
$("table#expenses_list").on("focus", "input", function () {
    $(this)
        .prop("readonly", false)
        .removeClass("input-on-blur")
        .removeClass("no-edit");
});

// make expense value input readonly on blur
$("table#expenses_list input[name='expenseAmount']").on("blur", "input", function () {
    $(this)
        .prop("readonly", true)
        .addClass("no-edit")
        .addClass("input-on-blur")
        .siblings("span").text($(this).val());
});

// show all expenses list on click
$("#viewall").on("click", function () {
    showExpensesList();
});

// delete expense record for which delete button is clicked and update the data
$("table.order-list").on("click", ".ibtnDel", function (event) {
    let dataToUpdate = JSON.parse(sessionStorage.getItem("expensesData"))
        .filter(record => record.id.toString() !== $(this).attr('id').toString());
    sessionStorage.setItem("expensesData", JSON.stringify(dataToUpdate));
    console.log("updated expenses data: ", sessionStorage.getItem("expensesData"));
    $(this).closest("tr").remove();
    populateExpensesList();
});
