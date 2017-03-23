import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addTodo, hideEditor } from '../../actions';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  updateText = (event) => {
    this.setState({
      text: event.target.value,
    });
  }

  catchEnter = (event) => {
    if (event.keyCode === 13) {
      this.props.addTodo(this.state.text);
      this.props.hideEditor();
    }
  }

  add = () => {
    this.props.addTodo(this.state.text);
    this.props.hideEditor();
  }

  render() {
    return (
      <tr>
        <td>
          <input
            type="text"
            value={this.state.text}
            onChange={this.updateText}
            onKeyDown={this.catchEnter}
            placeholder="Add new todo..."
            className="form-control"
            autoFocus="true"
          />
        </td>
        <td>
          <button
            type="button"
            onClick={this.add}
            className="btn btn-link pull-right"
          >
            <span
              className="glyphicon glyphicon-plus"
              aria-hidden="true"
            />
          </button>
        </td>
      </tr>
    );
  }
}

Editor.propTypes = {
  addTodo: PropTypes.func,
  hideEditor: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  addTodo: bindActionCreators(addTodo, dispatch),
  hideEditor: bindActionCreators(hideEditor, dispatch),
});

export default connect(null, mapDispatchToProps)(Editor);
