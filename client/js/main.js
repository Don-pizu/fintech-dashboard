// Set the backend API URL 
// const API = 'http://localhost:5000/api'; // for testing
const API = 'https://fintech-dashboard-2ifo.onrender.com/api'; // For production

document.getElementById("loginForm").addEventListener("submit", async function(e) {
	e.preventDefault();

	const userName = document.getElementById("username").value; // ✅ rename to match backend
	const password = document.getElementById("password").value;
	const username = userName.toLowerCase();

	try {
		const response = await fetch(`${API}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"  
			},
			body: JSON.stringify({ username, password }), // ✅ matches backend expectations
		});

		const data = await response.json();

		if (response.ok) {
			alert("Login successful");
			localStorage.setItem("token", data.token);  // Save JWT
			window.location.href = "dashboard.html";
		} else {
			alert(data.message || "Login failed");
		}
	} catch (err) {
		console.error("Login error:", err);
		alert("An error occurred during login.");
	}
});
