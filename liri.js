var Spotify = require('node-spotify-api');

var request = require('request');

var axios = require("axios");

var fs = require('fs');


var spotify = new Spotify({

id: "71d798104a6f4f8f9eb00b25a9a2decb",
secret: "bbb226069bcb4a9f8b0ec2b413655792",

});

var userInput = process.argv[2];
            
if(userInput == 'spotify-this'){


    var song = process.argv.splice(3, process.argv.length).join(' ');

   spotifyThis(song);




}else if(userInput == "concert-this"){
    
    var artist = process.argv.splice(3, process.argv.length).join(' ');

    concertThis(artist);

    //This is for the ombdb part of the 

}else if(userInput == "movie-this"){
    
    var movieName = process.argv.splice(3, process.argv.length).join(' ');
    
    movieThis(movieName);

}else if( userInput == "do-what-it-says") {

        fs.readFile('./random.txt','utf8', function(err, data){
        
          
           var dataArr = data.split(" "); 
           var command = dataArr[0];
           var input = dataArr.splice(1, dataArr.length).join(' ');
         
           if(command == "spotify-this"){
               spotifyThis(input);
           }else if(command == "movie-this") {
               movieThis(input);
           }else if(command == "concert-this") {
               concertThis(input);
           }
          
        })
}


function spotifyThis(song) {
    if(!song){
        song = "Ace of Base";
    }

    spotify.search({ type: 'track', query: song }, function (err, data) {
        
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Song Name : " + data.tracks.items[0].name);
        console.log("Preview URL : " + data.tracks.items[0].preview_url);
        console.log("Artist Name : " + data.tracks.items[0].album.artists[0].name);
        console.log("Album Name : " + data.tracks.items[0].album.name);
        
    });  
}

function movieThis(movieName) {
    if(!movieName){
        movieName = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(function (response) {

        
        console.log("Title : " + response.data.Title);
        console.log("Year : " + response.data.Year);
        console.log("IMDB Rating : " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating : " + response.data.Ratings[2].Value);
        console.log("Country : " + response.data.Country);
        console.log("Language : " + response.data.Language);
        console.log("Plot : " + response.data.Plot);
        console.log("Actors : " + response.data.Actors);
    })

    .catch(function (error) {
        console.log('error', error);
    });

}  

function concertThis(artist) {
    console.log(artist);
    var apiUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    
    request(apiUrl, function (error, response, body) {
        // Look up what you need
        //traverse the object to the information
    
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', JSON.parse(body)); // Print the HTML for the Google homepage.
    });
}