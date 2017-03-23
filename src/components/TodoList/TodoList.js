import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Editor from '../Editor';
import TodoItem from '../TodoItem';
import { getTodos } from '../../actions';

class TodoList extends React.Component {
  render() {
    const rows = this.props.todos.map((item, index) =>
      <TodoItem key={index} index={index} item={item} />);

    if (this.props.adding) {
      rows.push(<Editor key={-1} />);
    }

    return (
      <table className="table">
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

TodoList.propTypes = {
  todos: React.PropTypes.arrayOf(React.PropTypes.object),
  adding: PropTypes.bool,
  getTodos: PropTypes.func,
};

const mapStateToProps = state => ({
  todos: state.todos,
  adding: state.adding,
});

const mapDispatchToProps = dispatch => ({
  getTodos: bindActionCreators(getTodos, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
