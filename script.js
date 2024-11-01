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

  // Log the form input values
  console.log(firstNameInput.value, lastNameInput.value, idInput.value, titleInput.value, annualSalaryInput.value);

  // Reset our add employee form so it's ready for the next addition
  resetForm();
}

// Add function to reset form inputs (quirk: cannot use vars set above for this DOM modification)
function resetForm() {
  document.querySelector(`[data-testid="firstNameInput"]`).value = '';
  document.querySelector(`[data-testid="lastNameInput"]`).value = '';
  document.querySelector(`[data-testid="idInput"]`).value = '';
  document.querySelector(`[data-testid="titleInput"]`).value = '';
  document.querySelector(`[data-testid="annualSalaryInput"]`).value = '';
}