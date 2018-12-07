import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {firestore, firebaseAuth} from '../reducer/Firestore';
import Data from './Data';

import Typography from '@material-ui/core/Typography';



const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    overflow: 'auto',
    maxHeight: '70vh',
  },
  ListItemSecondaryAction: {
    maxWidth: '20%'
  },
  button: {
    right: '10px'
  },
  Image: {
    width: '40px',
    height: '40px',
  },
});

const course =['CS 30700','CS 31400','CS 33400','CS 34800','CS 35200','CS 35300','CS 35400','CS 35500','CS 37300','CS 38100','CS 39000 - VR','CS 39000 - WAP','CS 40700','CS 40800','CS 42200','CS 42600','CS 43400','CS 44800','CS 45600','CS 47100','CS 47300','CS 47800','CS 48300','CS 48900','CS 49000 - DSO','CS 49000 - SWS','CS 51400','CS 51500','STAT 41600','STAT 51200','MA 41600']
let course_stats = [];

class Show extends React.Component {
    constructor () {
        super();
        course_stats = [];
    }

  state = {
    
  };  

  componentDidMount() {
    for ( var i in course ) {
        let title = course[i];
        const ref = firestore.collection('courses');
        ref.where("class", "array-contains", course[i]).get()
            .then(querySnapshot => {
                const count = querySnapshot.size
 
                course_stats.push({
                    label: title,
                    y: count,
                });
                this.setState({
                    courses: course_stats,
                })
            });
    }
    console.log(course_stats)
  }
  

  _renderStats = () => {
    const courses = this.state.courses;
    if (course_stats)
        console.log("courses: ", course_stats)
    else 
        console.log("not yet")

    return <Data courses = {courses}/>

  }

  render() {
    const { classes } = this.props; 
    if (this.state.courses) {
        console.log(this.state.courses)
        // return (
        //     <ul>
        //         {course_stats.map(d => <li key={d.title}>{d.title} - {d.value}</li>)}
        //     </ul>
        // )
        return (
            <div>
                <Typography variant="title" gutterBottom align="center">
                    PURDUE.GG
                </Typography>
                <h1>chart will be here</h1>
                {this._renderStats()}
            </div>
        )
    } else {
        return (
            <div>
                Loading
            </div>
        )
    }
  }
}

Show.propTypes = {
  classes: PropTypes.object.isRequired,
};

let mapStateToProps = (state) => {
    return {
      boards: state.boards
    };
}

export default connect(mapStateToProps)(withStyles(styles)(Show));
