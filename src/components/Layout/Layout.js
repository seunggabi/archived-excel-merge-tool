import React from 'react';
import AddTodo from '../AddTodo';
import TodoList from '../TodoList';

export default class Layout extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-sm-offset-3">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="text-center">React Todo Example</h4>
                <AddTodo />
              </div>
              <div className="panel-body">
                <TodoList />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
