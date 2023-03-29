import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DropdownHeader from '../components/Atoms/DropdownHeader';
import Dropdown from '../components/Atoms/Dropdown';
import Histogram from '../components/Atoms/Histogram';
import DropdownControl from '../components/Molecules/DropdownControl';
import ControlPanel from '../components/Organisms/ControlPanel';
import ScatterplotTitle from '../components/Atoms/ScatterplotTitle';
import Scatterplot from '../components/Atoms/Scatterplot';
import Graph from '../components/Molecules/Graph';
import Title from '../components/Atoms/Title';
import DataExplorer from '../components/Templates/DataExplorer';

const data = [
  {
    'P. Min Mass (EU)': undefined,
    'P. Mass (EU)': 4451.16,
    'P. Radius (EU)': 19.04,
    'P. Density (EU)': 0.64,
    'P. Gravity (EU)': 12.28
  },
  {
    'P. Min Mass (EU)': 6358.8,
    'P. Mass (EU)': 6358.8,
    'P. Radius (EU)': 10.94,
    'P. Density (EU)': 4.86,
    'P. Gravity (EU)': 53.12
  },
  {
    'P. Min Mass (EU)': 4133.22,
    'P. Mass (EU)': 4133.22,
    'P. Radius (EU)': 11.4,
    'P. Density (EU)': 2.79,
    'P. Gravity (EU)': 31.79
  },
  {
    'P. Min Mass (EU)': undefined,
    'P. Mass (EU)': 6358.8,
    'P. Radius (EU)': 11.2,
    'P. Density (EU)': 4.53,
    'P. Gravity (EU)': 50.69
  },
  {
    'P. Min Mass (EU)': undefined,
    'P. Mass (EU)': 4419.37,
    'P. Radius (EU)': 16.13,
    'P. Density (EU)': 1.05,
    'P. Gravity (EU)': 16.99
  },
  {
    'P. Min Mass (EU)': 2384.55,
    'P. Mass (EU)': 2384.55,
    'P. Radius (EU)': 11.66,
    'P. Density (EU)': 1.5,
    'P. Gravity (EU)': 17.53
  },
  {
    'P. Min Mass (EU)': undefined,
    'P. Mass (EU)': 9538.2,
    'P. Radius (EU)': 10.86,
    'P. Density (EU)': 7.44,
    'P. Gravity (EU)': 80.81
  },
  {
    'P. Min Mass (EU)': 1271.76,
    'P. Mass (EU)': 1271.76,
    'P. Radius (EU)': 11.66,
    'P. Density (EU)': 0.8,
    'P. Gravity (EU)': 9.36
  },
  {
    'P. Min Mass (EU)': 604.09,
    'P. Mass (EU)': 604.09,
    'P. Radius (EU)': 11.21,
    'P. Density (EU)': 0.43,
    'P. Gravity (EU)': 4.81
  },
  {
    'P. Min Mass (EU)': undefined,
    'P. Mass (EU)': 6358.8,
    'P. Radius (EU)': 10.3,
    'P. Density (EU)': 5.81,
    'P. Gravity (EU)': 59.89
  },
  {
    'P. Min Mass (EU)': undefined,
    'P. Mass (EU)': 9538.2,
    'P. Radius (EU)': 14.56,
    'P. Density (EU)': 3.09,
    'P. Gravity (EU)': 44.99
  },
  {
    'P. Min Mass (EU)': 3974.25,
    'P. Mass (EU)': 3974.25,
    'P. Radius (EU)': 11.43,
    'P. Density (EU)': 2.66,
    'P. Gravity (EU)': 30.4
  }
];
const options = ['P. Min Mass (EU)', 'P. Mass (EU)', 'P. Radius (EU)', 'P. Density (EU)', 'P. Gravity (EU)'];
const selectedOption = options[1];
const axes = [selectedOption, options[0]];
const axis = 'x';
const callback = () => { console.log('changing dropdown option') };

storiesOf('DropdownHeader', module)
.add('default', () => (
  <DropdownHeader axis={axis}></DropdownHeader>
));

storiesOf('Dropdown', module)
  .add('default', () => (
    <Dropdown callback={callback} options={options} selectedOption={selectedOption} axes={axes} axis={axis}></Dropdown>
  ));

storiesOf('Histogram', module)
  .add('default', () => (
    <Histogram data={data} property={selectedOption} axis='x'></Histogram>
  ));

storiesOf('DropdownControl', module)
  .add('default', () => (
    <DropdownControl callback={callback} data={data} options={options} selectedOption={axes[0]} axes={axes} axis='x'></DropdownControl>
  ));

storiesOf('ControlPanel', module)
  .add('default', () => (
    <ControlPanel callback={callback} data={data} options={options} axes={axes}></ControlPanel>
  ));

storiesOf('ScatterplotTitle', module)
  .add('default', () => (
    <ScatterplotTitle axes={axes}></ScatterplotTitle>
  ));

storiesOf('Scatterplot', module)
  .add('default', () => (
    <Scatterplot storyTest={true} data={data} xProperty={axes[0]} yProperty={axes[1]}></Scatterplot>
  ));

storiesOf('Graph', module)
  .add('default', () => (
    <Graph storyTest={true} axes={axes} data={data}></Graph>
  ));

storiesOf('Title', module)
  .add('default', () => (
    <Title></Title>
  ));

storiesOf('DataExplorer', module)
  .add('default', () => (
    <DataExplorer storyTest={true} callback={callback} data={data} options={options} axes={axes}></DataExplorer>
  ));