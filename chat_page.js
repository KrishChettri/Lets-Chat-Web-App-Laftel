var firebaseConfig = {
    apiKey: "AIzaSyBKqhOYgBwnuTUNBSF0uZMLA2Lf6ljyQEc",
    authDomain: "lets-chat-web-app-eff89.firebaseapp.com",
    databaseURL: "https://lets-chat-web-app-eff89-default-rtdb.firebaseio.com",
    projectId: "lets-chat-web-app-eff89",
    storageBucket: "lets-chat-web-app-eff89.appspot.com",
    messagingSenderId: "270594270833",
    appId: "1:270594270833:web:51b096699507fdda4f5dd0"
  };
 firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");


function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;;

//Start code
console.log(firebase_message_id);
         console.log(message_data);
         name1 = message_data['name'];
         message = message_data['message'];
         like = message_data['like'];
         name_with_tag = "<h4>"+name1+"<img class='user_tick' src='tick.png'> </h4>";
         message_with_tag = "<h4 class='message_h4'>"+ message + "</h4>";
         like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
         span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like:"+ like + "</span></button><hr>";

         row = name_with_tag + message_with_tag + like_button + span_with_tag;
         document.getElementById("output").innerHTML += row;
//End code
 } });  }); }
 getData();

 function updateLike(button_id){
    console.log("clicked on the like botton -" +button_id);
    likes = document.getElementById(button_id).value;
    update_likes = Number(likes) +1;
    console.log(update_likes);

    firebase.database().ref(room_name).child(button_id).update({
        like: update_likes
    });
}

 function send(){
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
 }

function logout(){
    localStorage.removeItem("user_nae");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}