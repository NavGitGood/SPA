let expenseCategory = document.getElementById('expenseCategory');
let fixedExpenseType = document.getElementById('fixedExpenseType');
let variableExpenseType = document.getElementById('variableExpenseType');
let expensesData = [];

function getTotalExpense() {
    return JSON.parse(sessionStorage.getItem("expensesData"))
    .reduce((sum, record) => sum + parseFloat(record.expenseAmount), 0);
}

function sortOnExpenseDate(dataToPopulate) {
    return dataToPopulate.sort((a, b) => new Date(b.expenseDate).getTime() - new Date(a.expenseDate).getTime());
}

function updateExpenseAmount(amount, id) {
    let dataToUpdate = JSON.parse(sessionStorage.getItem("expensesData"));
    dataToUpdate = dataToUpdate.map(record => {
        if (record.id.toString() === id.toString()) {
            record.expenseAmount = amount;
        }
        return record;
    });
    sessionStorage.setItem("expensesData", JSON.stringify(dataToUpdate));
}

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
        cols += `<td><input type="text" class="no-edit" id="${dataRow.id}" name="expenseAmount" value="${dataRow.expenseAmount}" onchange="updateExpenseAmount(this.value, this.id)" readonly></td>`;
        cols += `<td>${dataRow.expenseDate}</td>`;
        if (dataRow.expenseCategory === "Fixed") {
            cols += `<td><input type="button" class="ibtnDel btn btn-md btn-light" id="${dataRow.id}" disabled value="Delete"></td>`;
        } else {
            cols += `<td><input type="button" class="ibtnDel btn btn-md btn-danger" id="${dataRow.id}" value="Delete"></td>`;
        }
        newRow.append(cols);
        $("table.order-list").append(newRow);
    });
    return true
}

function showExpensesList() {
    if (!populateExpensesList()) {
        alert("No Expenses Added!")
    }
    else {
        document.getElementById('expenses_list_div').style.display = "block";
    }
}

function saveExpensesFormState() {
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
            document.getElementById("variableExpenseType").required = true;
            document.getElementById("fixedExpenseType").required = false;

            break;
        case 'Fixed':
            document.getElementById("fixedExpenseTypeDiv").classList.remove("d-none");
            document.getElementById("variableExpenseTypeDiv").classList.add("d-none");
            // document.getElementById("variableExpenseTypeDiv").removeAttribute("required");
            document.getElementById("variableExpenseType").required = false;
            document.getElementById("fixedExpenseType").required = true;
            break;
    }
}

$("#addrow").on("click", function () {
    rowCounter++;
    let newRow = $("<tr>");
    let cols = "";
    cols += '<td></td>';
    cols += '<td></td>';
    cols += '<td></td>';

    cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Delete"></td>';
    newRow.append(cols);
    $("table.order-list").append(newRow);
});

$("table.order-list").on("click", ".ibtnDel", function (event) {
    let dataToUpdate = JSON.parse(sessionStorage.getItem("expensesData"))
        .filter(record => record.id.toString() !== $(this).attr('id').toString());
    sessionStorage.setItem("expensesData", JSON.stringify(dataToUpdate));
    $(this).closest("tr").remove();
});

expenseCategory.addEventListener('change', showExpenseType, false);
fixedExpenseType.addEventListener('change', saveFixedExpenseType, false);

$(document).keyup(function (e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
        //also check here some another stuff like menu already opend or not
        $("div#expenses_list_div").hide();
    }
});

$("table.order-list").on("focus", "input", function () {
    $(this)
        .prop("readonly", false)
        .removeClass("no-edit");
});

$("table.order-list").on("blur", "input", function () {
    $(this)
        .prop("readonly", true)
        .addClass("no-edit")
        .siblings("span").text($(this).val());
});
