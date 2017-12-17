  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBBJdWpBAUx-z1Wv1FaHmyVvEPuG5lB4hE",
    authDomain: "fir-211a4.firebaseapp.com",
    databaseURL: "https://fir-211a4.firebaseio.com",
    projectId: "fir-211a4",
    storageBucket: "fir-211a4.appspot.com",
    messagingSenderId: "1076746239285"
  };
  firebase.initializeApp(config);

let database = firebase.database();

let trainName = "";
let destination = "";
let frequency = "";
let nextArrival = "";

// $('#clock').fitText(1.3);

function update() {
  $('#currentTime').html(moment().format(' H:mm:ss'));
};

setInterval(update, 1000);

// $("#currentTime").text(moment().format("hh:mm:ss"));

$("#submitBtn").on("click", function() {
    // Don't refresh the page!
    event.preventDefault();

    trainName = $('#trainName').val().trim();
    destination = $('#destination').val().trim();
    frequency = $('#frequency').val().trim();
    nextArrival = $('#nextArrival').val().trim();

    let trainInfo={
        trainName :trainName,
        destination : destination,
        frequency : frequency,
        nextArrival :nextArrival
    };

     // Uploads employee data to the database
    database.ref().push(trainInfo);

    $('#trainName').val('');
    $('#destination').val('');
    $('#frequency').val('');
    $('#nextArrival').val('');
});


database.ref().on('child_added', function(childSnapshot, prevChildName) {
    // do something with the child
    let trainName = childSnapshot.val().trainName;
    let destination = childSnapshot.val().destination;
    let frequency = childSnapshot.val().frequency;
    let nextArrival = childSnapshot.val().nextArrival;
    // let minAway = moment().diff(nextArrival, 'minutes');
    
    let firstTimeConverted = moment(nextArrival, "hh:mm").subtract(1, "years");
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    let trainRemainder = diffTime % frequency;
    let minAway = frequency - trainRemainder;
    let arrival = moment().add(minAway, "minutes");
    let arrivalFormat = moment(arrival).format("hh:mm");
   
    
    $("#rowSpace").append(`<tr><td> ${trainName} </td>
                        <td> ${destination} </td>
                        <td> ${frequency} </td>
                        <td> ${nextArrival} </td>
                        <td> ${minAway} </td>
                       </tr>`);
  
    
  });