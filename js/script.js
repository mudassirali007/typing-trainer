import Keyboard from '../js/keyboard.js';
const dictionary = [
    ['mother', 'father', 'dog', 'help', 'style', 'call', 'food', 'close', 'live', 'out', 'time', 'if', 'set', 'how', 'cut', 'before', 'hard', 'from', 'where', 'were', 'water', 'mom', 'america', 'put', 'print', 'about', 'true', 'false', 'input', 'while', 'for', 'table', 'char', 'double', 'string', 'bot', 'word', 'world', 'first', 'second', 'red', 'black', 'white', 'orange', 'travel', 'query', 'something', 'sometimes', 'anyway', 'return', 'add', 'delete', 'telegram', 'python', 'java', 'css', 'javascript', 'list', 'show', 'party', 'cat', 'read', 'mile', 'once', 'point', 'number', 'through', 'its', 'because', 'school', 'book', 'have', 'switch', 'their', 'give'],
    ['слово', 'просто', 'дата', 'язык', 'то', 'если', 'я', 'когда', 'тогда', 'подъезд', 'следовательно', 'теорема', 'доказательство', 'крутой', 'вариант', 'тест', 'для', 'и', 'что', 'уровень', 'ошибка', 'оценка', 'статистика', 'гипотеза', 'отклоняется', 'таблица', 'ряд', 'время', 'коэффициент', 'эконометрика', 'анализ', 'группа', 'равно', 'производная', 'телефон', 'наушники', 'мел', 'компьютер', 'поиск', 'модель', 'задача', 'же', 'как', 'в', 'было', 'где-то', 'игра', 'ящерица', 'яйцо', 'голова', 'беседа', 'логарифм', 'изменение', 'граф', 'ребро', 'вершина']
];
// const dictionaryRU = ['просто', 'слово', 'теорема', 'доказательство', 'если', 'то'];
const keyDictionary = [
    { 32: '⠀', 48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9', 65: 'a', 66: 'b', 67: 'c', 68: 'd', 69: 'e', 70: 'f', 71: 'g', 72: 'h', 73: 'i', 74: 'j', 75: 'k', 76: 'l', 77: 'm', 78: 'n', 79: 'o', 80: 'p', 81: 'q', 82: 'r', 83: 's', 84: 't', 85: 'u', 86: 'v', 87: 'w', 88: 'x', 89: 'y', 90: 'z', 186: ';', 187: '=', 188: ',', 189: '-', 190: '.', 191: '/', 219: '[', 221: ']', 222: "'" },
    { 32: '⠀', 48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9', 65: 'ф', 66: 'и', 67: 'с', 68: 'в', 69: 'у', 70: 'а', 71: 'п', 72: 'р', 73: 'ш', 74: 'о', 75: 'л', 76: 'д', 77: 'ь', 78: 'т', 79: 'щ', 80: 'з', 81: 'й', 82: 'к', 83: 'ы', 84: 'е', 85: 'г', 86: 'м', 87: 'ц', 88: 'ч', 89: 'н', 90: 'я', 186: 'ж', 187: '=', 188: 'б', 189: '-', 190: 'ю', 191: '.', 219: 'х', 221: 'ъ', 222: "э" }
]
const uncompletedText = document.getElementById('uncompleted_text');
const completedText = document.getElementById('completed_text');
const timerLabel = document.getElementById('timer');
const keyboardCanvas = document.getElementById('keyboard_canvas');
document.addEventListener('keydown', keyHandler, false);
document.addEventListener("DOMContentLoaded", ready);
window.addEventListener('resize', setSize, false);
const bgComplete = document.getElementById('uncompleted_bg');
let fontSize = $("#uncompleted_text").css('font-size');
const fontName = $("#uncompleted_text").css('font');
let symbol;
let nextSymbol;
let nextSymbolWidth;
let keyCounter = 0;
let timerId = null;
let isStartedTimer = false;
let time = 30;
let symbolCounter = 0;
let mistakeCounter = 0;
let keyboard = null
const langs = { 'en': 0, 'ru': 1 };
let lang = 0;


$('#lang').change(function() {
    let value = $(this).val();
    console.log(value);
    lang = langs[value];
    if (keyboard.lang != lang) {
        keyboard.changeKeyboard(lang);
    }
    restart();
});

function ready() {
    keyboard = new Keyboard(keyboardCanvas);
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
    $(`#${nextSymbol}`).css('background-color', '#4D724D');
    keyboard.setKeyColor(nextSymbol, '#4D724D');
}

let spaceCounter = 0;
let completedSymbolsCounter = 0;

function keyHandler(e) {
    e.preventDefault();
    let keyCode = e.keyCode;
    symbol = uncompletedText.innerHTML[0];


    // $(`#${symbol}`).css('background-color', '#4D724D');

    nextSymbol = uncompletedText.innerHTML[1];
    nextSymbolWidth = getTextWidth(nextSymbol)

    if (e.keyCode == 116) {
        restart();
        return;
    }

    console.log(keyCode);
    console.log('dict', keyDictionary[lang][keyCode]);
    let pos = keyboard.getKeyButtonPosByID(keyDictionary[lang][keyCode]);
    let prevKey = nextSymbol;
    keyboard.setPushed(pos, true);


    setTimeout(() => {
        keyboard.setPushed(pos, false);
        keyboard.redraw(pos);

    }, 100);


    if (keyDictionary[lang][keyCode] != symbol) {
        if (isStartedTimer) {
            mistakeCounter++;
        }
        bgComplete.style.backgroundColor = '#FF0000';
        keyboard.setKeyColor(keyDictionary[lang][keyCode], '#FF0000');
        setTimeout(() => {
            bgComplete.style.backgroundColor = '#4D724D';
            keyboard.setKeyColor(keyDictionary[lang][keyCode]);
        }, 100);
        return;
    }
    // $(`#${symbol}`).css('background-color', 'transparent');
    keyboard.setKeyColor(symbol);
    nextSymbol = uncompletedText.innerHTML[1];
    $(`#${nextSymbol}`).css('background-color', '#4D724D');

    keyboard.setKeyColor(nextSymbol, '#4D724D');
    setTimeout(() => {
        keyboard.setKeyColor(nextSymbol, '#4D724D');
    }, 100)
    startTimer();

    bgComplete.style.borderRightWidth = nextSymbolWidth + 'px';

    if (keyCode == 32) {
        spaceCounter++;
        uncompletedText.innerHTML += nextWord();
    } else {
        symbolCounter++;
    }
    completedSymbolsCounter++;

    if (completedSymbolsCounter >= 20) {
        console.log('clear');
        completedText.innerHTML = '⠀' + completedText.innerHTML.slice(-20);
        completedSymbolsCounter = 0;

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

function restart() {
    stopTimer();
    $(`#${symbol}`).css('background-color', 'transparent');
    keyboard.setKeyColor(symbol);
    show();
}

function startTimer() {
    let isColored = false;
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
        if (time <= 10 && !isColored) {
            $('#timer').css('color', '#FF0000');
            isColored = true;
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
    $('#timer').css('color', 'white');

    symbolCounter = 0;
    mistakeCounter = 0;
    const cloneDictionary = [...dictionary[lang]];
    keyboard.setKeyColor(nextSymbol);
    keyboard.setKeyColor(symbol);
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
    let word = dictionary[lang][generateRandom(0, dictionary[lang].length)];
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