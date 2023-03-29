import React, { Component } from 'react';
import styled from 'styled-components';

class Dropdown extends Component {
  onChange = (evt) => {
    if (this.props.axis === 'x') {
      this.props.callback([evt.target.value, this.props.axes[1]]);
    } else if (this.props.axis === 'y') {
      this.props.callback([this.props.axes[0], evt.target.value]);
    }
  }
  render() {
    const Div = styled.div`
      background: 'red';
    `;
    const options = this.props.options.map(function(option) {
      return (
        <option key={option}>
          {option}
        </option>
      );
		});
		return (
      <Div>
			<select
				className="selected-axis ui fluid search selection dropdown"
				value={this.props.selectedOption}
				onChange={this.onChange}
			>
				{options}
			</select>
      </Div>
		);
  }
}

export default Dropdown;