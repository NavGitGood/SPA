# **SPA** #

## **Single Page App using HTML, CSS and JavaScript** ##

### **Following external libraries are used** ###

1. Bootstrap 4 CSS
2. jQuery

### **Functionalities (assumptions in italic)** ###

1. User should provide monthly income and budget ending date as an input to a form which appears when user lands on the application.
2. On Submitting above details, form should close, and user can see the main screen which contains –
    - Budget  : 20% less than the income as default.
    - Expenses : total amount of expenses added till now (Rs 0 as default)
    - Balance  : (Budget – Expenses)
    - Savings  : (Income - Expenses)
    - Form to update the Budget (User can increase/decrease the budget ***cannot update date***).
    - Form to add an expense, this contains
        - Budget Description ***(it is added as a label showing budget value and date)***
        - Category-Fixed (Rent, EMI, Grocery, Bills), Variable (all other than fixed)
        - Amount – in Rs.
        - Date – date of the expense.
        - List of 5 most recent Expenses with a view all button on bottom (if expenses are more than 5) and delete option on each expense.
3. On click of View all, list of all the expenses will be available (popup can be used here if required), List should be sorted by date with most recent on top. User can also delete multiple expenses at once in this list or update the amount of any expense.

### **Following Constraints are satisfied (assumptions in italic):** ###

1. User cannot proceed without providing monthly income and budget ending date.
2. Budget ending date cannot be current or previous date.
3. Budget can never be greater than income ***(can be equal)*** and less than total expenses ***(can be equal)*** till now. You may like to alert the user for this, similarly expense amount cannot be zero and greater than balance ***(can be equal)***.
4. Fixed expenses cannot be deleted once added instead amount can be updated for both categories.
5. All expenses list that opens on click of View all can only be closed on pressing Esc key on keyboard.
6. On Deleting expense/expenses, all the data on main screen should get updated.
7. Use only native Javascript functions/jQuery and API.
8. Can make use of any HTML CSS library ***(used bootstrap 4)***, please note that UI is not of high importance.

### **Bonus Feature (implemented)** ###

> **Provide an option to filter the list of expenses in the popup based on category only (All, Fixed, Variable)**

### **How to use the form:** ###

1. Clone from github using `git clone https://github.com/NavGitGood/SPA.git` or use the provided zip
2. Either open `index.html` file directly in a brower or use a server as

> import project in Visual Studio Code, install a plugin `Live Server` and click on `Go Live` button on bottom right

### **How to use the functionalities (verified on Chrome, Edge and Firefox):** ###

1. Income form will be present on page load
2. Add data and submit, base page will be populated with following (as per the rules given above):
    - Income ***(added to give more info to user, budget date is not shown here)***
    - Budget
    - Expenses
    - Balance
    - Savings
3. Click on budget to update the default value ***(will give a popup form)***
4. There will be a table (base expense list) at the bottom to list top 5 expenses (by date in descending order) and would be empty initially, with two buttons:
    - View All - to list all the expenses (all expenses list)
    - Add Expense - to add a new expense
5. After an expense has been added, its value can be updated by clicking on the input (will activate on focus) either on the base expense list or on the all expenses list
6. On all expenses list, to delete multiple records, select the checkbox and then click on delete button on table header ***(cannot delete fixed expenses so the checkboxes are disabled for them)***
7. To delete an expense (on base list or all expenses list), click on the delete button against the row to be deleted ***(cannot delete fixed expenses so the buttons are disabled for them)***
8. On deletion, if there are no expenses left, and all expenses list was open, it'll be hidden
9. Use filter on all expenses list header to filter on expense category.

### **Further implementations:** ###

1. Write automated tests (few Cypress tests are already written in [SPA_tests](https://github.com/NavGitGood/SPA_tests.git))
2. Clean up the UI
3. Refactor code
