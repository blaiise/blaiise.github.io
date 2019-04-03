var words_en = [],
    words_pl = [];

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data/words.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function readTextFile(callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "data/lista.txt", false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                callback(rawFile.responseText);
            }
        }
    };
    rawFile.send(null);
}

var number_en = Math.floor(Math.random() * words_en.length);

function fetch_english() {
    if (words_en) {
        if (words_en.length > 0) {
            number_en = Math.floor(Math.random() * words_en.length);
            document.getElementById("english_word").innerHTML = words_en[number_en]['en'];
            document.getElementById("polish_answer").innerHTML = words_en[number_en]['pl'];
        } else {
            alert("Run out of Words, well done!");
        }
    } else {
        alert("Error: Words not loaded!");
    }
}

var number_pl = Math.floor(Math.random() * words_pl.length);

function fetch_polish() {
    if (words_pl) {
        if (words_pl.length > 0) {
            number_pl = Math.floor(Math.random() * words_pl.length);
            document.getElementById("polish_word").innerHTML = words_pl[number_pl]['pl'];
            document.getElementById("english_answer").innerHTML = words_pl[number_pl]['en'];
        } else {
            alert("Run out of Words, well done!");
        }
    } else {
        alert("Error: Words not loaded!");
    }
}

function init() {
    loadJSON(function (response) {
        // Parse JSON string into object
        words_en = JSON.parse(response);
        fetch_english();
        words_pl = JSON.parse(response);
        fetch_polish();
    });
    readTextFile(function(response){
        document.getElementById("list_of_words").innerHTML = response.replace(/\n/g,"<br />");
    });
}

var polish_answer = document.getElementById("polish_answer"),
    english_answer = document.getElementById("english_answer");

document.getElementById("reveal_polish").addEventListener("click", function () {
    polish_answer.classList.remove("hidden");
});

function next_english() {
    polish_answer.classList.add("hidden");
    fetch_english();
    console.log(number_en);
}

document.getElementById("next_english").addEventListener("click", next_english);
document.getElementById("yes_en").addEventListener("click", function () {
    words_en.splice(number_en, 1);
    next_english();
});

document.getElementById("reveal_english").addEventListener("click", function () {
    english_answer.classList.remove("hidden");
});

function next_polish() {
    english_answer.classList.add("hidden");
    fetch_polish();
    console.log(number_pl);
}

document.getElementById("next_polish").addEventListener("click", next_polish);
document.getElementById("yes_pl").addEventListener("click", function () {
    words_pl.splice(number_pl, 1);
    next_polish();
});

function show_list() {
    document.getElementById("list_of_words").classList.remove("hidden");
}
document.getElementById("show_list").addEventListener("click", show_list);

init();
