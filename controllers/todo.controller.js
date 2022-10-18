const TodosService = require('../services/todo.service');

class TodosController {
    todosService = new TodosService();

    // createTodo
    createTodo = async(req, res, next) => {
        try {
            console.log(userId)
            console.log(postId)
            console.log(todo)
            await this.todosService.createTodo(userId, postId, todo);
            res.status(200).json({msg: 'TotoList가 등록되었습니다.'});
        } catch (error) {
            res.status(400).send(error);
        }
    }
    // clearTodo
    clearTodo = async(req, res, next) => {
        try {
            const { todoId } = req.params;
            await this.todosService.clearTodo(todoId);
            res.status(200).json({msg: 'Done is updated'});
        } catch (error) {
            res.status(400).send(error);
        }
    }
    // deleteTodo
    deleteTodo = async(req, res, next) => {
        try {
            const { todoId } = req.params;
            await this.todosService.deleteTodo(todoId);
            res.status(200).json({msg: 'Todo is deleted'});
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = TodosController;