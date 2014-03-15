var Weather = function(lat, lon) {
    this.latitude = lat;
    this.longitude = lon;
    this.key= "1ceb1223ed3b7e25a7381f792a0b0ef6";
    this.weatherData;
    this.checkStorage();
}

Weather.prototype.loadData = function() {
    var jsonurl = "https://api.forecast.io/forecast/"+this.key+"/"+this.latitude+","+this.longitude;
    //console.log(jsonurl);
    $.ajax({url: jsonurl, type: "GET", dataType: "jsonp"})
    .done(function(data) {
        console.log("saving to storage");
        //console.log(data);
        this.weatherData = data;
        localStorage.setItem("weather", JSON.stringify(this.weatherData));
        localStorage.setItem("time",new Date().getTime());
        w.checkStorage();
    });
}

Weather.prototype.checkStorage = function() {
    console.log("checking storage");
    if(!localStorage.getItem("weather")) {
        this.loadData();
    } else {
        console.log("already in storage");
        if(new Date().getTime() - localStorage.getItem("time")<= 3600000) {
            this.weatherData = JSON.parse(localStorage.getItem("weather"));
            console.log("Data still up-to-date");

            //START RENDERING -> DATA LOADED

            this.show(0);
        } else {
            console.log("Out of date, reloading data");
            this.loadData();
        }
    }
}

Weather.prototype.show = function(number) { //0=Today, 1=Tomorrow, ... , Up to 7
        var dailyWeather = this.weatherData.daily.data[number];
        //console.log(dailyWeather);
        this.render(dailyWeather);
}

Weather.prototype.updateLocation = function(lat, lon) {
    this.latitude = lat;
    this.longitude = lon;
    this.loadData();
}

Weather.prototype.clearStorage = function () {
    localStorage.setItem("weather","");
}

Weather.prototype.render = function(weather) {
    var day = new Date(weather.time*1000);
    var weekdays=new Array();
        weekdays[0]="Sunday";
        weekdays[1]="Monday";
        weekdays[2]="Tuesday";
        weekdays[3]="Wednesday";
        weekdays[4]="Thursday";
        weekdays[5]="Friday";
        weekdays[6]="Saturday";
    var months = new Array();
        months[0]= "January";
        months[1]= "February";
        months[2]= "March";
        months[3]= "April";
        months[4]= "May";
        months[5]= "June";
        months[6]= "July";
        months[7]= "August";
        months[8]= "September";
        months[9]= "October";
        months[10]= "November";
        months[11]= "December";
    
    $("#weatherimage").attr('src','images/'+weather.icon+".png").attr('alt',weather.summary);

    $("#temprature").text(Math.round((weather.temperatureMin)* 5 / 9)+ "° C ");
}
