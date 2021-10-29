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
                    $(".dish-cook-time").text(" ")
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
$("#search-btn").on("click", foodSearch);
 console.log(foodSearch)

/*
// History stuff!!!
var searchHistoryArr = [];
 function storeHistory(citySearchName) {
    var searchHistoryObj = {};
    if (searchHistoryArr.length === 0) {
      searchHistoryObj['city'] = citySearchName;
      searchHistoryArr.push(searchHistoryObj);
      localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArr));
    } else {
      var checkHistory = searchHistoryArr.find(
        ({ city }) => city === citySearchName
      );
      if (searchHistoryArr.length < 5) {
        if (checkHistory === undefined) {
          searchHistoryObj['city'] = citySearchName;
          searchHistoryArr.push(searchHistoryObj);
          localStorage.setItem(
            'searchHistory',
            JSON.stringify(searchHistoryArr)
          );
        }
      } else {
        if (checkHistory === undefined) {
          searchHistoryArr.shift();
          searchHistoryObj['city'] = citySearchName;
          searchHistoryArr.push(searchHistoryObj);
          localStorage.setItem(
            'searchHistory',
            JSON.stringify(searchHistoryArr)
          );
        }
      }
    }
    $('#search-history').empty();
    displayHistory();
  }
  function displayHistory() {
    var getLocalSearchHistory = localStorage.getItem('searchHistory');
    var localSearchHistory = JSON.parse(getLocalSearchHistory);
    if (getLocalSearchHistory === null) {
      createHistory();
      getLocalSearchHistory = localStorage.getItem('searchHistory');
      localSearchHistory = JSON.parse(getLocalSearchHistory);
    }
    for (var i = 0; i < localSearchHistory.length; i++) {
      var historyLi = $('<li>');
      historyLi.addClass('list-group-item');
      historyLi.text(localSearchHistory[i].city);
      $('#search-history').prepend(historyLi);
      $('#search-history-container').show();
    }
    return (searchHistoryArr = localSearchHistory);
  }
<<<<<<< HEAD
=======

>>>>>>> main
  function createHistory() {
    searchHistoryArr.length = 0;
    localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArr));
  }
<<<<<<< HEAD
=======

>>>>>>> main
  function clearHistory() {
    $('#clear-button').on('click', function() {
      $('#search-history').empty();
      $('#search-history-container').hide();
      localStorage.removeItem('searchHistory');
      createHistory();
    });
  }
<<<<<<< HEAD
=======

>>>>>>> main
  function clickHistory() {
    $('#search-history').on('click', 'li', function() {
      var cityNameHistory = $(this).text();
      getWeather(cityNameHistory);
    });
  }
});
*/