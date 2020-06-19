import * as firebase from 'firebase';
import { FIREBASE_CONFIG } from '../secrets';

firebase.initializeApp(FIREBASE_CONFIG);

export const firebaseDB = firebase.database();