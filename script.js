// Get all form inputs to access their values
const firstNameInput = document.querySelector("#firstNameInput");
const lastNameInput = document.querySelector("#lastNameInput");
const idInput = document.querySelector("#idInput");
const titleInput = document.querySelector("#titleInput");
const annualSalaryInput = document.querySelector("#salaryInput");

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
      <td><button onClick="deleteEmployee(event)">Delete</button></td>
    </tr>
  `;

  // Reset our add employee form so it's ready for the next addition
  resetForm();

}

// Add function to reset form inputs (quirk: cannot use vars set above for this DOM modification - why?)
function resetForm() {
  document.querySelector("#firstNameInput").value = '';
  document.querySelector("#lastNameInput").value = '';
  document.querySelector("#idInput").value = '';
  document.querySelector("#titleInput").value = '';
  document.querySelector("#salaryInput").value = '';
}

// Add function to delete employee entries
function deleteEmployee(event) {
  event.target.parentNode.parentNode.remove();
}