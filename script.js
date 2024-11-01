// Get all form inputs to access their values
let firstNameInput = document.querySelector(`[data-testid="firstNameInput"]`);
let lastNameInput = document.querySelector(`[data-testid="lastNameInput"]`);

// Create function to add employees to our list/table
function addEmployee(event) {
  // Stop default button behavior where a button in a form refreshes the page
  event.preventDefault();

  // Log the form input values
  console.log(firstNameInput.value, lastNameInput.value);

  // Reset our add employee form so it's ready for the next addition
  resetForm();
}

// Add function to reset form inputs (quirk: cannot use vars set above for this DOM modification)
function resetForm() {
  document.querySelector(`[data-testid="firstNameInput"]`).value = '';
  document.querySelector(`[data-testid="lastNameInput"]`).value = '';
}