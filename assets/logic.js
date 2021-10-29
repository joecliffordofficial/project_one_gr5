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

  function createHistory() {
    searchHistoryArr.length = 0;
    localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArr));
  }

  function clearHistory() {
    $('#clear-button').on('click', function() {
      $('#search-history').empty();
      $('#search-history-container').hide();
      localStorage.removeItem('searchHistory');
      createHistory();
    });
  }

  function clickHistory() {
    $('#search-history').on('click', 'li', function() {
      var cityNameHistory = $(this).text();
      getWeather(cityNameHistory);
    });
  }
});