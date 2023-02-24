import { initializeApp, applicationDefault } from 'firebase-admin/app'
// import serviceAccount from './adminSDKAccount.json' assert { type: "json" };  // Poco seguro

const firebaseApp = initializeApp( { credential: applicationDefault() } );  // La credencial debe estar almacenada en un lugar seguro, y en una variable de entorno su ubicación

export default firebaseApp;