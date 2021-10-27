var userInput = $("user-input").val()

function foodSearch() {

    fetch(`https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=${userInput}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tasty.p.rapidapi.com",
            "x-rapidapi-key": "5894992dbamsh2db1d89edad00e1p1111dcjsnc598ed0d5cb0"
        }
    })
        .then(response => {
            console.log(response);
            if (response.status !== 200) {
                alert("Error, link is broken")
            }
            else {
                return response.json()
            }
        })
        .then(function (data) {
            console.log(data)
        })
        .catch(err => {
            console.error(err);
        });
    giphySearch()
};

function giphySearch() {
    var giphyKey = "1KNRVra7wA4kaeelDyw7fvxA0q2s7FcC"
    var giphyURL = `https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&limi=1&q=${userInput}`
    fetch(giphyURL)
        .then(function (response) {
            if (response.status !== 200) {
                alert("Error, link is broken")
            }
            else {
                return response.json()
            }
        })
        .then(function (data) {
            console.log(data)
        });
}

$("#search-btn").on("click", foodSearch);
 console.log(foodSearch)
