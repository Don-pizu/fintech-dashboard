// Set the backend API URL
// const API = 'http://localhost:5000/api'; // Uncomment this for local testing

const API = 'https://fintech-dashboard-2ifo.onrender.com/api'; // Production backend

// Handle form submission for signup
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form behavior

  const userName = document.getElementById('username').value; // 💡 Ensure input has id="username"
  const password = document.getElementById('password').value; // 💡 Ensure input has id="password"
  const username = userName.toLowerCase();
  try {
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }) // ✅ Send as { username, password }
    });

    const data = await res.json();

    if (res.ok) {
      alert('Registered successfully');
      window.location.href = 'login.html'; // Redirect to login page
    } else {
      alert(data.message || 'Registration failed');
    }
  } catch (err) {
    console.error('Error during registration:', err);
    alert('An error occurred. Please try again.');
  }
});
