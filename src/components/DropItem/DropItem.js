import React, { PropTypes } from 'react';

class DropItem extends React.Component {
  render() {
    const { css, name, imgSrc } = this.props

    return (
      <div className={css.dropItem}>
        <div><img className={css.xlsxImg} src={imgSrc} /></div>
        <label className={css.fileName}>
          {name}
        </label>
      </div>
    );
  }
}

DropItem.propTypes = {
  css: PropTypes.object,
  name: React.PropTypes.string,
  imgSrc: PropTypes.string,
};

export default DropItem

