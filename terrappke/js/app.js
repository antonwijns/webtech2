//var APIApplication =  new function () {

    var coords = {lat: "", lon: ""};
    var w;
    var date = new Date();
    var tod = date.getDay();

    if(navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(getPosition, error);
    } else {
        alert("No geolocation available in your browser.");
    }

    function error() {
        alert("Failed to load geolocation data.");
    }

    var weekdays=new Array();
        weekdays[0]="Sunday";
        weekdays[1]="Monday";
        weekdays[2]="Tuesday";
        weekdays[3]="Wednesday";
        weekdays[4]="Thursday";
        weekdays[5]="Friday";
        weekdays[6]="Saturday";

    /*var list = $("a");
    for (var i=0; i<list.length; i++) {
        $(list[i]).on("click",function(){w.show(i);});
        console.log(list[i]);
    }*/

    var list = $("a");
    list.each(function(index){
        $(this).on("click", function(){w.show(index);});
    });

    function getPosition(position) {
       coords.lat = position.coords.latitude;
       coords.lon = position.coords.longitude;
        w= new Weather(coords.lat, coords.lon);
    }
//}
