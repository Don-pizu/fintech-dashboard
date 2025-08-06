// Set the backend API URL 
// const API = 'http://localhost:5000/api'; // for testing

const API = 'https://fintech-dashboard-2ifo.onrender.com',    //For production after deployment


 document.getElementById('uploadForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      
        const res = await fetch(`${API}/profile/upload-image`, {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token') // ✅ fixed Authorization header
          },
          body: formData
        });


        const data = await res.json();

        if (res.ok) {
          alert(data.message);
        } else {
          alert(data.error || 'Upload failed');
        }

        if (res.status === 200) { 
          window.location.href = 'dashboard.html'; 
        } 
    });
