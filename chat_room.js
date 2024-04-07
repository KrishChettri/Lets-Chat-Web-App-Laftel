var firebaseConfig = {
    apiKey: "AIzaSyBKqhOYgBwnuTUNBSF0uZMLA2Lf6ljyQEc",
    authDomain: "lets-chat-web-app-eff89.firebaseapp.com",
    databaseURL: "https://lets-chat-web-app-eff89-default-rtdb.firebaseio.com",
    projectId: "lets-chat-web-app-eff89",
    storageBucket: "lets-chat-web-app-eff89.appspot.com",
    messagingSenderId: "270594270833",
    appId: "1:270594270833:web:51b096699507fdda4f5dd0"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

 var user_name = localStorage.getItem("username");

 function getData(){
    firebase.database().ref("/").on('value',
    function(snapshot) {document.getElementById("output").innerHTML = 
   "";snapshot.forEach(function(childSnapshot) {childKey = 
   childSnapshot.key;
   Room_names = childKey;
   //Start code
   console.log("Room_names - " + Room_names);
   row = "<div class='room_name' id="+Room_names+ " onclick= 'redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
   document.getElementById("output").innerHTML += row;
   //End code
   });});}
   getData();
   

function addRoom(){
   room_name = document.getElementById("room_name").value;

   firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
});
localStorage.setItem("room_name", room_name);

window.location = "chat_page.html";
}

function redirectToRoomName(name){
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "chat_page.html";
}

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html"
}