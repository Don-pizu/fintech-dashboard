// Set the backend API URL 
// const API = 'http://localhost:5000/api'; // for testing


const API = 'https://fintech-dashboard-2ifo.onrender.com/api'; // For production


// Get token from localStorage 
const token = localStorage.getItem('token'); 

// Fetch dashboard data 
async function loadDashboard() { 
  const res = await fetch(`${API}/dashboard/dashboard`, { 
    headers: { Authorization: `Bearer ${token}` } 
  }); 
  
   if (!res.ok) {
    alert('Failed to load dashboard data. Please log in again.');
    logout();
    return;
  }

  const data = await res.json();

/*
  // Handle image display  ------ this will work for localhost
    const imageTag = data.profileImage
      ? `<img src="http://localhost:5000/${data.profileImage}" width="150" />`
      : '<p>No profile image uploaded</p>';
*/

 // Dynamically build image URL
// Remove trailing /api if present in API URL
const baseUrl = API.replace(/\/api$/, '');

// Handle image display
const imageTag = data.profileImage
  ? `<img src="${baseUrl}/${data.profileImage}" width="150" />`
  : '<p>No profile image uploaded</p>';




  document.getElementById('dashboard').innerHTML = ` 
    ${imageTag}
    <p>Username: ${data.username}</p> 
    <p>Role: ${data.role}</p> 
    <p>Balance: $${data.balance}</p> 
    <p>Total Transactions: ${data.totalTransaction}</p> 
  `; 
} 


// Logout helper 
function logout() { 
  localStorage.removeItem('token'); 
  window.location.href = 'login.html'; 
} 


// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
});



loadDashboard();
