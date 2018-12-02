import React, { Component } from 'react';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const track_Course = {
  CSE: {
    title: "Computational Science and Engineering Track",
    req: ["CS31400"],
    elec: ["CS30700", "CS33400", "CS35200", "CS35400", "CS38100", "CS43400", "CS34800", "CS44800",
    "CS45600", "CS47100", "CS48300", "CS49000", "CS49700", "CS51400", "CS51500"],
  },
  CGV: {
    title: "Computer Graphics and Visualization Track",
    req: ["CS33400", "CS31400", "CS38100"],
    elec: ["CS31400", "CS35200", "CS35400", "CS38100", "CS42200", "CS43400", "CS44800", "CS47100", "CS49000"],
  },
  DIS: {
    title: "Database and Information Systems Track",
    req: ["CS34800", "CS38100", "CS44800", "CS37300", "CS47300"],
    elec: ["CS35200", "CS35400", "CS35500", "CS42600", "CS42200", "CS47100", "CS47800", "CS49700"],
  },
  CS: {
    title: "Foundations of Computer Science Track",
    req: ["CS35200", "CS38100"],
    elec: ["CS31400", "CS33400", "CS35500", "CS44800", "CS45600", "CS47100", "CS48300"],
  },
  MI: {
    title: "Machine Intelligence Track",
    req: ["CS37300", "CS38100", "CS47100", "CS47300", "STAT41600", "MA41600", "STAT51200"],
    elec: ["CS34800", "CS35200", "CS44800", "CS45600", "CS48300"],
  },
  Security: {
    title: "Security Track",
    req: ["CS35400", "CS35500", "CS42600"],
    elec: ["CS30700", "CS34800", "CS35200", "CS35300", "CS37300", "CS38100", "CS40800", "CS42200", "CS44800", "CS45600", "CS48900", "CS49000-DS0", "CS49000-SWS"],
  },
  SWE: {
    title: "Software Engineering Track",
    req: ["CS30700", "CS35200", "CS35400", "CS40800", "CS40700"],
    elec: ["CS34800", "CS35300", "CS37300", "CS38100", "CS42200", "CS42600", "CS44800", "CS45600", "CS47300",
     "CS49000-DSO", "CS48900", "CS39000-VRA", "CS39000-WAP", "CS49000-SWS"],
  },
}

class Option extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.state = {
      inputField: ''
    };
  }
  
  submitHandler(evt) {
    evt.preventDefault();
    // pass the input field value to the event handler passed
    // as a prop by the parent (App)
    this.props.handlerFromParant(this.state.inputField);
    
    this.setState({
      inputField: ''
    });
  }
  
  handleChange(event) {
    this.setState({
      inputField: event.target.value
    });
  }

  render() {
    return (
      <div>

          
        {/* <form onSubmit={this.submitHandler}>
          <input type="text" 
                 id="theInput" 
                 value={this.state.inputField} 
                 onChange={this.handleChange} />
          <input type="submit" />
        </form>
        <h5>track: {track_Course[this.props.track].title}</h5>
        <h5>Visible in child:<br />{this.state.inputField}</h5> */}
      </div>
    );
  }
}

export default Option;
