import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showEditor } from '../../actions';

class AddTodo extends React.Component {
  render() {
    return (
      <div>
        <button
          type="button"
          onClick={this.props.showEditor}
          className="btn btn-link btn-block btn-lg"
        >
          <span
            className="glyphicon glyphicon-plus"
            aria-hidden="true"
          />
        </button>
      </div>
    );
  }
}

AddTodo.propTypes = {
  showEditor: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  showEditor: bindActionCreators(showEditor, dispatch),
});

export default connect(null, mapDispatchToProps)(AddTodo);
