# **SPA** #

## **Single Page App using HTML, CSS and JavaScript** ##

### **Functionalities (to be added are bold)** ###

1. User should provide monthly income and budget ending date as an input to a form which appears when user lands on the application.
2. On Submitting above details, form should close, and user can see the main screen which contains –
    - Budget  : 20% less than the income as default.
    - Expenses : total amount of expenses added till now **(Rs 0 as default)**
    - Balance  : (Budget – Expenses)
    - Savings  : (Income - Expenses)
    - Form to update the Budget (User can increase/decrease the budget).
    - Form to add an expense, this contains
        - **Budget Description**
        - Category-Fixed (Rent, EMI, Grocery, Bills), Variable (all other than fixed)
        - Amount – **in Rs.**
        - Date – date of the expense.
        - List of 5 most recent Expenses with a view all button on bottom (if expenses are more than 5) and delete option on each expense.
3. On click of View all, list of all the expenses will be available (popup can be used here if required), List should be sorted by date with most recent on top. **User can also delete multiple expenses at once in this list** or update the amount of any expense.

### **Following Constraints are satisfied:** ###

1. User cannot proceed without providing monthly income and budget ending date.
2. Budget ending date cannot be current or previous date.
3. Budget can never be greater than income and less than total expenses till now. You may like to alert the user for this, similarly expense amount cannot be zero and greater than balance.
4. Fixed expenses cannot be deleted once added instead amount can be updated for both categories.
5. All expenses list that opens on click of View all can only be closed on pressing Esc key on keyboard.
6. On Deleting expense/expenses, all the data on main screen should get updated.
7. Use only native Javascript functions/jQuery and API.
8. Can make use of any HTML CSS library, please note that UI is not of high importance.

### **How to use the form:** ###

1. Income form will be present on page load
2. Add data and submit, base page will be populated with following (as per the rules given above):
    - Budget
    - Expenses
    - Balance
    - Savings
3. Click on budget to update the default value
4. There will be a table (base expense list) at the bottom to list top 5 expenses (by date in descending order) and would be empty initially, with two buttons:
    - View All - to list all the expenses (all expenses list)
    - Add Expense - to add a new expense
5. After an expense has been added, its value can be updated by clicking on the input (will activate on focus) either on the base expense list or on the all expenses list
