import React from 'react';
import PropTpyes from 'prop-types';

var CanvasJSReact = require('../assets/canvasjs-2.2/canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Data extends React.Component {
    constructor() {
        super();
 
    }
    
    render () {
        console.log(this.props.courses)
        const options = {
			data: [
			{
                type: "column",
                dataPoints: this.props.courses
			}
			]
		}
		
		return (
            <div>
                <CanvasJSChart options = {options} 
                />
            </div>
		);
    }
   
}

export default Data