import React, { Component } from 'react';
import ScatterplotTitle from '../Atoms/ScatterplotTitle';
import Scatterplot from '../Atoms/Scatterplot';
import styled from 'styled-components';

const Container = styled.div`
  clear: both;
  margin: 20px 10%;
  background: white;
`;

class Graph extends Component {
  render() {
    const storyTest = this.props.storyTest || false;
    return (
      <Container>
        <ScatterplotTitle axes={this.props.axes}></ScatterplotTitle>
        <Scatterplot storyTest={storyTest} className="scatterplot" data={this.props.data} xProperty={this.props.axes[0]} yProperty={this.props.axes[1]}></Scatterplot>
      </Container>
    );
  }

}

export default Graph;