$(document).ready(function() {
  var $menu = $("#sidebar-wrapper");

  $(document)
  .on("click", "#hamburger", function() {
    $menu.addClass("open");

    return false;
  })

  .on("click", ".js-menu-close", function(e) {
    $menu.removeClass("open");

      return false;
    })


  .on("click",".alt-menu-close", function(e) {
    $menu.removeClass("open");
  });

getWeather();

function getWeather() {
  $.ajax({
    url : "https://api.wunderground.com/api/a75af0a37f44d975/geolookup/conditions/q/KY/Ashland.json",
    dataType : "jsonp",
    success : function(parsed_json) {
      var conditions = parsed_json.current_observation.weather;
      loadImage(conditions);
    }
  });
}

function getTimeOfDay() {
  var time = new Date();
  var hours = time.getHours();
  var timeOfDay;

  if(hours > 17) {
    timeOfDay = "night";
  } else if (hours > 12) {
    timeOfDay = "afternoon";
  } else {
    timeOfDay = "morning";
  }
  return timeOfDay;
}

function loadImage(conditions) {
  var imageSRC ="img/weather/hero-"
  var validConditions = ["clear","cloudy", "rain", "snow"];
  var timeOfDay = getTimeOfDay();
  conditions = conditions.toLowerCase();

  if (validConditions.indexOf(conditions) == -1) {
    conditions = "cloudy";
  }

imageSRC = imageSRC + conditions + "-" + timeOfDay + ".jpg";
$("#intro").css("background-image", "url(" + imageSRC + ")");

  }

});
