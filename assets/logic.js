var userInput = ""
var searchNumber = 0

function foodSearch() {
  userInput = $("#searchBar").val()
  fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=10&q=${userInput}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "tasty.p.rapidapi.com",
      "x-rapidapi-key": "c7003324e3mshf11e61354db1858p120a22jsna4188addcb2a"
    }
  })
    .then(response => {
      if (response.status !== 200) {
        alert("Error, " + response.status)
      }
      else {
        return response.json()
      }
    })
    .then(function (data) {
      appendToHistory(data);
      $(".card-title").text(data.results[searchNumber].name)
      $(".card-subtitle").text(data.results[searchNumber].description)
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
      memeFig.append(memeImg, memeCap)
      $("#meme-box").append(memeFig)
    });
}

$("#search-btn").on("click", function () {
    if ($("#searchBar").val() == "") {
      return
    }
    else {
      foodSearch();
    }
});

$("#next-btn").on("click", function () {
  if ($("#searchBar").val() == "") {
    return
  }
  else {
    searchNumber++
    foodSearch();
  }
});

$("#clear-history").on("click", function () {
  localStorage.clear();
  searchHistory = []
  $("#search-history-container").empty();
});

var searchHistory = []
var searchForm = document.querySelector("#searchBar")
var searchInput = $("#searchBar").val();
var searchHistoryContainer = document.querySelector("#search-history-container")

function renderSearchHistory() {
  searchHistoryContainer.innerHTML = '';
  for (var i = searchHistory.length - 1; i >= 0; i--) {
    var btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.classList.add('history-btn', 'btn-history')
    btn.setAttribute('data-search', searchHistory[i])
    btn.textContent = localStorage.key(i);
    searchHistoryContainer.append(btn)
  }
}

function showHistory(data) {
  // show data corresponding to the parent of .this element
  console.log($(this))
}

$(".history-btn").on("click", showHistory)

function appendToHistory(search) {
  if (searchHistory.indexOf(search) !== -1) {
    return;
  }
  searchHistory.push(search);
  localStorage.setItem(userInput, JSON.stringify(searchHistory))
  renderSearchHistory();
}

function initSearchHistory() {
  var storedHistory = localStorage.getItem('search-history');
  if (storedHistory) {
    searchHistory = JSON.parse(storedHistory)
  }
  renderSearchHistory()
}

function handleSearchFormSubmit(x) {
  if (!searchInput.value) {
    return;
  }
  x.preventDefault();
  var search = userInput.value.trim();
  foodSearch(search);
  searchInput.value = '';
}

function handleSearchHistoryClick(x) {
  if (!x.target.matches('.btn-history')) {
    return;
  }
  var btn = x.target;
  var search = btn.getAttribute('data-search');
  foodSearch(search);
}

searchForm.addEventListener('submit', handleSearchFormSubmit);
searchHistoryContainer.addEventListener('click', handleSearchHistoryClick)
