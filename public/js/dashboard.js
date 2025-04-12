
const userEmail = document.getElementById('username');


// load dashboard page
async function loadDashboard() {
    // load the dashboard page
    const userEmailValue = localStorage.getItem('userEmail');
    userEmail.innerHTML = userEmailValue.substring(0, userEmailValue.indexOf('.'));
   
    try {
        const response = await fetch('http://localhost:3000/blog//load-dashborad',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();


    } catch (error) {
        console.error('Error fetching recent activity:', error);
    }
}



// logout button
document.getElementById('logoutBtn').addEventListener('click', function() {
    // clear all storage 
    localStorage.clear();
    window.location.href = '../account/login.html'
})  ;






loadDashboard();