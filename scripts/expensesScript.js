let expenseCategory = document.getElementById('expenseCategory');
let fixedExpenseType = document.getElementById('fixedExpenseType');
let variableExpenseType = document.getElementById('variableExpenseType');

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

// validate if expense can be updated on list (value must be less than budget)
function validateExpenseOnUpdate(value) {
    let expenseAmount = parseFloat(value);
    let budgetValue = parseFloat(sessionStorage.getItem("budgetValue"));
    if (expenseAmount > budgetValue) {
        alert("expense should be less than budget");
        return false;
    }
    if (sessionStorage.getItem("expensesData") === null || !JSON.parse(sessionStorage.getItem("expensesData")).length) {
        let totalExpenseIfSaved = getTotalExpense() + expenseAmount;
        if (totalExpenseIfSaved > budgetValue) {
            alert("expense should be less than budget");
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

// populate data in all expenses list
function populateExpensesList() {
    if (sessionStorage.getItem("expensesData") === null || !JSON.parse(sessionStorage.getItem("expensesData")).length) {
        console.log("no data saved");
        return false;
    }
    let dataToPopulate = sortOnExpenseDate(JSON.parse(sessionStorage.getItem("expensesData")));
    $("table.order-list tbody").empty();
    dataToPopulate.forEach(dataRow => {
        let newRow = $("<tr>");
        let cols = "";
        cols += `<td>${dataRow.expenseType}</td>`;
        cols += `<td><input type="text" class="no-edit" id="${dataRow.id}" name="expenseAmount" value="${dataRow.expenseAmount}" onfocus="this.oldvalue = this.value;" onchange="updateExpenseAmount(this.value, this.oldvalue, this.id)" readonly></td>`;
        cols += `<td>${dataRow.expenseDate}</td>`;
        if (dataRow.expenseCategory === "Fixed") {
            cols += `<td><input type="button" class="ibtnDel btn btn-md btn-light" id="${dataRow.id}" disabled value="Delete"></td>`;
        } else {
            cols += `<td><input type="button" class="ibtnDel btn btn-md btn-danger" id="${dataRow.id}" value="Delete"></td>`;
        }
        newRow.append(cols);
        $("table.order-list").append(newRow);
    });
    keepTop5InBaseExpenseList();
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
}

function updateBaseExpenseList() {
    populateExpensesList();
}

// validate if a new expense can be added (total expense value must be less than budget)
function validateExpenseOnAdd() {
    let expenseAmount = parseFloat(document.getElementById("expenseAmount").value);
    let budgetValue = parseFloat(sessionStorage.getItem("budgetValue"));
    if (expenseAmount > budgetValue) {
        alert("expense should be less than budget");
        return false;
    }
    if (sessionStorage.getItem("expensesData") === null || !JSON.parse(sessionStorage.getItem("expensesData")).length) {
        let totalExpenseIfSaved = getTotalExpense() + expenseAmount;
        if (totalExpenseIfSaved > budgetValue) {
            alert("expense should be less than budget");
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

// delete expense record which delete button is clicked and update the data
$("table.order-list").on("click", ".ibtnDel", function (event) {
    let dataToUpdate = JSON.parse(sessionStorage.getItem("expensesData"))
        .filter(record => record.id.toString() !== $(this).attr('id').toString());
    sessionStorage.setItem("expensesData", JSON.stringify(dataToUpdate));
    console.log("updated expenses data: ", sessionStorage.getItem("expensesData"));
    $(this).closest("tr").remove();
    populateExpensesList();
});

// validate if budget can be updated to new value (it can never be greater than income and less than total expenses)
function budgetValidator() {
    let updatedBudget = document.getElementById('budgetValue').value;
    let monthlyIncome = sessionStorage.getItem("monthlyIncome");
    if ((updatedBudget < monthlyIncome) && (updatedBudget > getTotalExpense())) {
        return true;
    }
    else {
        alert("budget should be less than income and greater than total expenses");
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

expenseCategory.addEventListener('change', showExpenseType, false);
fixedExpenseType.addEventListener('change', saveFixedExpenseType, false);

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

// show all expenses list on click
$("#viewall").on("click", function () {
    showExpensesList();
});
