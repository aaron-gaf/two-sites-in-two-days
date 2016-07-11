// The user's input field
var usrInput = document.getElementById('usrInput');

// All 147 (I believe?) CSS colors with 'names'
var colors = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];
// Contains words that rhyme with a given word
var wordsThatRhyme = [];
// Contains colors from the wordsThatRhyme array
var colorsThatRhyme = [];

var mainDiv = document.getElementById('mainDiv');

// The xhttp request variable used when making API calls
var xhttp = new XMLHttpRequest();
// xhttp onreadystatechange listener
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        var ar = JSON.parse(xhttp.responseText);
        for (var i = 0, n = ar.length; i < n; i++) {
            var obj = ar[i];
            for (var key in obj) {
                if (key == 'word') {
                    // Add the word to the words array
                    wordsThatRhyme.push(obj[key]);
                }
            }
        }
    }
}

if (!usrInput || !mainDiv) {
    console.log('Couldn\'t find important elements!');
} else {
    usrInput.onkeypress = function(event) {
        if (!event) event = window.event;
        var keyCode = event.keyCode || event.which;
        if (keyCode == '13') {
            if (!/\S/.test(usrInput.value)) return;
            getWordsThatRhymeWith(usrInput.value, true);
            getColorsForWord(wordsThatRhyme, false);
            changeBackground(colorsThatRhyme.length);
            usrInput.value = '';
        }
    };


    // Get the header in case we need to change its color
    var h1 = document.getElementsByTagName('h1')[0];
    // Set the body to a random color 
    var bgcolor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = bgcolor;

    var docFrag = document.createDocumentFragment();
    var p = document.createElement('P');

    p.textContent = bgcolor;
    p.style.textAlign = 'center';
    p.style.verticalAlign = 'middle';
    p.style.font = 'normal bold 34px arial,serif';

    // if the body is a light color and the h1 is too, change h1 to a dark color
    if (($('body').lightColor() || $('html').lightColor()) && ($(h1).lightColor())) {
        h1.style.color = 'black';
    }
    // basically the other way around, same idea
    if (!($('body').lightColor() || $('html').lightColor()) && !($(h1).lightColor())) {
        h1.style.color = 'white';
    }

    // now with the paragraph's color
    if (($('body').lightColor() || $('html').lightColor()) && ($(p).lightColor())) {
        p.style.color = 'black';
    }
    if (!($('body').lightColor() || $('html').lightColor()) && !($(p).lightColor())) {
        p.style.color = 'white';
    }

    docFrag.appendChild(p);
    mainDiv.appendChild(docFrag);
}

/*
 * Changes the background to a certain color.
 * If numColumns > 1 it divides the page evenly into sections and sets each section to a color
 * and names each section with the colors name.
 * If numColumns == 1 it just sets the background color of the page to the color, and puts the colors name in the center of the page.
 */
function changeBackground(numColumns) {
    if (numColumns === 1) {
        $('body').style.backgroundColor = colorsThatRhyme[0];
        $('html').style.backgroundColor = colorsThatRhyme[0];
    } else if (numColumns > 1) {

    }
}

/*
 * Finds CSS colors in an array of words.
 * If multiple is true, it finds more than one color,
 * otherwise, it picks one random color out of the available colors.
 */
function getColorsForWord(wordArray, multiple) {
    // empty the array of colors
    colorsThatRhyme = [];
    if (multiple) {
        for (var word in wordArray) {
            if ($.inArray(word.toLowerCase(), colors.toLowerCase())) {
                colorsThatRhyme.push(word);
            }
        }
    } else {
        for (var word in wordArray) {
            if ($.inArray(word.toLowerCase(), colors.toLowerCase())) {
                colorsThatRhyme.push(word);
            }
        }
        var thisOne = colorsThatRhyme[Math.floor(Math.random() * colorsThatRhyme.length)];
        for (var i = 0, n = colorsThatRhyme.length; i < n; i++) {
            if (colorsThatRhyme[i] != thisOne) {
                colorsThatRhyme.splice(i, 1);
            }
        }
    }
    changeBackground(colorsThatRhyme.length);
}

/*
 * Makes a call using the Datamuse API that returns
 * a JSON object with words that rhyme with 'word'.
 * the soft parameter finds words that are approximate rhymes if true,
 * otherwise, it finds words that are 'perfect' rhymes.
 */
function getWordsThatRhymeWith(word, soft) {
    var url;
    // Empty the array of words
    wordsThatRhyme = [];
    if (soft) {
        url = 'https://api.datamuse.com/words?rel_nry=' + word + '&max=250';
        xhttp.open('GET', url, true);
        xhttp.send();
    } else {
        url = 'https://api.datamuse.com/words?rel_rhy=' + word + '&max=250';
        xhttp.open('GET', url, true);
        xhttp.send();
    }
}