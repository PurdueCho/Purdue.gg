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
        const _data = this.props.courses;
        const _data_sort = this.props.courses.sort(compare).slice(0, 5);
        const options_column = {
            title: {
                text: "Total LOG"
            },
			data: [
                {
                    type: "column",
                    // dataPoints: this.props.courses
                    dataPoints: _data

                }
			]
        }
        const options_pie = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Top 5 Courses"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints: _data_sort
			}]
		}
        
        // setTimeout(this.execute, 2000)
        
		return (
            <div className="container">
                <div className="chart_column">
                    <CanvasJSChart options = {options_column} />
                </div>
                <div className="chart_pie">
                    <CanvasJSChart options = {options_pie} />
                </div>
                
            </div>
		);
    }
   
}

function compare(a,b) {
  if (a.y > b.y)
    return -1;
  if (a.y < b.y)
    return 1;
  return 0;
}

export default Data