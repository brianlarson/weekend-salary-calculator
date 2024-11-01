// Get the different inputs to access their values
let firstNameInput = document.querySelector(`[data-testid="firstNameInput"]`);
let lastNameInput = document.querySelector(`[data-testid="lastNameInput"]`);

// Create function to add employees to our list/table
function addEmployee(event) {
  event.preventDefault();
  console.log(firstNameInput.value, lastNameInput.value);
  resetForm();
}

function resetForm() {
  document.querySelector(`[data-testid="firstNameInput"]`).value = '';
  document.querySelector(`[data-testid="lastNameInput"]`).value = '';
}