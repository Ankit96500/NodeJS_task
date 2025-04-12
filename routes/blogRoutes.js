
import { Router } from "express";
import {createBlog,loadDashboard,updateBlog,deleteBlog,getBlogData} from "../controllers/blog.js";

// add middelware
import {UserAuthorized} from "../middleware/authorize.js"

const route = Router();


route.post('/create-blog',UserAuthorized,createBlog);

route.get('/load-dashboard',UserAuthorized,loadDashboard);

route.put('/update-blog/:id',UserAuthorized,updateBlog);

route.delete('/delete-blog/:id',UserAuthorized,deleteBlog);

route.get('/edit-blog/:id',UserAuthorized,getBlogData);

export default route