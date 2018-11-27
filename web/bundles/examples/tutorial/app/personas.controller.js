
angular.module('appTutorial')

        .controller("PersonasCtrl", function ($scope, $http, $location, $mdToast) {
            //$scope.msg = "I love London";
            $scope.showCustomToast=function(){
                $mdToast.show({
                    hideDelay   : 3000,
                    position    : 'bottom right',
                    template : `
  
<md-toast>
  <span class="md-toast-text" flex>Custom toast!</span>
  <md-button class="md-highlight" ng-click="openMoreInfo($event)">
    More info
  </md-button>
  <md-button ng-click="closeToast()">
    Close
  </md-button>
</md-toast>
                    `
                  });
            }
            

        });

