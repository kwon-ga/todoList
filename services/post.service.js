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
    // deletePosts
    // showAllPosts
    // findOnePosts
}

module.exports = PostsService;