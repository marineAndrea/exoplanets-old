import React, { Component } from 'react';
import DropdownHeader from '../Atoms/DropdownHeader';
import Dropdown from '../Atoms/Dropdown';
import Histogram from '../Atoms/Histogram';
import styled from 'styled-components';

const XAxis = styled.div`
  float: left;
  padding-right: 10px;
`;

const YAxis = styled.div`
  float left;
  padding-right: 10px;
`;

class DropdownControl extends Component {
  render() {
    if (this.props.axis === 'x') {
      return (
        <XAxis>
          <DropdownHeader axis={this.props.axis}></DropdownHeader>
          <Dropdown callback={this.props.callback} options={this.props.options} selectedOption={this.props.selectedOption} axes={this.props.axes} axis={this.props.axis}></Dropdown>
          <Histogram data={this.props.data} property={this.props.selectedOption} axis={this.props.axis}></Histogram>
        </XAxis>
      )
    } else if (this.props.axis === 'y') {
      return (
        <YAxis>
          <DropdownHeader axis={this.props.axis}></DropdownHeader>
          <Dropdown callback={this.props.callback} options={this.props.options} selectedOption={this.props.selectedOption} axes={this.props.axes} axis={this.props.axis}></Dropdown>
          <Histogram data={this.props.data} property={this.props.selectedOption} axis={this.props.axis}></Histogram>
        </YAxis>
      )
    };
  }
}

export default DropdownControl;