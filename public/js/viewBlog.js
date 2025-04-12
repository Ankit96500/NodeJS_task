
async function viewBlog(){
    const id = localStorage.getItem('blogId');
    if (!id) {
        console.log('No blog ID found in local storage');
       window.location.href = "../home/dashboard.html"; // Redirect to dashboard if no blog ID is found
    }
   

    try {
        const response = await fetch(`http://localhost:3000/blog/edit-blog/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });
        if (response.ok) {
            const data = await response.json();
          
            // Display blog here
            document.getElementById('blog-image').src = data.blog.image;
            document.getElementById('blog-image').style.height = "auto";
            document.getElementById('blog-image').style.width = "auto";


            document.getElementById('blog-title').innerText = data.blog.title;
            document.getElementById('blog-description').innerText = data.blog.description;
            document.getElementById('blog-description').style.fontSize = "20px";                
            document.getElementById('blog-description').style.display = "block";

            

        } else {
            console.error('Error viewing blog:', response.statusText);
        }
    } catch (error) {
        console.error('Error viewing blog:', error);
    }
}



// rediret to dashboard

function goBack(){
    window.location.href = "../home/dashboard.html"; // Redirect to dashboard
}



viewBlog();
