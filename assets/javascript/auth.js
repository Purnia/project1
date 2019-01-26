$(document).ready(function () {
    // ---------- FIREBASE ----------------
    // FIREBASE API
    var config = {
        apiKey: "AIza" + "SyA6MnePmIsN9caVZaX1GQGt1dRkh" + "-8MBTc",
        authDomain: "rps-game-148d6.firebaseapp.com",
        databaseURL: "https://rps-game-148d6.firebaseio.com",
        projectId: "rps-game-148d6",
        storageBucket: "",
        messagingSenderId: "472953467227"
    };
    firebase.initializeApp(config); // Initialize Firebase

    // ---------- FIREBASE Variables ----------------------
    var database = firebase.database(); // Create a variable to reference the database.
    var connections = database.ref("/connections"); // All of our connections will be stored in this directory.
    var isConnected = database.ref(".info/connected"); // boolean value - true if client is connected, false if not.
    var user_UID; // Global USER object for firebase.auth().onAuthStateChanged(function (user) {...}

    var userObject = firebase.auth().signInAnonymously(); // OBJECT for Anon Auth ands SIGNS IN
    console.log("Logged In as Anon. User Object: ", userObject);

    // ---------- ANONYMOUS AUTHENTICATION to get a userID -------------------
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var isAnonymous = user.isAnonymous;
            console.log("user signed in?: ", isAnonymous);
            user_UID = user.uid;
            console.log("user.uid: ", user.uid);
        } else {
            // FirebaseAuth.getInstance().signOut();
        }
    });

    // User listener - retreives user's saved preferences
    database.ref("/users").on("value", function (userSnapshot) {
        query = userSnapshot.child(user_UID).val().query;
        categoryID = userSnapshot.child(user_UID).val().query
        console.log("user ID: ", userSnapshot.child(user_UID).val());
        console.log("Last query: ", lastQuery);
        console.log("Last Category ID: ", categoryID)
    });

    // Firebase connection status
    isConnected.on("value", function (connectedSnapshot) {
        if (connectedSnapshot.val()) {
            var connList = connections.push(true); // add user to list from connections
            connList.onDisconnect().remove(); // remove user from list when disconnected
        }
    });

    // ------------ TODO ------------
    // save user's preference
    // set the user pref to Firebase


    // Event Listeners
    $(".dropdown-item").on("click", function () {
        category = $(this).attr("value");
        searchItem = $("#searchItem").val();
    });

    $("#searchItem").on("click", function (event) {
        event.preventDefault();
        searchItem = $("#searchItem").val();
    })

});