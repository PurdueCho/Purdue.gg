import React from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import Option from './Option.js'
import CheckboxOrRadioGroup from './CheckboxOrRadioGroup';

import {firebase_board_save, firebase_board_delete, show_snackbar} from '../../reducer/App_reducer';

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


class MyDialog4Board extends React.Component {

  // state = {
  //   // track: '',
  // };
  constructor(props) {
    super(props);
    this.handleData = this.handleData.bind(this);
    this.handleCourseSelection = this.handleCourseSelection.bind(this);

    this.state = {
      track: '',
      coursesSelections: [],
      selectedCourses: [],
    };
  }

  handleData(data) {
    this.setState({
      courses: data
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleBoardSave = () => {
    let data = {
      uid: this.props.uid,  
      brdtitle: this.brdtitle.value,
      brdcontents: this.brdcontents.value,
      track: this.track.value,
      // courses: this.courses.value,
    }
    
    if (this.props.selectedBoard.brdno) {
        data.brdno = this.props.selectedBoard.brdno
        data.brddate = this.props.selectedBoard.brddate
    }
    
    this.props.dispatch(firebase_board_save(data));
    this.props.handleDialogClose();
    this.props.dispatch(show_snackbar({ message: 'Saved your input.', snackbarOpen: true }) );
  }

  handleBoardDelete = () => {
    firebase_board_delete(this.props.selectedBoard.brdno);
    this.props.handleDialogClose();
    this.props.dispatch(show_snackbar({ message: 'Delete selected post.', snackbarOpen: true }) );
  }      

  handleDialogClose = () => {
      this.props.handleDialogClose();
  };   
  
  handleCourseSelection(e) {
    const newSelection = e.target.value;
    let newSelectionArray;
    if (this.state.selectedCourses.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.selectedCourses.filter(s => s !== newSelection)
    } else {
      newSelectionArray = [...this.state.selectedCourses, newSelection];
    }
    this.setState({
      selectedCourses: newSelectionArray
    }, () => console.log('Courses selection', this.state.selectedCourses));
  }

  render() {
    const { selectedBoard, DialogOpen, uid } = this.props;
    //console.log(selectedBoard.uid);

    return (
      <div>
        <Dialog open={DialogOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth>
            <DialogTitle id="form-dialog-title">Post</DialogTitle>
            {selectedBoard.uid===uid || !selectedBoard.uid
              ? 
              <div>            
                <DialogContent>
                  <TextField inputRef={(node) => this.brdtitle = node} defaultValue={selectedBoard.brdtitle} margin="dense" label="title" fullWidth autoFocus />
                  <FormControl required className="ff">
                    <InputLabel htmlFor="age-native-required">Track</InputLabel>
                    <Select
                      native
                      // value={this.state.track}
                      onChange={this.handleChange('track')}
                      inputRef={(node) => this.track = node} defaultValue={selectedBoard.track}
                      name="track"
                      inputProps={{
                        id: 'age-native-required',
                      }}
                    >
                      <option value="" />
                      <option value="CSE">Computational Science and Engineering</option>
                      <option value="CGV">Computer Graphics and Visualization</option>
                      <option value="DIS">Database and Information Systems</option>
                      <option value="CS">Foundations of Computer Science</option>
                      <option value="MI">Machine Intelligence</option>
                      <option value="Security">Security</option>
                      <option value="SWE">Software Engineering</option>
                    </Select>
                    <FormHelperText>Required</FormHelperText>

                  </FormControl>
                  {this.state.track?
                    <CheckboxOrRadioGroup
                      title={this.state.track}
                      setName={'courses'}
                      type={'checkbox'}
                      controlFunc={this.handleCourseSelection}
                      // options={this.state.coursesSelections}
                      selectedOptions={this.state.selectedCourses}
                      inputRef={(node) => this.courses = node} defaultValue={selectedBoard.courses}
                    />
                  :""}
                  
                  <TextField inputRef={(node) => this.brdcontents = node} defaultValue={selectedBoard.brdcontents} margin="dense" label="Contents" fullWidth multiline rowsMax="4"/>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleDialogClose} color="primary">Cancel</Button>
                  <Button onClick={this.handleBoardSave} color="primary">Save</Button>
                  {selectedBoard.brdno &&
                    <Button onClick={this.handleBoardDelete} color="primary">Delete</Button>
                  }
                </DialogActions>
              </div>
              :
              <div>            
                <DialogContent>
                  <DialogContentText>{selectedBoard.brdtitle}</DialogContentText>
                  <DialogContentText>{selectedBoard.track}</DialogContentText>
                  <DialogContentText>{selectedBoard.brdcontents}</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleDialogClose} color="primary">Close</Button>
                </DialogActions>
              </div>
            }
          </Dialog>

      </div>
    );
  }
}

let mapStateToProps = (state) => {
    return {
      uid: state.uid,
      selectedBoard: state.selectedBoard
    };
}

export default connect(mapStateToProps)(MyDialog4Board);
