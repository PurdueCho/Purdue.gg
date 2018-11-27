import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCRDkLkb1QWeKMiAgmM_Ss9bPIaz9ft5Y8",
    authDomain: "test-1e789.firebaseapp.com",
    databaseURL: "https://test-1e789.firebaseio.com",
    projectId: "test-1e789",
    storageBucket: "test-1e789.appspot.com",
    messagingSenderId: "299030586992"
};

firebase.initializeApp(config);
var fs = firebase.firestore();

const settings = {timestampsInSnapshots: true};
fs.settings(settings);

export const firestore = fs;
export const firebaseAuth = firebase.auth();
export const storage = firebase.storage().ref();
