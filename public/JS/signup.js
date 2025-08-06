// Set the backend API URL 
// const API = 'http://localhost:5000/api'; // for testing


const API = 'https://fintech-dashboard-2ifo.onrender.com/api'; // Production

// Handle form submission
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      mode: 'cors', // ✅ Explicit CORS mode
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Registration failed');
      return;
    }

    alert(data.message || 'Registered successfully');

    // Redirect to login
    if (res.status === 201) window.location.href = 'login.html';

  } catch (err) {
    alert('Network error: ' + err.message);
    console.error(err);
  }
});
