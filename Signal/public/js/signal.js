// Signal.js: The main event driver for the puzzle

// Start the ominous music in the background.
  myAudio = new Audio('/public/sound/waves.wav');
  myAudio.volume = 0.3;
  myAudio.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
  }, false);
  myAudio.play();

var clockCheckInterval;
var clockInterval;

// The first thing to do is determine the state of the puzzle by parsing the database:
  function get_current_state(){
    // Here we will do an ajax query to get all of the data from the database
    $.ajax('/current_settings', {
      success: function(data) {
        // No we have all of the state data of the puzzle:
        // If the clock value is greater than 3 run the clock and update the front end
        if (data.is_clock_on>=3){
          clearInterval(clockCheckInterval);
          clockInterval = setInterval('updateClock()', 1000);
          $('#ClockHeading').html('Looks like the clock has some alarms set.');

        }else{
          // If this is not the case we run the refresh on the database
          clockCheckInterval = setInterval('checkClock()', 1000);
        }
      },
      error: function() {
        console.log('Could not find current state.');
      }
    });
  }


// Run the set:
get_current_state();





// Check the clock....
function checkClock(){
  $.ajax('/current_settings', {
    success: function(data) {
      if (data.is_clock_on>=3){
        clearInterval(clockCheckInterval);
        clockInterval = setInterval('updateClock()', 1000);
        $('#ClockHeading').html('Looks like the clock has some alarms set.');
      }
    },
    error: function() {
      console.log('Could not update clock.');
    }
  });
}

function updateClock ( )
 	{
 	var currentTime = new Date ( );
  	var currentHours = currentTime.getHours ( );
  	var currentMinutes = currentTime.getMinutes ( );
  	var currentSeconds = currentTime.getSeconds ( );

  	// Pad the minutes and seconds with leading zeros, if required
  	currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
  	currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

  	// Choose either "AM" or "PM" as appropriate
  	var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

  	// Convert the hours component to 12-hour format if needed
  	currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

  	// Convert an hours component of "0" to "12"
  	currentHours = ( currentHours == 0 ) ? 12 : currentHours;

  	// Compose the string for display
  	var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;


   	$("#clock").html(currentTimeString + '&nbsp;&nbsp;&nbsp; <i class="fa fa-bell" style="cursor:pointer"  data-toggle="modal" data-target="#alarmModal" aria-hidden="true"></i>');

 };

function scrollTo(divID){
  lastElementTop = $('.' + divID).position().top ;
  scrollAmount = lastElementTop;
  $('body').animate({scrollTop: scrollAmount},1000);
}
