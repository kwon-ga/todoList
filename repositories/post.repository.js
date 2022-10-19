const { Posts,sequelize,Sequelize,Todos } = require('../models');

class PostsRepository{
    findAllPosts = async() => {

        try {
            return await Posts.findAll({
                attributes:{
                    exclude:["updatedAt"]
                },

                include : [{
                    model:Todos,
                    attributes:[
                        "todoId",
                        "postId",
                        "content",
                        "done",
                        "createdAt",
                    ]
                }]
            })
        } catch (error) {
            throw new Error(error)
        }

        // // include를 안쓰면 ..?
        // const Query =`
        //     SELECT p.postId,p.userId,p.title,u.nickname ,GROUP_CONCAT("*todoId*:",t.todoId,"/*","content*:*",t.content,"*/*done*:",t.done) AS todo
        //     FROM Posts as p
        //     LEFT JOIN Users as u
        //     ON p.userId = u.userId
        //     LEFT JOIN Todos as t
        //     ON p.postId = t.postId
        //     Group by p.postId;
        // `;

        // try{
        //     const result = await sequelize.query(Query,{type:Sequelize.QueryTypes.SELECT,})
        //     return result
        // }catch(e){
        //     console.error(e);
        // }
    }
    findOneByUserId = async(postId) => {

        try {
            return await Posts.findOne({
                attributes:{
                    exclude:["updatedAt"]
                },
                where:{postId:postId},
                include : [{
                    model:Todos,
                    attributes:[
                        "todoId",
                        "postId",
                        "content",
                        "done",
                        "createdAt",
                    ]
                }]

            });
        } catch (error) {
            throw new Error(error)
        }
        // const Query =`
        //     SELECT p.postId,p.userId,p.title,u.nickname ,GROUP_CONCAT("*todoId*:",t.todoId,"/*","content*:*",t.content,"*/*done*:",t.done) AS todo
        //     FROM Posts as p
        //     LEFT JOIN Users as u
        //     ON p.userId = u.userId
        //     LEFT JOIN Todos as t
        //     ON p.postId = t.postId
        //     WHERE p.postId = ${postId}
        //     Group by p.postId;
        // `;

        // try{
        //     const result = await sequelize.query(Query,{type:Sequelize.QueryTypes.SELECT,})
        //     return result
        // }catch(e){
        //     console.error(e);
        // }
    };
    createPost = async(userId, imageUrl, title) => {
        return await Posts.create({
            userId,
            title,
            imageUrl,
            likesNum:0,
            // likesNum: Math.round(Math.random()*10),
            // commentsNum: Math.round(Math.random()*10)
        });
        
    };
    updatePost = async(userId, postId, title, imageUrl) => {
        
        await Posts.update(
            {title : title, imageUrl: imageUrl}, 
            {where: {userId : userId, postId: postId}},
        )
        return {msg: "Post updated"};
    
    };
    deletePost = async(postId) => {
        await Posts.destroy({where: {postId: postId}});
        return {msg: "Post deleted"};
    };
}

module.exports = PostsRepository;