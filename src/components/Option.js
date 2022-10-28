import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Option extends Component {
  render() {
    const { name, value } = this.props;
    return (
      <option
        value={ value }
      >
        { name }
      </option>
    );
  }
}

Option.propTypes = {
  name: PropTypes.any,
  value: PropTypes.any,
}.isRequired;
