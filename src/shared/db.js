import { db } from './firebase';

// User API

export const onceGetPosts = () =>
  db.ref('forum').once('value');

export const doAddPost = (title) =>
  db.ref(`forum/Free/${title}`).set({
    title,
  });

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const doCreateEvent = (title,date,context) =>
   db.ref(`event/${date}/`).push({title,date,context});

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const onceGetAccount = () =>
  db.ref('account').once('value');

  export const onceGetEvents = () =>
  db.ref('event').once('value');  

  export const onceGetForums = () =>
  db.ref('forum').once('value');  

// Other Entity APIs ...