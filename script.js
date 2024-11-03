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

// Set arguments for formatting in USD currency
const salaryArgs = {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
}

// Get location where we're going to be updating our total cost and set inital value of total
let totalOutputLocation = document.querySelector("#totalCost");
let totalMonthlyCost = 0;

// Create function to add employees to our list/table
function addEmployee(event) {

  // Stop default button behavior where a button in a form refreshes the page
  event.preventDefault();

  // Get the tbody element so we can insert employee row elements (<tr>) into it
  const tableBody = document.querySelector("#employeeList tbody");

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

    console.log(annualSalaryInput.value);


    // Update our total monthly cost
    addToMonthlyCost(Number(annualSalaryInput.value));

    // Format salary input value to USD
    const formattedSalary = new Intl.NumberFormat('en-US', salaryArgs).format(annualSalaryInput.value);

    // Add the new employee row to <tbody>
    tableBody.innerHTML += `
      <tr>
        <td>${firstNameInput.value}</td>
        <td>${lastNameInput.value}</td>
        <td>${idInput.value}</td>
        <td>${titleInput.value}</td>
        <td align="right" data-salary="">${formattedSalary}</td>
        <td align="center"><button onClick="deleteEmployee(event)">Delete</button></td>
      </tr>
    `;

    // Reset our add employee form so it's ready for the next addition
    // resetForm();

  } else {

    // All inputs don't have a value so throw a helpful error alert
    alert("Looks like you're missing some employee info. Please try again.");

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
  // Remove the employee row by targeting the delete button's grandparent <tr> we're looking
  // up two levels in the DOM to target the <tr> to be removed with parentElement
  event.target.parentElement.parentElement.remove();
}

// Create function to add to total monthly cost in footer when employees are added
function addToMonthlyCost(annualSalary) {

  // Get the updated total and divide by 12 since we need the monthly salary vs.
  // annual salary that's incoming
  let updatedTotal = (totalMonthlyCost += annualSalary) / 12;

  // If we're over our budget then style the total monthly output in a red color
  if (updatedTotal > monthlyBudget) {
    document.querySelector("footer").classList.add('over-budget');
  }

  // Format salary total for output
  const formattedSalary = new Intl.NumberFormat('en-US', salaryArgs).format(updatedTotal);

  // Output the latest salary figure in footer
  totalOutputLocation.textContent = formattedSalary;

}