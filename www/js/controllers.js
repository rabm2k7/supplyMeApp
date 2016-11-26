angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaGeolocation, $http) {


  var options = {
    timeout: 10000,
    enableHighAccuracy: true
  };

  $cordovaGeolocation.getCurrentPosition(options).then(function(position) {

    $http.get("data/airbnb.json")
      .then(function(response) {

        $scope.geoloc = response.data;

        console.log($scope.geoloc);

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        // Display multiple markers on a map
        var infoWindow = new google.maps.InfoWindow(),
          marker, i;

        // Loop through our array of markers & place each one on the map
        for (i = 0; i < 500; i++) {
          var position = new google.maps.LatLng($scope.geoloc[i].latitude, $scope.geoloc[i].longitude);
          bounds.extend(position);
          marker = new google.maps.Marker({
            position: position,
            map: $scope.map
          });

          // Allow each marker to have an info window
          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infoWindow.setContent(infoWindowContent[i][0]);
              infoWindow.open($scope.map, marker);
            }
          })(marker, i));

          // Automatically center the map fitting all markers on the screen
          $scope.map.fitBounds(bounds);
        }

        // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
        var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
          this.setZoom(14);
          google.maps.event.removeListener(boundsListener);
        });


      }, function(error) {
        console.log("Could not get location");
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
