const TodosRepository = require('../repositories/todo.repository');

class TodosService {
    todosRepository = new TodosRepository();

    // createTodo
    createTodo = async (userId,postId,todo)=>{
        // todo 수 만큼 todolist 생성
        for(let todoList in todo){
            await this.todosRepository.createTodo(postId, userId, todo[todoList].content);
        }

        return {msg: "Todos created"}
    }

    // clearTodo
    clearTodo = async (todoId) => {
        return await this.todosRepository.clearTodo(todoId);
    }
    // deleteTodo
    deleteTodo = async (todoId) => {
        return await this.todosRepository.deleteTodo(todoId);
    }
}

module.exports = TodosService;