

const userEmail = document.getElementById('username');
const userImage = document.getElementById('userimg');
const submitBlogBtn = document.getElementById('submitBlogBtn');


let editBlogId = null; // Variable to store the ID of the blog being edited

// load dashboard page
async function loadDashboard() {
    // load the dashboard page
    const userEmailValue = localStorage.getItem('userEmail') || " ";
    const userImageValue = localStorage.getItem('userImage') || " ";
    userEmail.innerHTML = userEmailValue.substring(0, userEmailValue.indexOf('.'));
    submitBlogBtn.innerText = "Create Blog";

    // set only if we have vaild img url
    if (userEmailValue.trim() !== "") {
        userImage.src = userImageValue;
        userImage.alt = "user image default";
        userImage.style.width = "30px";
        userImage.style.height = "30px";
        userImage.style.borderRadius = "50%";
    }

    try {
        const response = await fetch('http://localhost:3000/blog/load-dashboard',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':localStorage.getItem('token')
            }
        });

        if(response.ok){
            const fetchData = await response.json();
            // display blogs in table:
            // console.log('>>>',fetchData);
            displayBlogs(fetchData);    
        }


    } catch (error) {
        console.error('Error fetching recent activity:', error);
    }
}


// submit blog form data:
document.getElementById('blog-form').addEventListener('submit',function(e){
    e.preventDefault();

    const blogData = {
        title: document.getElementById('title').value,
        imageUrl: document.getElementById('imageUrl').value,
        description : document.getElementById('description').value,
    }
   
    if (editBlogId) {
        updateBlog(editBlogId,blogData);
    } else {
        createBlog(blogData);
    }
    
    
    // Reset the form fields
    document.getElementById('blog-form').reset();

});


// logout button
document.getElementById('logoutBtn').addEventListener('click', function() {
    // clear all storage 
    localStorage.clear();
    window.location.href = '../account/login.html'
})  ;

// display blogs in table
function displayBlogs(fetchData){
    const fetchDataArray = fetchData.blogs;
    if (Array.isArray(fetchDataArray) && fetchDataArray.length > 0) {
        document.querySelector('#blogs').style.display = 'block';
        
        const tableBody = document.querySelector('#blogsTable tbody');
        tableBody.innerHTML = ""; // Clear any previous rows

        fetchDataArray.forEach((blog, index) => {  
            const row = document.createElement('tr');
            // Create a new row for each blog
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${blog.title}</td>
                <td>${blog.description}</td>
                <td>
                   <div style="display: flex; justify-content: space-between; align-items: center; gap:10px;">
                    <button class = "deleteBtn" onclick="deleteBlog('${blog._id}')">Delete</button>
                    <button class = "editBtn" onclick="editBlog('${blog._id}')">Edit</button> 
                   </div>             
                </td>
                <td>    
                    <button onclick="viewBlogRedirect('${blog._id}')">View</button>              
                </td>
            `;

            tableBody.appendChild(row);
        });
        
    }else{
        
        console.log('No blogs available');
        document.getElementById('noBlogs').innerText = 'No blogs available';
        document.getElementById('blogs').style.display = 'none';
    }



}

async function createBlog(blogData){
        // call backed to save the data in database
        try {
            // storing the data
            const response = await fetch('http://localhost:3000/blog/create-blog',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(blogData)
            });
            if (response.ok) {
                // console.log('-->',response);
                // if request made successfully then call to load dashboard.
                loadDashboard();
            } else {
                console.error('Error creating blog:', response.statusText);
            }
    
        } catch (error) {
            console.error('Error submitting blog form:', error);
        }
}

async function updateBlog(id, updatedData){
    try {
        
        const response = await fetch(`http://localhost:3000/blog/update-blog/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(updatedData)
        });
        if (response.ok) {
            console.log('Blog updated successfully');
            loadDashboard();
        } else {
            console.error('Error updating blog:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating blog:', error);
        
    }
}


async function deleteBlog(id){
    console.log('delete blog', id);
    // confirm deletion
    const confirmed = confirm('Are you sure you want to delete this blog?');
    if (!confirmed) 
        return; // exit if not confirmed
    try {
        const response = await fetch(`http://localhost:3000/blog/delete-blog/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });
        if(response.ok){
            console.log('Blog deleted successfully');
            loadDashboard();
        }else{
            console.error('Error deleting blog:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting blog:', error);
    }
}   


async function editBlog(id){
    console.log('edit blog',id);
    try {
        const response = await fetch(`http://localhost:3000/blog/edit-blog/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });
        if(response.ok){
            const data = await response.json();
            console.log('data',data);
            document.getElementById('title').value = data.blog.title;
            document.getElementById('imageUrl').value = data.blog.image;
            document.getElementById('description').value = data.blog.description;
            editBlogId = id;  // Set the blog id to edit
            submitBlogBtn.innerText = "Update Blog"; // update value dynamically
        }else{
            console.error('Error editing blog:', response.statusText);
        }
    } catch (error) {
        console.error('Error editing blog:', error);
    }
}

function viewBlogRedirect(id){
    console.log('view blog redirect', id);
    localStorage.setItem('blogId', id); // Store the blog ID in local storage
    // Redirect to the view blog page
    window.location.href = "../home/viewBlog.html";
}



loadDashboard();