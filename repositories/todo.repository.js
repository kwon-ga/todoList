const { Todos } = require('../models');

class TodosRepository{
    // findAllById
    findAllById = async(userId) => {
        return await Todos.find({where : {userId: userId}});
    }
    // findOneByPostId
    findOneByPostId = async(postId) => {
        return await Todos.find({where : {postId: postId}});
    };
    // createTodo
    createTodo = async(postId,userId, content) => {
        return await Todos.create({
            userId,
            postId,
            content,
            done: false
        });
    };
    // clearTodo
    clearTodo = async(todoId) => {
        const todoInfo = await Todos.find({where : {todoId : todoId}});
        const isDone = todoInfo.done;
        return await Todos.update(
            {where: {todoId : todoId}},
            {done : !isDone} 
        )
    };
    // deleteTodo
    deleteTodo = async(todoId) => {
        return await Todos.delete({where: {todoId: todoId}});
    };

    updateTodo = async(postId,userId,content,done) => {
        
        await Todos.update(
            {content : content, done: done}, 
            {where: {postId: postId}},
        )

        return {msg: "Todos updated"};
    }
}

module.exports = TodosRepository;