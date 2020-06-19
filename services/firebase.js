import * as firebase from 'firebase';
import 'firebase/analytics';
import { FIREBASE_CONFIG } from '../secrets';

firebase.initializeApp(FIREBASE_CONFIG);
firebase.analytics();

export const firebaseDB = firebase.database();