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

function init() {
    loadJSON(function (response) {
        // Parse JSON string into object
        words = JSON.parse(response);

        if (words) {

            let number_en = Math.floor(Math.random() * words.length);
            document.getElementById("english_word").innerHTML = words[number_en]['word'];
            document.getElementById("polish_answer").innerHTML = words[number_en]['pol'];

            let number_pl = Math.floor(Math.random() * words.length);
            document.getElementById("polish_word").innerHTML = words[number_pl]['pol'];
            document.getElementById("english_answer").innerHTML = words[number_pl]['word'];
        }
    });
}

init();

document.getElementById("reveal_polish").addEventListener("click", function () {
    document.getElementById("polish_answer").classList.remove("hidden");
});

document.getElementById("reveal_english").addEventListener("click", function () {
    document.getElementById("english_answer").classList.remove("hidden");
});