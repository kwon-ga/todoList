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
    createTodo = async(userId, postId, content) => {
        await Todos.create({
            userId,
            postId,
            content,
            done: false,
        });
        return {msg: "Todos created"}
    };
    // clearTodo
    clearTodo = async(todoId, done) => {
        let newDone = false;
        if(done === false){
            newDone = true;
        }

        await Todos.update(
            {where: {todoId : todoId}},
            {done : newDone} 
        )
    };
    // deleteTodo
    deleteTodo = async(todoId) => {
        await Todos.delete({where: {todoId: todoId}});
        return {msg: "Todos deleted"};
    };
}

module.exports = TodosRepository;