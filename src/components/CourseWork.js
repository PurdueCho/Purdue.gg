import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 700,
    },
    button: {
        marginLeft: 650,
        marginTop: 30,
    }
  });

class CheckboxList extends React.Component {
  state = {
    checked: [],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    }
    );
    }

  handleClick = () => {
      console.log(this.state)
    //   const {checked} = this.state;
    //   console.log(checked)
  }

  render() {
    const { classes } = this.props;

    return (
        <div>
        <Typography variant="subtitle1" gutterBottom>
           Please select all classes you have taken
        </Typography>
      <List className={classes.root}>
        {['CS 18000','CS 18200','CS 24000','CS 25000','CS 25100','CS 25200','CS 30700','CS 31400','CS 33400','CS 34800','CS 35200','CS 35300','CS 35400','CS 35500','CS 37300','CS 38100','CS 39000 - VR','CS 39000 - WAP','CS 40700','CS 40800','CS 42200','CS 42600','CS 43400','CS 44800','CS 45600','CS 47100','CS 47300','CS 47800','CS 48300','CS 48900','CS 49000 - DSO','CS 49000 - SWS','CS 51400','CS 51500','STAT 41600','STAT 51200','MA 41600'].map(value => ( 
          <ListItem key={value} role={undefined} dense button onClick={this.handleToggle(value)}>
            <Checkbox
              checked={this.state.checked.indexOf(value) !== -1}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={`${value}`} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleClick}>
        Submit
      </Button>
      </div>
    );
  }
}

CheckboxList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(CheckboxList);