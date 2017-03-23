export function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text,
  };
}

export function deleteTodo(index) {
  return {
    type: 'DELETE_TODO',
    index,
  };
}

function receiveTodos(todos) {
  return {
    type: 'RECEIVE_TODOS',
    todos,
  };
}

export function getTodos() {
  return async (dispatch, getState, { graphqlRequest }) => {
    const { data } = await graphqlRequest('{todo{text}}');
    dispatch(receiveTodos(data.todo));
  };
}

export function showEditor() {
  return {
    type: 'SHOW_EDITOR',
  };
}

export function hideEditor() {
  return {
    type: 'HIDE_EDITOR',
  };
}
