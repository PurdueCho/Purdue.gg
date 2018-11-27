import React, { Component } from 'react';

import {firebase} from '../shared/firebase'
import Calendar from 'react-calendar';
import '../assets/Home.css'
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { db } from '../shared';
import * as routes from '../constants/routes';
import logo from '../assets/logo.png';  
import purdue from '../assets/purdue.png'
import {Table} from 'evergreen-ui'
import {EventLink} from '../components/Event';
import ReactDOM from 'react-dom'
import { Button } from 'evergreen-ui'
import NoImg from '../assets/NoImg.PNG'


const EventList = ({ eventlist }) => 
  <Table>
    <Table.Head>
    <Table.TextHeaderCell flexBasis={400} flexShrink={0} flexGrow={0}>
      TITLE
     </Table.TextHeaderCell>
     <Table.TextHeaderCell>
      DATE
     </Table.TextHeaderCell>
    </Table.Head>
  <Table.Body height={240} >
  {Object.keys(eventlist).map(key => 
     <div key={key}>
      {Object.keys(eventlist[key]).map(event =>
        <Table.Row event={event}>
        <Table.TextCell flexBasis={400} flexShrink={0} flexGrow={0}>
          <Link to={{pathname: routes.EVENTCONTEXT, state: { title: eventlist[key][event].title, date: eventlist[key][event].date,context: eventlist[key][event].context} }}>
          <Typography variant="button" gutterBottom>
          {eventlist[key][event].title}
         </Typography>
          </Link>
        </Table.TextCell>
        <Table.TextCell>
        <Typography variant="overline" gutterBottom>
          {eventlist[key][event].date}
         </Typography>
        </Table.TextCell>
        </Table.Row>
      )}
      </div>
  )}
  </Table.Body>
  </Table>


const ForumList = ({ forumlist }) => 

  <Table>
    <Table.Head>
    <Table.TextHeaderCell flexBasis={400} flexShrink={0} flexGrow={0}>
      Discussion
     </Table.TextHeaderCell>
     <Table.TextHeaderCell>
      UserName
     </Table.TextHeaderCell>
    </Table.Head>
  <Table.Body height={240} >
  {Object.keys(forumlist).map(key => 
     <div key={key}>
      {Object.keys(forumlist[key]).map(forum =>
        <Table.Row forum={forum}>
        <Table.TextCell flexBasis={400} flexShrink={0} flexGrow={0}>  
        <Typography variant="overline" gutterBottom>
          {forumlist[key][forum].newPostBody}
         </Typography>
        </Table.TextCell>
        <Table.TextCell>
        <Typography variant="overline" gutterBottom>
          {forumlist[key][forum].username}
         </Typography>
        </Table.TextCell>
        </Table.Row>
      )}
      </div>
  )}
  </Table.Body>
  </Table>



const UserEvent = ({ event }) => 

  <Table>
    <Table.Head>
    <Table.TextHeaderCell flexBasis={400} flexShrink={0} flexGrow={0}>
      My events
     </Table.TextHeaderCell>
    </Table.Head>
  <Table.Body height={240} >
  {Object.keys(event).map(key => 
     <div key={key}>
      {Object.keys(event[key]).map(forum =>
        <Table.Row forum={forum}>
        <Table.TextCell flexBasis={400} flexShrink={0} flexGrow={0}>  
        <Typography variant="overline" gutterBottom>
          {event[key][forum].title} on {event[key][forum].date}
         </Typography>
        </Table.TextCell>
        </Table.Row>
      )}
      </div>
  )}
  </Table.Body>
  </Table>


