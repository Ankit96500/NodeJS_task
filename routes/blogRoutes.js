
import { Router } from "express";
import {createReadBlog,loadDashboard,updateBlog,deleteBlog} from "../controllers/blog.js";

// add middelware
import {UserAuthorized} from "../middleware/authorize.js"

const route = Router();


route.post('/create-read-blog',UserAuthorized,createReadBlog);

route.get('/load-dashborad',UserAuthorized,loadDashboard);

route.put('/update-blog/:id',UserAuthorized,updateBlog);

route.delete('/delete-blog/:id',UserAuthorized,deleteBlog);


export default route