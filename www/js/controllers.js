angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaGeolocation, $http) {

  var options = {timeout: 10000, enableHighAccuracy: true};

    // $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    //   var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    //   var mapOptions = {
    //     center: latLng,
    //     zoom: 15,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   };

    //   $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // }, function(error){
    //   console.log("Could not get location");
    // });

    $http.get("data/airbnb.json")
      .then(function(response) {

      $scope.geoloc = response.data;

      console.log($scope.geoloc);

      var centerPos = new google.maps.LatLng(0, 0);

      //Initial position
      var mapOptions = {
        center: centerPos,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
       };

      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      var latLng;

      //Add json markers
      for(var i = 0; i < 300; i++) {
        var marker = $scope.geoloc[i];
        latLng = new google.maps.LatLng(marker.latitude, marker.longitude);
        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
        });
      }

      $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        //Uncomment this to center to user location. Comment this to center to latest marker
        //var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        $scope.map.setCenter(latLng);

      }, function(error){
        console.log("Could not get location");
      });
    }, function(error){
      console.log("Could not load json");
    });

    //Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
      });

      var infoWindow = new google.maps.InfoWindow({
          content: "Here I am!"
      });

      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
      });

    });


})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});