let weatherAPIkey = '5df8cc936cf95ce37c74cbdcd95eed3c';
let today = $('#today')
let forecast = $('#forecast')

renderHistory();

//displays the weather: final URL to fetch the weather and display it in the web browser
function chooseCity(cityName){

// construct HTML for todays weather
    let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid='+weatherAPIkey+'&units=metric';
    
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            if( data.cod == 404){ // checks if name of the city is spelled correctly/ found. 
                today.append($('<h2> City not found! </h2> <p>Please check if the name of the city you are searching for is spelled correctly, and try again.</p>'));

            }else{
                let cityName = data.name; // The city name
                let date = dayjs().format('DD MMM YYYY');// The date
                //let weatherIcon = data.weather[0].icon;
                let weatherIconURL = 'https://openweathermap.org/img/wn/10d@2x.png'; // An icon representation of weather conditions
                let temperature = data.main.temp;// The temperature in C
                let humidity = data.main.humidity;// The humidity
                let windSpeed = data.wind.speed;// The wind speed km per hour
                

                today.append(
                    $('<div class="card p-3 m-2">').append([
                        $('<div class="card-header">').append([
                            $('<h2>').text(cityName, date),
                            $('<img>').attr('src', weatherIconURL)]), 
                        $('<div class="card-body">').append([
                            $('<p>').text('Temperature: '+ temperature +'°C'),
                            $('<p>').text('Humidity: '+ humidity +'%'),
                            $('<p>').text('Wind Speed: '+ windSpeed +'kmph') 
                        ])
                    ])
                );
            };
        });
//construct HTML for 5 days forecast
    queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+cityName+'&appid='+weatherAPIkey+'&units=metric';
    
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Printing the entire object to console
            console.log(data);

            if( data.cod == 404){ // checks if name of the city is spelled correctly/ found. 
                return;

            }else{
                for(let i=0; i<data.list.length; i=i+8){

                    let date = dayjs(data.list[i].dt_txt).format('DD MMM YYYY');// The date
                    //let weatherIcon = data.list[i].weather[0].icon;
                    let weatherIconURL = 'https://openweathermap.org/img/wn/04n@2x.png' // An icon representation of weather conditions
                    let temperature = data.list[i].main.temp;// The temperature in C
                    let humidity = data.list[i].main.humidity;// The humidity
                    let windSpeed = data.list[i].wind.speed;// The wind speed miles per hour
                    

                    forecast.append(
                        $('<div class="card forecast p-2 m-2" style="width: 18rem;">').append([
                            $('<div class="card-header">').append([
                                $('<h4>').text(date),
                                $('<img>').attr('src', weatherIconURL)]), 
                            $('<div class="card-body">').append([
                                $('<p>').text('Temperature: '+ temperature +'°C'),
                                $('<p>').text('Humidity: '+ humidity +'%'),
                                $('<p>').text('Wind Speed: '+ windSpeed +'kmph') 
                            ])
                        ])
                    )
                }
            }
        })
}
// saves search history 



// Function for displaying movie data
function renderHistory() {
    let searchHistory = Object.values(localStorage);
    $("#history").empty(); // to stop repeatition of buttons
  // Looping through the array of searchHistory
    for (var i = 0; i < searchHistory.length; i++) {
        $("#history").append($('<button class="history-search-btn">').attr("data-city", searchHistory[i]).text(searchHistory[i]));
    }
}

//clears history 
$('#clear').click(function(){
    localStorage.clear();
})

$('#search-button').click(function(e){
    e.preventDefault();
    let city = $("#search-input").val().trim();
    today.empty();
    forecast.empty();
    localStorage.setItem(city, city)
    return chooseCity(city), renderHistory();
})

$('.history-search-btn').click(function(e){
    e.preventDefault();
    console.log(this)
    let city = $(this).data("city");
    console.log(city)
    today.empty();
    forecast.empty();
    return chooseCity(city);
})
