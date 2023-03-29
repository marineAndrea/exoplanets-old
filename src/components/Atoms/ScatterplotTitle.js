import React, { Component } from 'react';
import styled from 'styled-components';

const Label = styled.h3`
  padding: 10px;
`;

class ScatterplotTitle extends Component {
  render() {
    return (
      <Label>{this.props.axes[0]} vs. {this.props.axes[1]}</Label>
    );
  }
}

export default ScatterplotTitle;