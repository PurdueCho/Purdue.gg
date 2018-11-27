import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth, db } from '../shared';
import TextField from '@material-ui/core/TextField';
import * as routes from '../constants/routes';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {firebase} from '../shared/firebase'
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';





const EventPage = ({ history }) =>
  <div>
    <h1>NEW EVENT</h1>
    <CreateEvent history={history} />
  </div>

  const INITIAL_STATE = {
      title: '',
      date: '',
      context: '',
  };

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

onSubmit = (event) => {
    const {
        title,
        context,
        date,
    } = this.state;

    const {
        history,
    } = this.props;

  //  auth.doCreateNewEvent(title, context)
  //    .then(authUser => {

        // Create an event in your own accessible Firebase Database too
         db.doCreateEvent(title,date,context)
           .then(() => {
             this.setState({ ...INITIAL_STATE });
             history.push(routes.CALENDAR);
           });
 //    })

    event.preventDefault();
}

  render() {
    const {
        title,
        context,
        date,
    } = this.state;

    const isInvalid =
        title=== '' ||
        context === '' ||
        date === '';
    return (
        <form onSubmit={this.onSubmit}>
        
          <Grid>
          <TextField
          value={title}
          onChange={event => this.setState(byPropKey('title', event.target.value))}
          type="text"
          label="Title"
          style={{ margin: 8 }}
          />
          <TextField
          value={date}
          onChange={event => this.setState(byPropKey('date', event.target.value))}
          type="text"
          style={{ margin: 8 }}
          label="Date (MM-DD-YYYY)"
          />
          </Grid>
          <Grid>
          <TextField
          id="outlined-full-width"
          label="Context"
          style={{ margin: 8 }}
          multiline
          fullWidth
          rows="4"
          value={context}
          onChange={event => this.setState(byPropKey('context', event.target.value))}
          type="text"
          margin="normal"
          variant="outlined"
          />
          </Grid>
          <Grid>
        <Button color="primary" variant="contained" disabled={isInvalid} type="submit">
          SUBMIT
        </Button>
        
        </Grid>



        </form>
    );
  }
}

const EventLink = () =>

  <Button variant="contained" color="primary" component={Link} to = {routes.CREATENEWEVENT}>
     Add New Event
  </Button>



  
export default withRouter(EventPage);

export {
  CreateEvent,
  EventLink,
};