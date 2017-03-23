import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteTodo } from '../../actions';

class TodoItem extends React.Component {
  delete = () => {
    this.props.deleteTodo(this.props.index);
  }

  render() {
    return (
      <tr>
        <td>{this.props.item.text}</td>
        <td>
          <button
            type="button"
            onClick={(this.delete)}
            className="btn btn-link pull-right"
          >
            <span
              className="glyphicon glyphicon-remove"
              aria-hidden="true"
            />
          </button>
        </td>
      </tr>
    );
  }
}

TodoItem.propTypes = {
  index: React.PropTypes.number,
  item: React.PropTypes.object,
  deleteTodo: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  deleteTodo: bindActionCreators(deleteTodo, dispatch),
});

export default connect(null, mapDispatchToProps)(TodoItem);

