import Blog from "../models/blog.js";


export const loadDashboard = async function(req,res){
        
    try {
        // fetch the blogs and display
        const blogs = await Blog.find({
            userId: req.user._id
        });

        
        // console.log(' fetch blogs: ',blogs);   
        res.status(200).json({
            status:true,
            message: 'Fetched blogs successfully',
            blogs: blogs
        });
    } catch (error) {
        res.status(500).json({
            message: 'Fetching blogs failed',
            error: error
        });
    }
    
};

export const createBlog = async function(req,res){
    const { title, imageUrl, description } = req.body;
    
    try {
        await Blog.create({
        title: title.trim(),
        image: imageUrl.trim(),
        description: description.trim(),
        userId: req.user._id
        });                                                                         
        // if data is created successfully then send the response.
        res.status(201).json({
            status: true,
            message: 'Blog created successfully',
        });
    } catch (error) {
        
        res.status(500).json({
            message: 'Blog creation failed',
            error: error
        });
    }


};

export const updateBlog = async function(req,res){
    const blogId = req.params.id;
    const { title, imageUrl, description } = req.body;
    try {
        
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
            title: title,
            image: imageUrl,
            description: description
        }, { new: true });
        
        res.status(200).json({
            status: true,
            message: 'Blog updated successfully',
            blog: updatedBlog
        });
    } catch (error) {
        
        res.status(500).json({
            message: 'Blog update failed',
            error: error
        });
    }
};

export const deleteBlog = async function(req,res){
    const blogId = req.params.id;
    try {
        // find the blog by id and delete it.    
        const deletedBlog = await Blog.findByIdAndDelete(blogId);
      
        if (!deletedBlog) {
            return res.status(404).json({
                status: false,
                message: 'Blog not found'
            });
        }
        // if blog is deleted successfully then send the response.
        res.status(200).json({
            status: true,
            message: 'Blog deleted successfully'
        });
    } catch (error) {
        
        res.status(500).json({
            message: 'Blog deletion failed',
            error: error
        });
    }

};

export const getBlogData = async function(req,res){
    const blogId = req.params.id;
    try {      
        
        const blogData = await Blog.findById(blogId);
      
        if (!blogData) {
            return res.status(404).json({
                status: false,
                message: 'Blog not found'
            });
        }

        res.status(200).json({
            status: true,
            message: 'Blog fetched successfully',
            blog: blogData
        });
    } catch (error) {
        
        res.status(500).json({
            message: 'Blog fetching failed',
            error: error
        });
    }

}





