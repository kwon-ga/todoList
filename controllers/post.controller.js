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
            
            res.status(200).json({ "msg": "게시들 등록 완료!"}); 

        } catch (error) {
            next(error);
        }
    }
    
    // findOneByPostId
    findOneByPostId = async (req,res,next)=>{
        try {
            let result = await this.postsService.findOnePosts(req.params.postId);
            res.status(200).json({ "data": result}); 
        } catch (error) {
            next(error);
        }
    }

    findAllPosts = async (req,res,next)=>{
        
        try {
            let result = await this.postsService.showAllPosts();
            res.status(200).json({ "data": result});
        } catch (error) {
            next(error)
        }
    }


    // updatePosts
    updatePosts = async (req,res,next)=>{
        try {
            const { postId } = req.params;
            const { title,todo ,imageUrl} = req.body;
            const { userId }= res.locals.user;
            
            // 게시글 수정
            await this.postsService.updatePosts(postId,title,todo,imageUrl,userId);
            

            // 게시글 하위의 todo 수정
            await this.todoService.updateTodos(postId,userId,todo);

            res.status(200).json({ "msg": "게시물 수정 완료!"}); 
            
        } catch (error) {
            next(error);
        }
    }

    
    // deletePosts
    deletePosts = async (req,res,next)=>{
        const { postId } = req.params;
        const deleteResult = await this.postsService.deletePosts(postId);
        res.status(200).json({ "msg": "게시물 삭제 완료!"}); 
    }
    
}

module.exports = PostsController;