const firebaseConfig = {
    apiKey: "AIzaSyBS5ysHW3Vf2g-ejftGvct6n6DQOZopI5A",
    authDomain: "catch-it-ecfdd.firebaseapp.com",
    databaseURL: "https://catch-it-ecfdd-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "catch-it-ecfdd",
    storageBucket: "catch-it-ecfdd.appspot.com",
    messagingSenderId: "11008361574",
    appId: "1:11008361574:web:804ff32ad52ce1e5f319a7",
};

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        let isAnonymous = user.isAnonymous;
        let uid = user.uid;

    } else {}
});

firebase
    .auth()
    .signInAnonymously()
    .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
    });

const DATABASE = firebase.database();

// READ
DATABASE.ref("/").once("value", (snapshot) => {
    let obj = snapshot.val()
    console.log(snapshot)
    console.log('once', obj)
});

DATABASE.ref("player-1/position").on("value", (snapshot) => {
    let obj = snapshot.val()
    console.log('position', obj)
});

DATABASE.ref('messages/sendBall').on('value', (snapshot) => {
    const data = snapshot.val();
    if (initialized && data.id != id) {
        const b = new Ball(-50, 200, data.speed, data.radius);
        b.acceleration = createVector(data.accX, data.accY);
        BALLS.push(b)
    }
    /*     createBall(-50, 200, 3); */

})

DATABASE.ref('score').on('value', (snapshot) => {
    const data = snapshot.val();
    console.log("data")
    try {
        document.getElementsByClassName("score")[0].innerText = data.score;
    } catch {
        window.addEventListener("load", () => {
            document.getElementsByClassName("score")[0].innerText = data.score;
        })
    }
})

// WRITE

// SEND_MESSAGE('emitter/balls', balls); // balls=array de Balls
function SEND_MESSAGE(_type, _data) {
    DATABASE.ref(_type).set(_data);
}