import * as firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/storage'
import config from './firebase-config'


const app = firebase.initializeApp(config, 'acfApp');

const firestore = app.firestore();

const storageObject = app.storage();

storageObject.setMaxUploadRetryTime(15000);

const storage = storageObject.ref();


firestore.settings({timestampsInSnapshots: true});
firestore.enablePersistence({experimentalTabSynchronization:true});

export {firestore, storage, firebase};