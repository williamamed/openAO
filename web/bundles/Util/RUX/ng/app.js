var app = angular.module('ruxApp', ['ngRoute', 'ngMaterial']);
app.config(function($routeProvider, $locationProvider, $httpProvider) {


    $httpProvider.interceptors.push(function($q, $location) {
        return {
            'request': function(config) {

                config.headers['X-Requested-With'] = 'XMLHttpRequest'
                UIR.load.show('Cargando....')
                return config;
            },
            'responseError': function(rejection) {

                UIR.load.hide()
                if (!rejection.config.ignoreRequest && rejection.status == 404)
                    $location.path('/404')
                if (!rejection.config.ignoreRequest && rejection.status == 401) {
                    UIR.load.show('Autenticación detectada, redireccionando....')
                    window.location.href = Raptor.getRoute('/syntarsus/login?redirect=' + window.encodeURIComponent(document.URL))
                    return;
                }

                return $q.reject(rejection);
            },
            'response': function(response) {
                // same as above
                UIR.load.hide()
                return response;
            }
        };
    });

    $routeProvider
            .when('/',{redirectTo: '/e/'+Raptor.rux.route+'/home/description'})
            .when("/e/:path*", {
                templateUrl: function(params) {
                    return Raptor.getRoute("/" + params.path )+ "?t=" + Date.now()
                },
                controller: "EmbededController"
            })
            .when("/f/:path*", {
                template:  '<div style="width: 100%;height:{{size}}px">'+
                                '<iframe class="frame-rux" style="width: 100%;height: 100%;border: none;"></iframe>'+
                           '</div>',
                controller: "FrameController"
            })
            .when('/404', {
                template: "<h1>404</h1><p class='text-center'>La pagina solicitada no existe</p>"
            })
            .otherwise({redirectTo: '/404'});


});

app.controller('FrameController', function($scope, $mdSidenav, $routeParams) {
    $('.frame-rux').load(function(){
        UIR.load.hide()
    })
    UIR.load.show("Cargando...")
    $('.frame-rux').attr('src',Raptor.getRoute("/"+$routeParams.path))
    $scope.size=$('body').height()-40
});

app.controller('EmbededController', function($scope, $mdSidenav) {


});

app.controller('MyController', function($scope, $mdSidenav) {
    $('.nav-sidebar a.nav-link').each(function(){
        if($(this).hasClass('rux-embedded'))
            $(this).attr("href",'#!/e'+$(this).attr("route"))
        else
            $(this).attr("href",'#!/f'+$(this).attr("route"))
    })

});


