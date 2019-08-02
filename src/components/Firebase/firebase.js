import app from 'firebase/app';
import config from './firebaseConfig';
import 'firebase/auth';
import 'firebase/database';

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  doDeleteUser = () => {
    const uid = this.getUserID();
    this.db.ref(`users/${uid}`).remove();
    this.db.ref(`day_collections/${uid}`).remove();
    this.auth.currentUser.delete();
  };

  user = uid => this.db.ref(`users/${uid}`);

  getUserID = () => this.auth.currentUser.uid;

  addDay = (mood, q1, q2, q3) => {
    const uid = this.getUserID();
    const curDay = new Date();
    const date = `${curDay.getFullYear()}-${curDay.getMonth() + 1}-${curDay.getDate()}`;
    this.db.ref(`day_collections/${uid}/${date}`).set({
      mood: mood,
      question1: q1,
      question2: q2,
      question3: q3
    });
  };
}

export default Firebase;
