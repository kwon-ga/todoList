const TodosRepository = require('../repositories/todo.repository');

class TodosService {
    todosRepository = new TodosRepository();

    // createTodos
    createTodos = async (userId,postId,todo)=>{
        
        // todo 수 만큼 todolist 생성
        for(let todoList in todo){
            await this.todosRepository.createTodo(postId, userId, todo[todoList].content);
        }

        return {msg: "Todos created"}
    }

    // clearTodos
    // deleteTodos
}

module.exports = TodosService;