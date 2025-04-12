

document.getElementById('login-form').addEventListener('submit',handleFormLogin);


// handel form submission login
function handleFormLogin(event){
    event.preventDefault();

    const UserData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };
    
    // Create a new blog
    LoginUser(UserData);

    // Reset the form fields
    document.getElementById('login-form').reset();
   
}

// login a user (POST)

async function LoginUser(LoginUserData) {
    const e  = document.getElementById('error')
    
    try {
        const response = await fetch('http://localhost:3000/account/login-user',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(LoginUserData)
        })
        console.log("resposne: ",response);
        
        if (response.ok) {
            const fetchData = await response.json()
            console.log("::=> ",fetchData);
    
            localStorage.setItem('token',fetchData.token);
            localStorage.setItem('userEmail',fetchData.data.email);
            localStorage.setItem('userImage',fetchData.data.image);
            // Redirect to Home page
            window.location.href = "../home/dashboard.html"; 

            // user does not exist
        }else if(response.status === 404){
            let err = document.getElementById('custom-alert');
            const fetchData = await response.json();
            err.innerHTML = fetchData.error;  // Insert error message
            err.style.display = 'block';  // Show the alert

            // user credientials not match
        }else if(response.status === 401){
            let err = document.getElementById('custom-alert');
            const fetchData = await response.json();
            err.innerHTML = fetchData.error;  // Insert error message
            err.style.display = 'block';  // Show the alert

        }
    } catch (error) {
        console.log("error :=>",error);
        
        displayError(error);  // Example error message
        function displayError (error) {
            let err = document.getElementById('custom-alert');
            err.innerHTML = ` internal fault : ${error}`;  // Insert error message
            err.style.display = 'block';  // Show the alert
            console.log("-----", error.response);  // Log error response
        
            // Optionally hide the alert after a few seconds
            setTimeout(function () {
                err.style.display = 'none';  // Hide alert after 5 seconds
            }, 5000);
        }
    }
}



// if user already exist re direct to dashbord page
if (localStorage.getItem("token")){
    window.location.href = "../home/dashboard.html";
}



