// Get all form inputs to access their values
const firstNameInput = document.querySelector("#firstNameInput");
const lastNameInput = document.querySelector("#lastNameInput");
const idInput = document.querySelector("#idInput");
const titleInput = document.querySelector("#titleInput");
const annualSalaryInput = document.querySelector("#salaryInput");

// Get all of our employee form inputs as an array to check for values and clear them upon
// successful submission
let formInputs = [firstNameInput, lastNameInput, idInput, titleInput, annualSalaryInput];

// Set the monthly budget
const monthlyBudget = 20000;

// Get location where we're going to be updating our total cost and set inital value of total
let totalOutputLocation = document.querySelector("#totalCost");
let totalMonthlyCost = 0;

// Get the tbody element so we can insert employee row elements (<tr>) into it
const tableBody = document.querySelector("#employeeList tbody");

// Row to display when no employees are present in our table
const noEmployeesRow = `
  <tr id="noEmployeesRow">
    <td colspan="6" class="text-center text-secondary fw-semibold fst-italic">No employees</td>
  </tr>
`;

// Show "No employees" row to start
tableBody.innerHTML = noEmployeesRow;

// Delete All location for inserting and removing
const deleteAllBtnWrapper = document.querySelector("#deleteAllBtnWrapper");

// Delete All button HTML template for hiding and showing
const deleteAllBtn = `
  <button onClick="deleteAllEmployees()" class="btn btn-sm btn-outline-danger fw-normal float-right rounded-0 float-end">Delete All Employees</a>
`;

//Create function to add employees to our list/table
function addEmployee(event) {

  // Stop default button behavior where a button in a form refreshes the page
  event.preventDefault();

  // Create function to check if form is fully completed and valid for below
  function isFormValid() {
    for (const input of formInputs) {
      if (input.value === '') {
        return false;
      }
    }
    return true;
  }

  // Insert the new employee row (<tr>) to our HTML table if all fields have data
  if (isFormValid()) {

    // Update our total monthly cost
    addToMonthlyTotal(Number(annualSalaryInput.value));

    // Set arguments for formatting in USD currency (no cents needed usually)
    let salaryArgs = { style: 'currency', currency: 'USD', minimumFractionDigits: 0 };

    // Format salary input value to USD
    const formattedSalary = new Intl.NumberFormat('en-US', salaryArgs).format(annualSalaryInput.value);

    // Add the new employee row to <tbody>
    tableBody.innerHTML += `
      <tr data-salary="${annualSalaryInput.value}">
        <td>${firstNameInput.value}</td>
        <td>${lastNameInput.value}</td>
        <td>${idInput.value}</td>
        <td>${titleInput.value}</td>
        <td>${formattedSalary}</td>
        <td align="center">
          <button onClick="deleteEmployee(event)" class="btn btn-sm btn-outline-danger rounded-0">
            Delete
          </button>
        </td>
      </tr>
    `;

    // Handle no "No employees" row when none exist
    handleNoEmployeesMsg();

    // Show Delete All Employees button if employee rows exist (No Employees msg isn't present)
    handleDeleteAllBtn();

    // Reset our add employee form so it's ready for the next addition
    resetForm();

  } else {

    // All inputs don't have a value so throw a helpful error alert
    alert(`‼️ Looks like you're missing some employee info. Please try again.`);

  }

}

// Add function to reset all form inputs after successful submission
function resetForm() {
  for (const input of formInputs) {
    input.value = '';
  }
}

// Add function to delete employee entries one at a time
function deleteEmployee(event) {

  // Launch confirmation dialog box to double check user's delete action
  const deleteConfirmed = confirm(`‼️ Are you sure you want to delete this employee from the list?`);

  // If the user has confirmed that they want to delete the employee row then do it
  if (deleteConfirmed) {

    // Remove the employee row by targeting the delete button's grandparent <tr> we're looking
    // up two levels in the DOM to target the <tr> to be removed with parentElement
    const rowToDelete = event.target.parentElement.parentElement;
    rowToDelete.remove();

    // Handle no "No employees" row when none exist
    handleNoEmployeesMsg();

    // If no employee rows exist remove our Delete All button
    handleDeleteAllBtn();

    // Subtract deleted employee's salary from monthly total in footer
    reduceMonthlyTotal(event);

  }

}

