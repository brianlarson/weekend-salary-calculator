// Get all form inputs to access their values
const firstNameInput = document.querySelector("#firstNameInput");
const lastNameInput = document.querySelector("#lastNameInput");
const idInput = document.querySelector("#idInput");
const titleInput = document.querySelector("#titleInput");
const annualSalaryInput = document.querySelector("#salaryInput");

// Test number values
let salary = "140,000";
salary.replace(",", "");
console.log(salary);
let formattedSalary = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format(salary);
console.log(formattedSalary);

// Get all of our employee form inputs as an array to check for values and clear them upon
// successful submission
let formInputs = [firstNameInput, lastNameInput, idInput, titleInput, annualSalaryInput];

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

    // Add the new employee row to <tbody>
    tableBody.innerHTML += `
      <tr>
        <td>${firstNameInput.value}</td>
        <td>${lastNameInput.value}</td>
        <td>${idInput.value}</td>
        <td>${titleInput.value}</td>
        <td>${annualSalaryInput.value}</td>
        <td><button onClick="deleteEmployee(event)">Delete</button></td>
      </tr>
    `;

    // Reset our add employee form so it's ready for the next addition
    resetForm();

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
  event.target.parentNode.parentNode.remove();
}