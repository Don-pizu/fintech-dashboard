// Set the backend API URL 
// const API = 'http://localhost:5000/api'; // for testing

const API = 'https://fintech-dashboard-2ifo.onrender.com/api';    //For production after deployment

document.getElementById('overrideForm').addEventListener('submit', async (e) => { 
  e.preventDefault(); 

  const id = document.getElementById('txnId').value; 
  const type = document.getElementById('newType').value; 
  const amount = parseFloat(document.getElementById('newAmount').value); 

  const payload = {}; 
  if (type) payload.type = type; 
  if (!isNaN(amount)) payload.amount = amount; // Avoid NaN submission

  const res = await fetch(`${API}/admin/transactions/${id}`, { 
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json', 
      Authorization: `Bearer ${localStorage.getItem('token')}` 
    }, 
    body: JSON.stringify(payload) 
  }); 


  const data = await res.json(); 
  alert(data.message || 'Override complete'); 

  if (res.status === 200) { 
    window.location.href = 'dashboard.html'; 
  } 
});
