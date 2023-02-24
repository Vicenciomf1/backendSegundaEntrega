import { getFirestore } from 'firebase-admin/firestore'
import firebaseApp from "../../config/firebase.js";

const firestoreDB = getFirestore(firebaseApp);

export default firestoreDB;