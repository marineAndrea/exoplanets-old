import React, { Component } from 'react';
import * as d3 from 'd3';

class Scatterplot extends Component {
  data = this.props.data;
  updated = false;
  margin = {
    top: 20,
    right: 10,
    bottom: 20,
    left: 40
  };
  width = 0.8 * window.innerWidth - this.margin.left - this.margin.right; // getting the native window obj in order to display diagrams relative to the width of the window
  scatterplotWidth = this.width; // in case we add legend on the right
  height = this.scatterplotWidth / 2 - this.margin.top - this.margin.bottom;
  radius = 3;
  
  componentWillReceiveProps(nextProps) {
    this.data = this.filterData(nextProps.data, nextProps.xProperty, nextProps.yProperty);
    if (this.props.xProperty !== '' && this.props.yProperty !== '') {
      this.updated = true;
    }
    if (this.props.storyTest) {
      this.updated = false;
    }
  }
  
  render() {
    if (!this.updated) {
      this.drawScatterplot(this.data);
    } else {
      this.updateScatterplot(this.data);
    }
    return (
      <div className="scatterplot"></div>
    );
	}

	drawScatterplot(data) {
    // set the ranges then scale range
    const x = d3.scaleLinear().range([0, this.scatterplotWidth]);
    const y = d3.scaleLinear().range([this.height, 0]);
    
    // select element on which the svg is appended
    const svg = d3.select('.scatterplot')
      .append('svg')
      .attr('class', 'scatterplot-svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
			.attr('height', this.height + this.margin.top + this.margin.bottom);
			
		const rangeParams = this.getRangeParams(data);
    this.setDomain(rangeParams, x, y);

    // append the circles to the svg element
    const circles = svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle');
    this.drawCircles(circles, x, y);

    // add x and y axes
    const xAxis = svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(${this.margin.left},${this.height + this.margin.top})`);
    this.drawXAxis(xAxis, x, rangeParams.xMax);
    const yAxis = svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
    this.drawYAxis(yAxis, y, rangeParams.yMax);
	}
  
  updateScatterplot(data) {
    // set the ranges then scale range
    const x = d3.scaleLinear().range([0, this.scatterplotWidth]);
    const y = d3.scaleLinear().range([this.height, 0]);

    const rangeParams = this.getRangeParams(data);
    this.setDomain(rangeParams, x, y);

    const svg = d3.select('.scatterplot-svg');
    const circles = svg.selectAll('circle')
      .data(data);

    // remove extra circles
    circles.exit().remove();

    // update circles
    this.drawCircles(circles, x, y);

    // add extra circles
    circles.data(data)
      .enter()
      .append('circle')
    this.drawCircles(circles, x, y);

    // update x and y axes
    const xAxis = svg.select('.x-axis');
    this.drawXAxis(xAxis, x, rangeParams.xMax);
    const yAxis = svg.select('.y-axis');
    this.drawYAxis(yAxis, y, rangeParams.yMax);
  }

  filterData(data, xProperty, yProperty) {
		// filter out undefined and NaN from the data
    return data.filter((d) => {
      return (d[xProperty] !== undefined && d[yProperty] !== undefined
        && !isNaN(d[xProperty]) && !isNaN(d[yProperty]));
		});
  }
	
	drawCircles(circles, x, y) {
    const t = d3.transition()
      .duration(this.transDuration);
      circles.transition(t)
        .attr('id', (d) => {
          return d['P. Name'];
        })
        .attr('cx', (d) => {
          return x(d[this.props.xProperty]) + this.margin.left;
        })
        .attr('cy', (d) => {
          return y(d[this.props.yProperty]) + this.margin.top;
        })
        .attr('r', this.radius);
  }
	
	drawXAxis(axis, range, max) {
    if (this.xProperty === 'S. No. Planets' || this.xProperty === 'S. No. Planets HZ') { // S No. Planets HZ does not display exactly max value
      axis.call(d3.axisBottom(range).ticks(max).tickFormat(d3.format('.0s')));
    }
    if (this.xProperty === 'P. Disc. Year') { // remove comma after 3rd decimal
      axis.call(d3.axisBottom(range).tickFormat(d3.format('d')));
    } else {
      axis.call(d3.axisBottom(range).tickFormat(d3.format('.0s')));
    }
	}
	
  drawYAxis(axis, range, max) {
    if (this.yProperty === 'P. Disc. Year') {
      axis.call(d3.axisLeft(range).tickFormat(d3.format('d')));
    } else if (this.yProperty === 'S. No. Planets' || this.yProperty === 'S. No. Planets HZ') {
      axis.call(d3.axisLeft(range).ticks(max).tickFormat(d3.format('.0s')));
    } else {
      axis.call(d3.axisLeft(range).tickFormat(d3.format('.0s')));
    }
	}
	
	// scale the range with added padding such that circles don't overlap the axis
  setDomain(params, x, y) {
    const xPadding = (params.xMax - params.xMin) / 60;
    const yPadding = (params.yMax - params.yMin) / 60;
    x.domain([params.xMin - xPadding, params.xMax + xPadding]);
    y.domain([params.yMin - yPadding, params.yMax + yPadding]);
  }

	getRangeParams(data) {
    return {
      xMin: d3.min(data, (d, i) => {
        return d[this.props.xProperty];
      }),
      xMax: d3.max(data, (d) => {
        return d[this.props.xProperty];
      }),
      yMin: d3.min(data, (d) => {
        return d[this.props.yProperty];
      }),
      yMax: d3.max(data, (d) => {
        return d[this.props.yProperty];
      }),
    };
	}
}

export default Scatterplot;