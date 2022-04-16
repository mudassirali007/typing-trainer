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
let symble;
let nextSymble;
let nextSymbleWidth;
let keyCounter = 0;
let timerId = null;
let isStartedTimer = false;
let time = 0;
let symbleCounter = 0;
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
    nextSymble = uncompletedText.innerHTML[0];
    nextSymbleWidth = getTextWidth(nextSymble);
    bgComplete.style.borderRightWidth = nextSymbleWidth + 'px';
    completedText.style.left = $("#uncompleted_text").css("left").slice(0, -2) - getTextWidth(completedText.innerHTML) + 'px';
    bgComplete.style.borderRightWidth = nextSymbleWidth + 'px';
    completedText.style.left = $("#uncompleted_text").css("left").slice(0, -2) - getTextWidth(completedText.innerHTML) + 'px';
}

let counter = 0;

function keyHandler(e) {
    e.preventDefault();
    let keyCode = e.keyCode;
    symble = uncompletedText.innerHTML[0];
    nextSymble = uncompletedText.innerHTML[1];
    nextSymbleWidth = getTextWidth(nextSymble)


    if (keyDictionary[keyCode] != symble) {
        if (isStartedTimer) {
            mistakeCounter++;
        }
        bgComplete.style.backgroundColor = 'red';
        setTimeout(() => {
            bgComplete.style.backgroundColor = 'rgb(68, 189, 87)';
        }, 200);
        return;
    }
    startTimer();

    bgComplete.style.borderRightWidth = nextSymbleWidth + 'px';

    if (keyCode == 32) {
        counter++;
        // uncompletedText.innerHTML += nextWord();
    } else {
        symbleCounter++;
    }

    if (counter == 10) {
        completedText.innerHTML = '⠀' + completedText.innerHTML.slice(-50);
        counter = 0;

    }

    if (uncompletedText.innerHTML.length == 2) {
        stopTimer();
        confirm(`your speed: ${(symbleCounter/5/time*60).toFixed(1)}WPM`);
        show();
        return;
    }
    uncompletedText.innerHTML = uncompletedText.innerHTML.slice(1);
    completedText.innerHTML += symble;
    completedText.style.left = $("#uncompleted_text").css("left").slice(0, -2) - getTextWidth(completedText.innerHTML) + 'px';


}

function startTimer() {
    if (isStartedTimer)
        return;
    isStartedTimer = true;
    time = 0;
    timerId = setInterval(() => {
        time += 0.1;
        timerLabel.innerHTML = time.toFixed(1);
    }, 100);

}

function stopTimer() {
    if (timerId) {
        clearInterval(timerId);
        isStartedTimer = false;
    }
}


function show() {
    symbleCounter = 0;
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