angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/scenarioFinder.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });
  })

  .controller('ScenarioFinder', function ($scope, $http) {
    $http.get('https://sheetsu.com/apis/6cc29636').then(function (resp) {
      $scope.playlists = resp.data.result;
      // For JSON responses, resp.data contains the result
    }, function (err) {
      console.error('ERR', err);
    })
  })

  .controller('ScenarioInfo', function ($scope, $http, $stateParams, $window, $sce) {

    $scope.media = null;

    $scope.model = {
      showDelete: false,
      showMove: false,
      sounds: [
        {
          'title': 'balloon',
          'image': 'img/animals/cow-icon.png',
          'desc': 'Electric heart diagram',
        }
      ]
    };

    $scope.getSoundUri = function(name){
      var foo = "https://ssl.gstatic.com/dictionary/static/sounds/de/0/" + name + ".mp3";
      console.log(foo);
      return $sce.trustAsResourceUrl(foo);
    };
  });
