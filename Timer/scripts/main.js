// html elements
var timerTimeLeft = document.getElementById('timerTime');
var timerLength = document.getElementById('length');
var startStop = document.getElementById('startStop');
var toggleLightDark = document.getElementById('toggleColorScheme');
var toggleLightDarkImg = document.getElementById('toggleColorSchemeImg');

// color scheme
var isLight = true;

// default timer time
var clockTime = -1;

// the timer variable (so we can start/stop)
var timer;

// whether or not the timer is running
var isRunning = false;

if (!timerTimeLeft || !timerLength || !startStop || !toggleLightDark || !toggleLightDarkImg) {
    console.log("Error! Couldn't find necessary elements!");
} else {
    timerLength.onkeypress = function(event) {
        if (!event) event = window.event;
        var keyCode = event.keyCode || event.which;
        if (!isNaN(parseInt(timerLength.value)))
            setClockTimer(timerLength.value);
    };
    startStop.onclick = function() {
        if (clockTime != -1) {
            toggleTimer();
            return false;
        }
    }
    toggleLightDark.onclick = function() {
        if (isLight) {
            setColorScheme('dark');
            return false;
        } else {
            setColorScheme('light');
            return false;
        }
    };
}

function setClockTimer(time) {
    var temp = parseInt(time);
    if (!isNaN(temp)) {
        if (temp > 0) {
            clockTime = temp;
            timerTimeLeft.innerHTML = converNumToTimeString(clockTime);
        } else {
            warn()
        }
    }
}

/*
* Displays the warning modal
*/
function warn() {
        modal.style.display = 'block';
}

function toggleTimer() {
    if (!isRunning) {
        timer = setInterval(function() {
            clockTime--;
            timerTimeLeft.innerHTML = converNumToTimeString(clockTime);
            if (clockTime === 0) {
                clockTime = -1;
                playDoneSound();
                startStop.innerHTML = "Start Timer";
                isRunning = !isRunning;
                clearInterval(timer);
            }
        }, 1000);
        isRunning = !isRunning;
        startStop.innerHTML = "Stop Timer";
    } else {
        if (timer)
            clearInterval(timer);
        isRunning = !isRunning;
        startStop.innerHTML = "Start Timer";
    }
}

/*
* Alerts the user that the timer has ended
*/
function playDoneSound() {
    var audio = new Audio('sound/alarmsound.mp3');
    audio.play();
}

// Found this nifty code on http://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
// changed it a little bit
/*
* Takes a num and returns a time string in HH:MM:SS format
*/
function converNumToTimeString (num) {
    var sec_num = parseInt(num, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0" + hours;}
    if (minutes < 10) {minutes = "0" + minutes;}
    if (seconds < 10) {seconds = "0" + seconds;}
    return hours + ':' + minutes + ':' + seconds;
}

function setColorScheme(str) {
    if (str === 'dark') {
        document.body.style.backgroundColor = 'black';
        toggleLightDarkImg.setAttribute('src', 'img/lightbulb_off.png');
        toggleLightDarkImg.setAttribute('alt', 'Change the color scheme to light');
        isLight = !isLight;
    } else if (str === 'light') {
        document.body.style.backgroundColor = 'white';
        toggleLightDarkImg.setAttribute('src', 'img/lightbulb.png');
        toggleLightDarkImg.setAttribute('alt', 'Change the color scheme to dark');
        isLight = !isLight;
    }
}

// All modal stuff basically taken and tweaked from http://www.w3schools.com/howto/howto_css_modals.asp
// It's not just copied/pasted, but a lot of it is from that site
// Modal stuff
// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = 'none';
    return false;
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        return false;
    }
};