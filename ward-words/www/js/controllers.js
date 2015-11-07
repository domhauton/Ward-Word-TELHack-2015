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

  .controller('ScenarioInfo', function ($scope, $http, $stateParams, $window) {

    $scope.media = null;

    $scope.model = {
      showDelete: false,
      showMove: false,
      sounds: [
        {
          'title': 'Cow',
          'image': 'img/animals/cow-icon.png',
          'desc': 'Mooo',
          'file': '/sounds/cow.mp3'
        }
      ]
    };

    $scope.play = function (sound) {

      if ($scope.media) {
        $scope.media.pause();
      }
      console.log("I was here 1")
      if ($window.cordova) {
        console.log("Play called on device");
        ionic.Platform.ready(function () {

          var src = sound.file;
          if (ionic.Platform.is('android')) {
            src = '/android_asset/www/' + src;
          }
          $scope.media = new $window.Media(src);
          $scope.media.play();
        });
      } else {
        $scope.media = new Audio();
        $scope.media.src = sound.file;
        $scope.media.load();
        $scope.media.play();
      }
    };
  });
