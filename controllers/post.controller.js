const PostsService = require('../services/post.service');
const TodoService = require('../services/todo.service');

class PostsController {
    postsService = new PostsService();
    todoService = new TodoService();

    // createPosts
    createPosts = async (req,res,next)=>{

        try {
            const {title,imageUrl,todo} = req.body;
            const {userId} = res.locals.user;
            
            // post 작성 -> 작성 성공 시 postId 반환
            const postResult = await this.postsService.createPosts(title,imageUrl,userId);

            // postId 기반 todoList 생성
            await this.todoService.createTodos(userId,postResult.postId,todo);           
    
            res.status(200).json({ "msg": "게시들 등록 완료!" }); 
            
        } catch (error) {
            next(error);
        }
    }

     // findOneByPostId
    // findAllPosts
    // deletePosts
    // updatePosts
    
}

module.exports = PostsController;