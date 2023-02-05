import { v4 as uuidv4 } from 'uuid';
import { writable } from 'svelte/store'; // writable es como un useState de react, 
import { browser } from '$app/environment';// Determina si la aplicación se está ejecutando en un navegador o no.

const data = browser ? JSON.parse(window.localStorage.getItem('st-todo-list')) ?? [] : []; // ?? permite que que la expresión a la derecha sea utilizada si la expresión a la izquierda es null o undefined

export const todos = writable(data);

todos.subscribe(( value ) =>{                                           // Permite escuchar los cambios en el valor de todos
    if( browser ){                                                      // Si cambio ese valor
        localStorage.setItem('st-todo-list', JSON.stringify( value ));  // Se guarda en localStorage 

    }
});

export const addTodo = () => {
    todos.update((currentTodos => {
        return [...currentTodos, {
            id: uuidv4(),
            text:'',
            complete: false
        }];
    }));
}

export const deleteTodo = (id) => {
    todos.update((currentTodos ) => {
        return currentTodos.filter(( todo ) => todo.id !== id );
    })
}

export const toggleComplete = (id) => {
    todos.update((currentTodos ) => {
        return currentTodos.map(( todo ) => {
            if( todo.id === id ){
                return { ...todo, complete:!todo.complete }
            }
            return todo;
        });
    })
}

export const editTodo = ( id, text ) => {
    todos.update((currentTodos ) => {
        return currentTodos.map(( todo ) => {
            if( todo.id === id ){
                return { ...todo, text }
            }
            return todo;
        });
    })
}
