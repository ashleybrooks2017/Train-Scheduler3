

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC6N9tok0Cvw66vLFifIx0XR0qIgSrzs-w",
    authDomain: "train-scheduler-196e2.firebaseapp.com",
    databaseURL: "https://train-scheduler-196e2.firebaseio.com",
    projectId: "train-scheduler-196e2",
    storageBucket: "train-scheduler-196e2.appspot.com",
    messagingSenderId: "780000227764"
  };

  firebase.initializeApp(config);

  const trainData = firebase.database();

// adding Train Schedule
  $('#addTrain-btn').on('click', function(event) {
  	event.preventDefault();

  	// Grabs train input
  	let trainName = $('#trainName-input').val().trim();
  	let destination = $('#destination-input').val().trim();
  	let startTime = moment($('#startTime-input').val().trim(), "HH:mm").format();
	let frequency = $('#frequency-input').val();

// Creates local "temporary" object for holding train data
	let newTrain = {
		name: trainName,
		destination: destination,
		startTime: startTime,
		frequency: frequency
	};
// Upload train data to the database
	trainData.ref().push(newTrain);


	//console.log(newTrain.name);
	//console.log(newTrain.destination);
	//console.log(newTrain.startTime);
	//console.log(newTrain.frequency);

	alert('The train has been added to the schedule.');

	//clears all of the text-boxes

	$('#trainName-input').val("");
	$('#destination-input').val("");
	$('#startTime-input').val("");
	$('#frequency-input').val("");

});

  

  trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {
  			console.log(childSnapshot.val());

  			// Store everything into a variable
			let trainName = childSnapshot.val().name; 
			let destination = childSnapshot.val().destination; 
			let frequency = childSnapshot.val().frequency; 
			let startTime = childSnapshot.val().startTime; 
			console.log(startTime);

		
			
			let startTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");
			
			// Difference between the times
			let diffTime = moment().diff(moment(startTimeConverted), "minutes");

			// Time apart (remainder)
			let tRemainder = diffTime % frequency;

			// Minuetes untill next train arrive
			let minAway = frequency - tRemainder;

			// Next Train arrival
        	//let nextArrival = moment().add(minAway, "minutes").format("HH:mm");
        	let nextArrival = moment().add(minAway, "minutes").format('hh:mm A');

			//console.log('Start Time: ', startTime);
			//console.log('Remainder: ', tRemainder);
			//console.log('Minutes: ', minAway);

			$('#schedule').append(`<tr><td>${trainName}</td><td>${destination}</td><td>${frequency}</td><td>${nextArrival}</td><td>${minAway}</td>`)
		})



// Clock showing on the right side of schedule 
	function currentTime() {
		var sec = 1;	
		time = moment().format('HH:mm:ss');
		searchTime = moment().format('HH:mm');
			$('#currentTime').html(time);

			t = setTimeout(function() {
				currentTime();
			}, sec * 1000);	
	}
	currentTime(); 

// Click '+' to Open Add Train and "x" to Close window

		$('#add').click(function(){
		if($('#newTrainSchedule').attr('data-status') === 'hide') {
			$('#newTrainSchedule').attr('data-status', 'show').css({'visibility': 'visible', 'height': '480px'});
			$('#symbol').removeClass('fa fa-plus').addClass('fa fa-close');
		} else {
			$('#newTrainSchedule').attr('data-status', 'hide').css({'visibility': 'hidden', 'height': '0px'});
			$('#symbol').removeClass('fa fa-close').addClass('fa fa-plus');
		}
	});



