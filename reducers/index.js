import { combineReducers } from 'redux';

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state, { text: action.text },
      ];
    case 'DELETE_TODO':
      return [
        ...state.slice(0, action.index), ...state.slice(action.index + 1),
      ];
    case 'RECEIVE_TODOS':
      return action.todos;
    default:
      return state;
  }
}

function adding(state = false, action) {
  switch (action.type) {
    case 'SHOW_EDITOR':
      return true;
    case 'HIDE_EDITOR':
      return false;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  todos,
  adding,
});

export default rootReducer;
