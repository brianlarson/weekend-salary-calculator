// Get all form inputs to access their values
const firstNameInput = document.querySelector(`[data-testid="firstNameInput"]`);
const lastNameInput = document.querySelector(`[data-testid="lastNameInput"]`);
const idInput = document.querySelector(`[data-testid="idInput"]`);
const titleInput = document.querySelector(`[data-testid="titleInput"]`);
const annualSalaryInput = document.querySelector(`[data-testid="annualSalaryInput"]`);

// Create function to add employees to our list/table
function addEmployee(event) {

  // Stop default button behavior where a button in a form refreshes the page
  event.preventDefault();

  // Get the tbody element so we can insert employee row elements (<tr>) into it
  const tableBody = document.querySelector("#employeeList tbody");

  // Insert the new employee row (<tr>) to our HTML table
  tableBody.innerHTML += `
    <tr>
      <td>${firstNameInput.value}</td>
      <td>${lastNameInput.value}</td>
      <td>${idInput.value}</td>
      <td>${titleInput.value}</td>
      <td>${annualSalaryInput.value}</td>
      <td><button>Delete</button></td>
    </tr>
  `;

  // Reset our add employee form so it's ready for the next addition
  resetForm();

}

// Add function to reset form inputs (quirk: cannot use vars set above for this DOM modification - why?)
function resetForm() {
  document.querySelector(`[data-testid="firstNameInput"]`).value = '';
  document.querySelector(`[data-testid="lastNameInput"]`).value = '';
  document.querySelector(`[data-testid="idInput"]`).value = '';
  document.querySelector(`[data-testid="titleInput"]`).value = '';
  document.querySelector(`[data-testid="annualSalaryInput"]`).value = '';
}