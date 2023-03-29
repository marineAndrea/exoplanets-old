import React, { Component } from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  font-size: 150%;
  text-align: center;
  padding: 40px 0 30px;
`;

class Title extends Component {
  render() {
    return (
      <H1>Exoplanet Data Explorer!</H1>
    );
  }
}

export default Title;