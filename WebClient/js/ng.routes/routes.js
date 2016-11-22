var app=angular.module("projet",["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "../view/societe.html",
		controller : "societeCntrl"
    })
    .when("/rtview",
    {
        templateUrl : "../view/realtime.html",
         controller : "RTClient"
    })
    .when("/ordre", {
        templateUrl : "../view/ordre.html",
        controller : "ordreCntrl"
    })
	.otherwise("/");
});