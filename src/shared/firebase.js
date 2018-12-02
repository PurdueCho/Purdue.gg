// firebase auth. config info.

import * as firebase from 'firebase'
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCkMWWusY-ucS-KLCbt5kewZfNoqCWWTtM",
    authDomain: "purduehub.firebaseapp.com",
    databaseURL: "https://purduehub.firebaseio.com",
    projectId: "purduehub",
    storageBucket: "purduehub.appspot.com",
    messagingSenderId: "553412637306",
}



if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

// Redux - firestore
var firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log('This is the user: ', user)
    } else {
        // No user is signed in.
        console.log('There is no logged in user');
    }
});

const db = firebase.database();
const auth = firebase.auth();

const forumDB = firebase.database().ref('forum/');
const storageFR = firebase.storage();


export {
    db,
    auth,
    firebase,
    forumDB,
    storageFR,
    firestore,
};
