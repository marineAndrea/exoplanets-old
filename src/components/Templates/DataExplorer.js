import React, { Component } from 'react';
import * as d3 from 'd3';
import ControlPanel from '../Organisms/ControlPanel';
import Graph from '../Molecules/Graph';
import Title from '../Atoms/Title';
import styled from 'styled-components';

const Page = styled.div`
  font-family: 'Lato', sans-serif;
  background: whitesmoke;
  height: 100vh;
`;

const Container = styled.div`
  padding-bottom: 20px;
  height: 100%;
`;

class DataExplorer extends Component {
  uniqueProperties = [
    'P. Name',
    'P. Name Kepler',
    'P. Name KOI',
    'S. Name HD',
    'S. Name HIP',
  ];

  categoricalProperties = [
    'P. Zone Class',
    'P. Mass Class',
    'P. Composition Class',
    'P. Atmosphere Class',
    'P. Habitable Class',
    // 'S. Constellation', too many categories
    // 'S. Type', too many categories
    'P. Disc. Method'
  ];

  booleanProperties = [
    'S. HabCat',
    'P. Habitable',
    'P. Hab Moon',
    'P. Confirmed'
  ];

  coloredProperties = ['none'].concat(this.categoricalProperties.concat(this.booleanProperties));

  numericProperties = [
    'P. Min Mass (EU)',
    'P. Mass (EU)',
    // 'P. Max Mass (EU)', all empty
    'P. Radius (EU)',
    'P. Density (EU)',
    'P. Gravity (EU)',
    'P. Esc Vel (EU)',
    'P. SFlux Min (EU)',
    'P. SFlux Mean (EU)',
    'P. SFlux Max (EU)',
    'P. Teq Min (K)',
    'P. Teq Mean (K)',
    'P. Teq Max (K)',
    'P. Ts Min (K)',
    'P. Ts Mean (K)',
    'P. Ts Max (K)',
    'P. Surf Press (EU)',
    'P. Mag',
    'P. Appar Size (deg)',
    'P. Period (days)',
    'P. Sem Major Axis (AU)',
    'P. Eccentricity',
    'P. Mean Distance (AU)',
    'P. Inclination (deg)',
    'P. Omega (deg)',
    'S. Mass (SU)',
    'S. Radius (SU)',
    'S. Teff (K)',
    'S. Luminosity (SU)',
    'S. [Fe/H]',
    'S. Age (Gyrs)',
    'S. Appar Mag',
    'S. Distance (pc)',
    'S. RA (hrs)',
    'S. DEC (deg)',
    'S. Mag from Planet',
    'S. Size from Planet (deg)',
    'S. No. Planets',
    'S. No. Planets HZ',
    'S. Hab Zone Min (AU)',
    'S. Hab Zone Max (AU)',
    'P. HZD',
    'P. HZC',
    'P. HZA',
    'P. HZI',
    'P. SPH',
    // 'P. Int ESI', all 0
    // 'P. Surf ESI', all 0
    'P. ESI',
    'P. Disc. Year'
  ];

  filePath = './data/exoplanets.csv';
  data = [];
  
  componentDidMount() {
    if (this.props.storyTest) {
      return;
    }
    d3.csv(this.filePath, (error, data) => {
      if (error) {
        throw error;
      }
      this.data = this.processData(data);
      this.props.changeAxisProperties([this.numericProperties[this.numericProperties.length - 1], this.numericProperties[2]]);
    })
  }

  render() {
    if (this.props.storyTest) {
      return (
        <Page>
          <Title></Title>
          <Container>
            <ControlPanel callback={this.props.callback} data={this.props.data} options={this.props.options} axes={this.props.axes}></ControlPanel>
            <Graph storyTest={true} axes={this.props.axes} data={this.props.data}></Graph>
          </Container>
        </Page>
      )
    } else {
      return (
        <Page>
          <Title></Title>
          <Container>
            <ControlPanel callback={this.props.changeAxisProperties} data={this.data} options={this.numericProperties} axes={this.props.axes}></ControlPanel>
            <Graph axes={this.props.axes} data={this.data}></Graph>
          </Container>
        </Page>
      )
    }
  }

	processData(data) {
		const exoplanets = [];
		data.forEach((d, i) => {
			const exoplanet = {};
			for (const property of this.numericProperties) {
				exoplanet[property] = d[property] === '' ? undefined : +d[property];
				if (property === 'P. Disc. Year' && +d[property] === 0) { // removes year 0
					exoplanet[property] = undefined;
				}
			}
			for (const property of this.categoricalProperties) {
				exoplanet[property] = d[property];
			}
			for (const property of this.booleanProperties) {
				if (d[property] === '0') {
					exoplanet[property] = 'false';
				} else if (d[property] === '1') {
					exoplanet[property] = 'true';
				}
			}
			for (const property of this.uniqueProperties) {
				exoplanet[property] = d[property];
			}
			exoplanets.push(exoplanet);
		});
		return exoplanets;
  }
}

export default DataExplorer;