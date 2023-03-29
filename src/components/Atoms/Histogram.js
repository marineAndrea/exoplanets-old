import React, { Component } from 'react';
import * as d3 from 'd3';

class Histogram extends Component {
  data = this.props.data;
  margin = {
    top: 20,
    right: 10,
    bottom: 20,
    left: 10
  };
  width = 0.4 * window.innerWidth - this.margin.left - this.margin.right - 10;
  height = this.width / 3 - this.margin.top - this.margin.bottom;
  
  componentWillReceiveProps(nextProps) {
    this.data = this.filterData(nextProps.data, nextProps.property);
	}

  render() {
    this.drawHistogram(this.data);
    return (
      <div className={this.props.axis}></div>
    );
	}

	filterData(data, property) {
		// filter out undefined and NaN from the data
    return data.filter((d) => {
      return (d[property] !== undefined && !isNaN(d[property]));
		});
	}
	
	drawHistogram(data) {
		const dataArr = [];
		data.forEach((d) => {
			dataArr.push(d[this.props.property]);
    })
    // set the x range then scale
    const [min, max] = d3.extent(dataArr);

    const x = d3.scaleLinear()
      .domain([min, this.props.property === 'S. No. Planets' ? max + 1 : max]) // S No. Planets value is an integer
      .rangeRound([0, this.width - 3]) // add padding so that the last tick value on x axis is fully displayed
      .nice();

    // set the parameters for the histogram
    const binCount = Math.ceil(this.width / 50); // relative to window width
    const thresholds = x.ticks(binCount);
    const histogram = d3.histogram()
      .domain(x.domain())
      .thresholds(thresholds);
    const bins = histogram(dataArr);
    if (bins[bins.length - 1].length === 0) {
      bins.pop();
    }
		
    // set the y range then scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, (d) => {
        return d.length;
      })])
      .range([this.height, 0]);

    // select element on which the svg is appended, and remove the svg before appending it again
		d3.select(`.${this.props.axis}`).select('svg').remove();
    const svg = d3.select(`.${this.props.axis}`)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);
    
    // append the bar rectangles to the svg element
    const bar = svg.selectAll('.bar')
      .data(bins)
      .enter()
      .append('g')
      .attr('class', 'bar')
      .attr('transform', (d) => {
        return `translate(${(x(d.x0) + ((x(d.x1) - x(d.x0)) / 20))}, ${y(d.length)})`;
      })
      .attr('width', (d) => {
        return x(d.x1) - x(d.x0);
      });

    bar.append('rect')
      .attr('x', this.margin.left)
      .attr('y', this.margin.bottom)
      .attr('width', (d) => {
        return x(d.x1) - x(d.x0) - ((x(d.x1) - x(d.x0)) / 10);
      })
      .attr('height', (d) => {
        return this.height - y(d.length);
      });
    
    bar.append('text')
      .attr('y', 16)
      .attr('x', (d) => {
        return (x(d.x1) - x(d.x0)) / 2;
      })
      .text((d) => {
        return d.length;
      });

    // add x axis
    const xAxis = svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${(this.height + this.margin.top)})`);
    if (this.props.property === 'P. Disc. Year' || this.props.property === 'S. No. Planets HZ') { // remove comma after 3rd decimal
      xAxis.call(d3.axisBottom(x).tickValues(thresholds).tickFormat(d3.format('d')));
    } else {
			xAxis.call(d3.axisBottom(x).tickValues(thresholds).tickFormat(d3.format('.0s')));
    }
  }
}

export default Histogram;