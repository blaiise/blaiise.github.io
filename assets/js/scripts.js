var words = [];

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

function fetch_english() {
    if (words) {
        let number_en = Math.floor(Math.random() * words.length);
        document.getElementById("english_word").innerHTML = words[number_en]['word'];
        document.getElementById("polish_answer").innerHTML = words[number_en]['pol'];
    } else {
        alert("Error: Words not loaded!");
    }
}

function fetch_polish() {
    if (words) {
        let number_en = Math.floor(Math.random() * words.length);
        document.getElementById("polish_word").innerHTML = words[number_en]['pol'];
        document.getElementById("english_answer").innerHTML = words[number_en]['word'];
    } else {
        alert("Error: Words not loaded!");
    }
}

function init() {
    loadJSON(function (response) {
        // Parse JSON string into object
        words = JSON.parse(response);
        fetch_english();
        fetch_polish();
    });
}

var polish_answer = document.getElementById("polish_answer"),
    english_answer = document.getElementById("english_answer");

document.getElementById("reveal_polish").addEventListener("click", function () {
    polish_answer.classList.remove("hidden");
});
document.getElementById("next_english").addEventListener("click", function () {
    polish_answer.classList.add("hidden");
    fetch_english();
});

document.getElementById("reveal_english").addEventListener("click", function () {
    english_answer.classList.remove("hidden");
});
document.getElementById("next_polish").addEventListener("click", function () {
    english_answer.classList.add("hidden");
    fetch_polish();
});

init();
