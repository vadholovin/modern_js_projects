document.getElementById('loan-form').addEventListener('submit', function(e) {
  // Hide results
  document.getElementById('results').style.display = 'none';
  // Show loading
  document.getElementById('loading').style.display = 'block';

  // Make calculations and show results
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

function calculateResults() {
  const amount = document.getElementById('amount'),
        interest = document.getElementById('interest'),
        years = document.getElementById('years'),
        monthlyPayment = document.getElementById('monthly-payment'),
        totalPayment = document.getElementById('total-payment'),
        totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    
    // Hide loading
    document.getElementById('loading').style.display = 'none';
    // Show results
    document.getElementById('results').style.display = 'block';
  } else {
    showError('Please check your entries');
  }
}

// Show error
function showError(error) {
  // Hide loading
  document.getElementById('loading').style.display = 'none';
  
  // Create error box
  const errorBox = document.createElement('div');
  // Add classes
  errorBox.className = 'alert alert-danger';
  // Create text node and append it
  errorBox.appendChild(document.createTextNode(error));

  // Get elements
  const card = document.querySelector('.card'),
        heading = document.querySelector('.heading');

  // Insert error box
  card.insertBefore(errorBox, heading);

  // Clear error
  setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
  document.querySelector('.alert').remove();
}