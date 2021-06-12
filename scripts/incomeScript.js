function saveIncomeFormState() {
    sessionStorage.setItem("monthlyIncome", document.getElementById("monthlyIncome").value);
    sessionStorage.setItem("budgetDate", document.getElementById("budgetDate").value);
    console.log(sessionStorage.getItem("monthlyIncome"));
    console.log(sessionStorage.getItem("budgetDate"));
    document.getElementById("income_form_div").style.display = "none";
    return false;
}