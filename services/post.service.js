const PostsRepository = require('../repositories/post.repository');

class PostsService {
    postsRepository = new PostsRepository();

    // createPosts
    createPosts = async (title,imageUrl,userId) => {
        try {

            // 게시글 생성
            const result = await this.postsRepository.createPost(userId, imageUrl, title);

            // 게시물 작성 성공 시 postId 반환
            return {postId:result.postId}; 

        } catch (error) {
            throw new Error(error);
        }
    }
    // updatePosts
    updatePosts = async (postId,title,todo,imageUrl,userId)=>{
        try {
            // postId로 게시글 조회
            const findOneResult = await this.postsRepository.findOneByUserId(postId);
            
            // 로그인 유저가 쓴 글인지 확인
            if(findOneResult.userId !== userId){ throw new Error('권한이 없습니다.'); }
    
            // 게시글 수정
            const updateResult = await this.postsRepository.updatePost(userId, postId, title, imageUrl);
            
            return updateResult
            
        } catch (error) {
            throw new Error(error);
        }
    }

    showAllPosts = async ()=>{

        try {
            
            const findAllResultfindAll = await this.postsRepository.findAllPosts();
            return findAllResultfindAll;
        } catch (error) {
            throw new Error(error);
        }

        // // include를 안쓴다면 ?
        // try {
        //     const findAllResult = await this.postsRepository.findAllPosts();
            
    
        //     for(let i = 0 ; i <findAllResult.length ;i++){
        //         let todo = [];
        //         let str = findAllResult[i].todo;
        //         let arr = str.split(',');
        //         for(const data of arr){
        //             let obj = JSON.parse('{'+data.replace(/\//g,',').replace(/\*/g,'\"')+'}');
        //             todo.push(obj);
        //         }
        //         findAllResult[i].todo = todo;
        //     }
    
        //     return findAllResult
            
        // } catch (error) {
        //     throw new Error(error);
        // }
    }

    findOnePosts = async (postId)=>{

        try {
            const findOneResult = await this.postsRepository.findOneByUserId(postId);
            return findOneResult
        } catch (error) {
            throw new Error('게시글이 존재하지 않습니다.');
        }

        // try {
        //     const [ findOneResult ]= await this.postsRepository.findOneByUserId(postId);
        //     const arr = findOneResult.todo.split(',');
        //     let todo = [];
    
        //     for(const data of arr){
        //         let obj = JSON.parse('{'+data.replace(/\//g,',').replace(/\*/g,'\"')+'}');
        //         todo.push(obj);
        //     }
        //     findOneResult.todo = todo;
            
        //     return findOneResult
        // } catch (error) {
        //     throw new Error('게시글이 존재하지 않습니다.');
        // }
    }
    
    // deletePosts
    deletePosts = async (postId)=>{
        const result = await this.postsRepository.deletePost(postId);
        console.log(result);
        return result
    }
    
}

module.exports = PostsService;