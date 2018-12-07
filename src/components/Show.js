import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {firestore, firebaseAuth} from '../reducer/Firestore';
import Data from './Data';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  chart: {
    overflow: 'auto',
    maxHeight: '70vh',
  },
});

const course =['CS 30700','CS 31400','CS 33400','CS 34800','CS 35200','CS 35300','CS 35400','CS 35500','CS 37300','CS 38100','CS 39000 - VR','CS 39000 - WAP','CS 40700','CS 40800','CS 42200','CS 42600','CS 43400','CS 44800','CS 45600','CS 47100','CS 47300','CS 47800','CS 48300','CS 48900','CS 49000 - DSO','CS 49000 - SWS','CS 51400','CS 51500','STAT 41600','STAT 51200','MA 41600']
// let course_stats = [];

class Show extends React.Component {
    constructor () {
        super();
        // course_stats = [];
    }

  state = {
    
  };  

  _getStats = async () => {
      const courses = await this._callApi()
      this.setState({
          courses
      })
    console.log(course)
  }

  _callApi = () => {
    let course_stats = [];
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
            });
        }
    return course_stats;
    
  }
  
  componentDidMount() {
      let course_stats = [];
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
    // this._getStats();
  }
  

  _renderStats = () => {
    const courses = this.state.courses;
    if (courses)
        console.log("courses: ", courses)
    else 
        console.log("not yet")
    return <Data courses = {courses}/>

  }

  render() {
    const { classes } = this.props; 
    const {courses} = this.state
    return (
      <div className={classes.root} >
        <Typography variant="title" gutterBottom align="center">
            PURDUE.GG
        </Typography>
        <div className={classes.chart}>
             { this.state.courses ? this._renderStats() : 'Loading' }
        </div>
      </div>
    );
   
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