// Create function to add to total monthly cost in footer when employees are added
function addToMonthlyTotal(annualSalary) {

  // Get the updated total and divide by 12 since we need the monthly salary vs.
  // annual salary that's incoming
  // let updatedTotal = (totalMonthlyCost += annualSalary) / 12;
  totalMonthlyCost += annualSalary / 12;

  // If we're over our budget then style the total monthly output in the footer
  if (totalMonthlyCost > monthlyBudget) {
    document.querySelector("footer").classList.add('over-budget');
  }

  // Set arguments for formatting in USD currency
  let salaryArgs = { style: 'currency', currency: 'USD', minimumFractionDigits: 2 };

  // Format salary total in USD for output
  const formattedSalary = new Intl.NumberFormat('en-US', salaryArgs).format(totalMonthlyCost);

  // Output the latest salary figure in footer
  totalOutputLocation.innerText = formattedSalary;

}

// Create function to reduce monthly total when deleting employee rows
function reduceMonthlyTotal(event) {

  // Get the removed employees raw salary number from data attribute in its table row (<tr>)
  // we're traveling up two levels from the delete button clicked in the DOM to get the <tr>
  // and then getting its data attribute value. Divide by twelve for monthly vs annual
  let amountToSubtract = Number(event.target.parentElement.parentElement.dataset.salary) / 12;

  // Round to nearest number with 2 decimal points
  amountToSubtract = amountToSubtract.toFixed(2);

  // Subtract this employees monthly salary from current total monthly cost
  totalMonthlyCost -= amountToSubtract;

  // If we're back within our budget then remove styling on our total in the footer
  if (totalMonthlyCost < monthlyBudget) {
    document.querySelector("footer").classList.remove('over-budget');
  }

  // Handle rounding errors when less than $1 remains. This is an inherent issue with how computers
  // store decimal numbers internally (eg $0.02 instead of desired $0.00)
  totalMonthlyCost = totalMonthlyCost < 1 ? 0 : totalMonthlyCost;

  // Set arguments for formatting in USD currency (use cents)
  let salaryArgs = { style: 'currency', currency: 'USD', minimumFractionDigits: 2 };

  // Format salary total in USD for output
  const formattedSalary = new Intl.NumberFormat('en-US', salaryArgs).format(totalMonthlyCost);

  // Output the latest salary figure in footer
  totalOutputLocation.innerText = formattedSalary;

}

// Create function to reset monthly total in footer to $0.00
function resetMonthlyTotal() {
  totalMonthlyCost = 0;
  totalOutputLocation.innerText = "$0.00";
}

// Create function to handle our "No employees" <tr> existence
function handleNoEmployeesMsg() {

  // Get number of rows in table body
  const rowCount = document.querySelectorAll("#employeeList tbody tr").length;

  // If there are zero then insert our "No employees" row
  if (rowCount === 0) {
    tableBody.innerHTML = noEmployeesRow;
  } else {
    // Otherwise get our "No employees" row and…
    const rowElement = document.querySelector("#noEmployeesRow");
    // …if it currently exists then remove it
    if(rowElement) {
      rowElement.remove();
    }
  }
}

// Create function to handle whether or not to show the Delete All Employees button
function handleDeleteAllBtn() {
  if (document.querySelector("#noEmployeesRow") === null) {
    deleteAllBtnWrapper.innerHTML = deleteAllBtn;
  } else {
    deleteAllBtnWrapper.innerHTML = '';
  }
}

// Create function to delete all employee rows if they exist
function deleteAllEmployees() {

  // Launch confirmation to make sure user wants to delete all employee rows
  const deleteConfirmed = confirm(`‼️ Whoah! Are you sure you want to delete all employees!?`);

  // Make sure user clicked Ok in dialog box
  if (deleteConfirmed) {

    // Show "No employees" row and remove all existing employee rows
    tableBody.innerHTML = noEmployeesRow;

    // Remove Delete All Employees button
    deleteAllBtnWrapper.innerHTML = '';

    // Reset total monthly in footer
    resetMonthlyTotal();

  }

}