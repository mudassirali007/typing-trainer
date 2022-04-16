const dictionary = ['mother', 'father', 'dog', 'help', 'style', 'call', 'food', 'close', 'live', 'out', 'time', 'if', 'set', 'how', 'cut', 'before', 'hard', 'from', 'where', 'were', 'water', 'mom', 'america'];
const keyDictionary = { 32: '⠀', 65: 'a', 66: 'b', 67: 'c', 68: 'd', 69: 'e', 70: 'f', 71: 'g', 72: 'h', 73: 'i', 74: 'j', 75: 'k', 76: 'l', 77: 'm', 78: 'n', 79: 'o', 80: 'p', 81: 'q', 82: 'r', 83: 's', 84: 't', 85: 'u', 86: 'v', 87: 'w', 88: 'x', 89: 'y', 90: 'z' };
const uncompletedText = document.getElementById('uncompleted_text');
const completedText = document.getElementById('completed_text');
const timerLabel = document.getElementById('timer');
document.addEventListener('keydown', keyHandler, false);
document.addEventListener("DOMContentLoaded", ready);
window.addEventListener('resize', setSize, false);
const bgComplete = document.getElementById('uncompleted_bg');
const fontSize = $("#uncompleted_text").css('font-size');
const fontName = $("#uncompleted_text").css('font');
const statsDiv = document.getElementById('stats');
const statsText = document.getElementById('stats-text');
let symbol;
let nextSymbol;
let nextSymbolWidth;
let keyCounter = 0;
let timerId = null;
let isStartedTimer = false;
let time = 30;
let symbolCounter = 0;
let mistakeCounter = 0;

function ready() {
    show();
    setCursorTimer();
}

function setCursorTimer() {
    let opacity = 0.4;
    setInterval(() => {
        if (opacity >= 1) {
            opacity = 0.4;
        }
        opacity += 0.01;
        bgComplete.style.borderRightColor = `rgba(0,0,0,${opacity})`;
    }, 10)
}

function setSize() {
    // let nextKeyWidth = getTextWidth(uncompletedText.innerHTML[0]);
    nextSymbol = uncompletedText.innerHTML[0];
    nextSymbolWidth = getTextWidth(nextSymbol);
    bgComplete.style.borderRightWidth = nextSymbolWidth + 'px';
    completedText.style.left = $("#uncompleted_text").css("left").slice(0, -2) - getTextWidth(completedText.innerHTML) + 'px';
    bgComplete.style.borderRightWidth = nextSymbolWidth + 'px';
    completedText.style.left = $("#uncompleted_text").css("left").slice(0, -2) - getTextWidth(completedText.innerHTML) + 'px';
    console.log($("#completed_bg").css("top").slice(0, -2) + fontSize.slice(0, -2) + 'px');
    console.log(fontSize.slice(0, -2));
    $(`#${nextSymbol}`).css('background-color', 'green');
    // statsDiv.style.top = parseInt($("#completed_bg").css("top").slice(0, -2)) + parseInt(fontSize.slice(0, -2) * 2) + 'px';
}

let counter = 0;

function keyHandler(e) {
    e.preventDefault();
    let keyCode = e.keyCode;
    symbol = uncompletedText.innerHTML[0];


    $(`#${symbol}`).css('background-color', 'green');

    nextSymbol = uncompletedText.innerHTML[1];
    nextSymbolWidth = getTextWidth(nextSymbol)

    if (e.keyCode == 116) {
        stopTimer();
        $(`#${symbol}`).css('background-color', 'transparent');
        show();
        return;
    }

    if (keyDictionary[keyCode] != symbol) {
        if (isStartedTimer) {
            mistakeCounter++;
        }
        bgComplete.style.backgroundColor = 'red';
        $(`#${keyDictionary[keyCode]}`).css('background-color', 'red');
        setTimeout(() => {
            bgComplete.style.backgroundColor = 'rgb(77, 114, 77)';
            $(`#${keyDictionary[keyCode]}`).css('background-color', 'transparent');
        }, 200);
        return;
    }
    $(`#${symbol}`).css('background-color', 'transparent');
    nextSymbol = uncompletedText.innerHTML[1];
    $(`#${nextSymbol}`).css('background-color', 'green');
    startTimer();



    bgComplete.style.borderRightWidth = nextSymbolWidth + 'px';

    if (keyCode == 32) {
        counter++;
        uncompletedText.innerHTML += nextWord();
    } else {
        symbolCounter++;
    }

    if (counter == 10) {
        completedText.innerHTML = '⠀' + completedText.innerHTML.slice(-50);
        counter = 0;

    }

    if (uncompletedText.innerHTML.length == 2) {
        // stopTimer();
        // confirm(`your speed: ${(symbleCounter/5/time*60).toFixed(1)}WPM`);
        //    showResult();

        show();
        return;
    }
    uncompletedText.innerHTML = uncompletedText.innerHTML.slice(1);
    completedText.innerHTML += symbol;
    completedText.style.left = $("#uncompleted_text").css("left").slice(0, -2) - getTextWidth(completedText.innerHTML) + 'px';


}

function startTimer() {
    if (isStartedTimer)
        return;
    isStartedTimer = true;
    time = 30;
    timerId = setInterval(() => {
        time -= 0.1;
        if (time <= 0) {
            stopTimer();
            showResult();
            show();
        }
        timerLabel.innerHTML = time.toFixed(1);
    }, 100);

}

function stopTimer() {
    if (timerId) {
        clearInterval(timerId);
        isStartedTimer = false;
        time = 30;
    }
}


function show() {
    time = 30;
    $('#timer').text(`${time}.0`);

    symbolCounter = 0;
    mistakeCounter = 0;
    const cloneDictionary = [...dictionary];
    let newText = '';
    let randInt = 0;
    let isFirst = true;

    while (cloneDictionary.length) {
        randInt = generateRandom(0, cloneDictionary.length);
        if (isFirst) {
            keyCounter = cloneDictionary[randInt].length;
            isFirst = false;
        }
        newText += cloneDictionary[randInt] + '⠀';
        cloneDictionary.splice(randInt, 1);
    }
    uncompletedText.innerHTML = newText;
    completedText.innerHTML = '⠀';
    setSize();
}

let pos = 0;

function nextWord() {
    let word = dictionary[generateRandom(0, dictionary.length)];
    keyCounter = word.length + 1;
    console.log('added word:', word);
    return word + '⠀';
}


function generateRandom(min = 0, max = 100) {
    let difference = max - min;
    let value = Math.random();
    value = Math.floor(value * difference);
    value += min;
    return value;
}


function getTextWidth(txt) {
    let text = document.createElement("span");
    document.body.appendChild(text);
    text.style.font = fontName;
    text.style.height = 'auto';
    text.style.width = 'auto';
    text.style.position = 'absolute';
    text.style.whiteSpace = 'no-wrap';
    text.innerHTML = txt;
    let width = Math.ceil(text.clientWidth);
    let formattedWidth = width;
    document.body.removeChild(text);
    return formattedWidth;
}

function showResult() {
    $('#speed').text(`${(symbolCounter/5/time*60).toFixed(1)}WPM`);
    $('#symbols').text(`${symbolCounter}`);
    $('#mistakes').text(`${mistakeCounter}`);
    $('#time').text(`${time.toFixed(1)}s`);
}