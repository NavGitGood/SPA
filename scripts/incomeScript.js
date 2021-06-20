function saveIncomeFormState() {
    let monthlyIncome = parseFloat(document.getElementById("monthlyIncome").value);
    let budgetValue = (monthlyIncome * 4) / 5;
    sessionStorage.setItem("monthlyIncome", monthlyIncome.toString());
    sessionStorage.setItem("budgetValue", budgetValue.toString());
    sessionStorage.setItem("budgetDate", document.getElementById("budgetDate").value);
    document.getElementById("income_form_div").style.display = "none";
    return false;
}