var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      email: '',
      gradeLevel: '',
      phoneNumber: '',
      address: '',
      status: '',
      event: null,
      imageUrl: '',
      currentTime: '',
      date: new Date(),
      events: [] ,
      forums: [] ,
      eventlist: '',
      forumlist: '',
      tmp: '',
    };
  }

  onChange = date => this.setState({ date })
 
  componentDidMount () {

    db.onceGetEvents().then(snapshot =>
      this.setState({ eventlist: snapshot.val() })
    );

    this.getForumSnap();
    this.getUserName();
    this.getImage();
    this.getEvents();
    this.getTopEvents();
    this.getForums();

    setInterval(function(){
      this.setState({
        currentTime: new Date().toLocaleString()
      })
  }.bind(this), 1000);
  }

  _getProfile = async () => {
    const profile = await this.getUserName();
  }

  getForumSnap = () =>{
    let _this = this;
    let postRef = firebase.database().ref('forum');  
    postRef.on('value', function(snapshot) {
    
      _this.setState({
        forumlist: snapshot.val(),
      });
    });

  }

  getUserName = () => {

    let currentUser = firebase.auth().currentUser.email;
    let postRef = firebase.database().ref('account');
    let _this = this;

    postRef.on('value', function(snapshot) {

      let keys = Object.keys(snapshot.val());

       for (let i = 0; i < keys.length; i++) {
         let key = keys[i];
         let ref = 'account/' + key;
         let postRef = firebase.database().ref(ref);
          postRef.on('value', function (snapshot) {
            if(currentUser == snapshot.val().email){
              
            _this.setState({
              userName: snapshot.val().username,
              email: snapshot.val().email,
              gradeLevel: snapshot.val().gradeLevel,
              phoneNumber: snapshot.val().phoneNumber,
              address: snapshot.val().address,
              status: snapshot.val().status,
            
            });
            let path  = ref+'/events';
            let pref = firebase.database().ref(path);
            pref.on('value',function(snapshot){
                _this.setState({
                  event: snapshot.val(),
                });
               
            })
          }
          })
       }
    });
    

    console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', this.state.event)
  }

  getImage = (image) => {
    let currentUser = firebase.auth().currentUser.email;
    firebase.storage().ref('images/' + currentUser).getDownloadURL().then((url) => {
      this.state[image] = url
      this.setState({
        imageUrl: url,
      });
    })
  }

  getEvents = () =>{

    let postRef = firebase.database().ref('event/');
    postRef.on('value', function(snapshot) {

      let keys = Object.keys(snapshot.val());

       for (let i = 0; i < keys.length; i++) {
         let key = keys[i];
         let ref = 'event/' + key;
         let postRef = firebase.database().ref(ref);
          postRef.on('value', function (snapshot) {
          
            let keys1 = Object.keys(snapshot.val());
            for (let j = 0; j < keys1.length; j++) {

              let keyIs = keys1[j];
              console.log('event is', snapshot.val()[keyIs].context);
            }
          });
        }
      });
  }


  getTopEvents = () => {

    let _this = this;
    let postRef = firebase.database().ref('event/');
    let store = [];
    postRef.on('value', function(snapshot) {

      let keys = Object.keys(snapshot.val());

       for (let i = 0; i < keys.length; i++) {
         let key = keys[i];
         let ref = 'event/' + key;
         let postRef = firebase.database().ref(ref);
          postRef.on('value', function (snapshot) {
          
            let keys1 = Object.keys(snapshot.val());
            for (let j = 0; j < keys1.length; j++) {

              let keyIs = keys1[j];
              console.log('event is', snapshot.val()[keyIs].context);
              
              store.push(snapshot.val()[keyIs].context);
              console.log('user ' , store)
            }
          });
        }
      });
      console.log('user end ' , store)

      _this.setState({
        events: store,
      });
  }

  getForums = () =>{
  
    let _this = this;
    let postRef = firebase.database().ref('forum/');
    let store = [];
    postRef.on('value', function(snapshot) {

      let keys = Object.keys(snapshot.val());
      
      console.log('forum key', keys );

       for (let i = 0; i < keys.length; i++) {
         let key = keys[i];
         let ref = 'forum/' + key;
         let postRef = firebase.database().ref(ref);
          postRef.on('value', function (snapshot) {
          
            let keys1 = Object.keys(snapshot.val());
            for (let j = 0; j < keys1.length; j++) {

              let keyIs = keys1[j];
              console.log('forum', snapshot.val()[keyIs].newPostBody);
              
              store.push(snapshot.val()[keyIs].newPostBody);
              console.log('forumforumforum ' , store)
            }
          });
        }
      });
      _this.setState({
        forums: store,
      });
  }
 


  render() {

    const dateToFormat = '1976-04-19T12:59-0500';
    const { eventlist, forumlist , event} = this.state;
    return (
        
        <div className={"container"}>
        {this.state.getUserName ? this.getUserName() : ''}

      <Paper className="leftBox">
      <Grid container spacing={16}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={16}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">

                {this.state.event ?  <div className="lists">
                <h1 className="text">{this.state.userName}'s Events</h1>
                <Grid className={"userEvent"}>
                {event && <UserEvent event={event}/> }
                </Grid>  
                </div> :null}
                
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
   
      
     <Paper className="centerBox">
      <Grid container spacing={16}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={16}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">

                <div className="lists">
                <h1 className="text">Event List</h1>
                <Grid className={"eventList"}>
                {eventlist && <EventList eventlist={eventlist} /> }
                </Grid>  
                </div> 
                
                <div className="lists">
                <h1 className="text">Forum List</h1>
                <Grid className={"forumList"}>
                {forumlist && <ForumList forumlist={forumlist} /> }
                </Grid>
                </div>

              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>

     

    <Paper className="rightBox">
      <Grid container spacing={16}>
        <Grid item>
          
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={16}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">

              <div className="userName">
                Welcome to PurdueHub {this.state.userName}!
              </div>
              <div className="imgCenter">
              <img style={{flex: 1,
                width: 300,
                height: 300,
                resizeMode: 'contain',

                }} src={this.state.imageUrl || NoImg} alt="Uploaded images"/>
         
              </div>
              <div className="calCenter">
                <Calendar
                  className={"homeCalander"}
                  onChange={this.onChange}
                  value={this.state.date}
                />
              </div>

            

        <div className={"homeTime"}>
        {this.state.currentTime}
        </div>




              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>

                
      </div>  
      
    );
  }
}

export default HomePage;