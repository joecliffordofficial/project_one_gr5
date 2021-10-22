var userInputTasty = $("user-input").val()
var userInputDrink = $("user-input2").val()

// Need to change userOutputDrink to a dropdown 

fetch(`https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=${userInputTasty}`, {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "tasty.p.rapidapi.com",
        "x-rapidapi-key": "5894992dbamsh2db1d89edad00e1p1111dcjsnc598ed0d5cb0"
    }
})
    .then(response => {
        console.log(response);
        return response.json()
    })
    .then(function (data) {
        console.log(data)
    })
    .catch(err => {
        console.error(err);
    });

fetch(`https://the-cocktail-db.p.rapidapi.com/filter.php?i=${userInputDrink}`, {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
        "x-rapidapi-key": "5894992dbamsh2db1d89edad00e1p1111dcjsnc598ed0d5cb0"
    }
})
    .then(response => {
        console.log(response);
        // 1 make a piece of html in the javascript
        var title = document.createElement('h1')
        //2 dress up that html how u want give it text and a class name whatever!
        title.innerHTML = 'TESTING TITLE!!'
        //3 chuck that html onto the page!!! put it in a blank div already on yourhtml file
        document.getElementById('putMyStuffHere').appendChild(title)
    })
    .catch(err => {``
        console.error(err);
    });