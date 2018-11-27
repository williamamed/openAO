
angular.module('ruxApp')

        .controller("profileController", function ($scope, $http, $location,$routeParams,$templateCache) {
            $('[data-toggle="tooltip"]').tooltip();
            
            
            $scope.submitForm = function (isValid) {

                // check to make sure the form is completely valid
                if (isValid) {

                    //UIR.load.show('Configuring Raptor....')
                    $scope.user.token = Raptor.getToken();
                    
                    $http.post(Raptor.getRoute('/'+Raptor.rux.route+'/profile/profiledata'), $scope.user, {ignoreRequest: true})
                            .then(function (response) {
                                
                                Raptor.msg.info(response.data.msg)
                                //$location.path('/plataforma/configuracion')
                            }, function (response) {

                                Raptor.msg.error(response.data.msg)

                            })

                }

            };
            
            $scope.submitPassForm = function (isValid) {

                // check to make sure the form is completely valid
                if (isValid) {

                    //UIR.load.show('Configuring Raptor....')
                    $scope.userpass.token = Raptor.getToken();
                    
                    $http.post(Raptor.getRoute('/'+Raptor.rux.route+'/profile/changepass'), $scope.userpass, {ignoreRequest: true})
                            .then(function (response) {
                                if(response.data.cod==3)
                                    Raptor.msg.error(response.data.msg)
                                else
                                    Raptor.msg.info(response.data.msg)
                                //$location.path('/plataforma/configuracion')
                            }, function (response) {

                                Raptor.msg.error(response.data.msg)

                            })

                }

            };
        });


