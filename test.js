let firebase = require('firebase');

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAbzXf6X3EzzNv7-TAg3WZYa67dTRWtR0A",
  authDomain: "imbizo-215.firebaseapp.com",
  databaseURL: "https://imbizo-215.firebaseio.com",
  projectId: "imbizo-215",
  storageBucket: "imbizo-215.appspot.com",
  messagingSenderId: "1059606537910"
});


return firebaseApp.database().ref('teamcom/guards').equalTo("Guard").on("child_added", function (snapshot) {

          snapshot.forEach(doc => {
            emp = doc.data().empID;
            console.log(emp);
          })
        })
