

document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('signup-form').addEventListener('submit', handleFormSubmit)
    
    // Handle form submission signup
    function handleFormSubmit(event) {
        event.preventDefault();
        
        const UserData = {
            password: document.getElementById('password').value,
            email: document.getElementById('email').value,
            image: document.getElementById('image').value,
        };
        // Create a new blog
        SignupUser(UserData);
        
        // Reset the form fields
        document.getElementById('signup-form').reset();
    }
    
    
    // Create a new user (POST)
   async function SignupUser(UserData) {
        try {
            const resp = await fetch(`http://localhost:3000/account/signup-user`,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(UserData)
            }); 
            
            alert('User Has Created Successfully ')
        } catch (error) {
            displayError(error);  // Example error message
            function displayError (error) {
                let err = document.getElementById('custom-alert');
                err.innerHTML = `internal fault: ${error}`;  // Insert error message
                err.style.display = 'block';  // Show the alert
                console.log("-----", error.response);  // Log error response
            
                // Optionally hide the alert after a few seconds
                setTimeout(function () {
                    err.style.display = 'none';  // Hide alert after 5 seconds
                }, 5000);
            }    
        }        
    }
    
});

