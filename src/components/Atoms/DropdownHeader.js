import React, { Component } from 'react';
import styled from 'styled-components';

const StyledHeader = styled.h2`
  padding: 10px 0;
  font-weight: bold;
`;

class DropdownHeader extends Component {
  render() {
    return (
      <StyledHeader>{this.props.axis}-axis</StyledHeader>
    );
  }
}

export default DropdownHeader;