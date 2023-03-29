import React, { Component } from 'react';
import DropdownControl from '../Molecules/DropdownControl';
import styled from 'styled-components';

const Div = styled.div`
  padding: 0 10%;
  overflow: hidden;
`;

class ControlPanel extends Component {
  render() {
    return (
      <Div>
        <DropdownControl callback={this.props.callback} data={this.props.data} options={this.props.options} selectedOption={this.props.axes[0]} axes={this.props.axes} axis='x'></DropdownControl>
        <DropdownControl callback={this.props.callback} data={this.props.data} options={this.props.options} selectedOption={this.props.axes[1]} axes={this.props.axes} axis='y'></DropdownControl>
      </Div>
    )
  }
}

export default ControlPanel;