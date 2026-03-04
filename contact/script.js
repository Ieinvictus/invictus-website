// Google Apps Script Form Submission
const scriptURL = 'https://script.google.com/macros/s/AKfycbw6xr6-D7ueFPdCGtWf1j0GibAwbOHTi10pywMWPRHqqQno3mEbxKxyJG9Zg2_R4Yz7AQ/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('msg');

// Validate email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate mobile number (10 digits only)
function isValidMobile(mobile) {
  return /^[0-9]{10}$/.test(mobile);
}

// Submit Event
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = form['Name'].value.trim();
  const mobile = form['Mobile'].value.trim();
  const email = form['Email'].value.trim();

  // Instant validation
  if (!name || !mobile || !email) {
    showMessage('⚠️ Please fill out all fields.', 'yellow');
    return;
  }

  if (!isValidMobile(mobile)) {
    showMessage(' Enter a valid 10-digit mobile number.', 'yellow');
    return;
  }

  if (!isValidEmail(email)) {
    showMessage(' Enter a valid email address.', 'yellow');
    return;
  }

  showMessage(' Submitting...', 'white');

  try {
    const res = await fetch(scriptURL, {
      method: 'POST',
      body: new FormData(form),
    });

    if (res.ok) {
      showMessage(' Thank you for subscribing!', 'white');
      form.reset();
    } else {
      showMessage('❌ Server error. Try again.', 'red');
    }
  } catch (err) {
    showMessage('❌ Submission failed. Try again later.', 'red');
    console.error('Error!', err.message);
  }
});

// Message Display Function
function showMessage(text, color) {
  msg.innerHTML = `<strong style="color:${color};">${text}</strong>`;
  setTimeout(() => msg.innerHTML = "", 4000); // clears after 4s
}