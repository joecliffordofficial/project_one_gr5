var userInput = ""
var searchNumber = 0

function foodSearch() {
    userInput = $("#searchBar").val()
    fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=10&q=${userInput}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tasty.p.rapidapi.com",
            "x-rapidapi-key": "5894992dbamsh2db1d89edad00e1p1111dcjsnc598ed0d5cb0"
        }
    })
        .then(response => {
            if (response.status !== 200) {
                alert("Error, " + response.status) // CHANGE TO POPUP MODAL!!`
            }
            else {
                return response.json()
            }
        })
        .then(function (data) {
            console.log("This is the food search (processed)", data)
                $(".card-title").text(data.results[searchNumber].name)
                $(".card-subtitle").text(data.results[searchNumber].description)
                // Why does this not work?
                if (data.results[searchNumber].cook_time_minutes > 0) {
                    $(".dish-cook-time").text("Cook time: " + data.results[searchNumber].cook_time_minutes + " minutes")
                } 
                else {
                    return
                }
                console.log(data.results[searchNumber].instructions[searchNumber].display_text)
                $(".card-text").empty();
                for (let i = searchNumber; i < data.results[searchNumber].instructions.length; i++) {
                    var cookInstructions = $("<li>")
                    cookInstructions.text(data.results[searchNumber].instructions[i].display_text)
                    $(".card-text").append(cookInstructions)
                }
            giphySearch()
        })
        .catch(err => {
            console.error(err);
        });
};

function giphySearch() {
    userInput = $("#searchBar").val()
    var giphyKey = "1KNRVra7wA4kaeelDyw7fvxA0q2s7FcC"
    var giphyURL = `https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&limi=1&q=${userInput}`
    fetch(giphyURL)
        .then(function (response) {
            if (response.status !== 200) {
                alert("Error, " + response.status)
            }
            else {
                return response.json()
            }
        })
        .then(function (data) {
            console.log("This is the processed giphy response data", data)
            var memeFig = $("<figure>")
            var memeImg = $("<img>")
            var memeCap = $("<p>")
            $("#meme-box").empty(); 
            memeImg.attr("src", data.data[searchNumber].images.downsized.url)
            memeFig.append(memeImg,memeCap)
            $("#meme-box").append(memeFig)
        });
}

/*function storeRecipe() {
    console.log("button clicking")
    localStorage.setItem(
// needs to store data from within the card-body class
}*/

$("#search-btn").on("click", function() {
    foodSearch();
});

$("#next-btn").on("click", function(){
        searchNumber++ 
        foodSearch();
});
/*
$("#store-btn").on("click", function() {
    storeRecipe();
});
*/
