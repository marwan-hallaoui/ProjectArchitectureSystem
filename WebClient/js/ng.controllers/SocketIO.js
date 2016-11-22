app.controller("RTClient",function($http,$scope){

 $scope.SERVICE_URL = "http://127.0.0.1:8080/rest";
 $scope.URL_SOCKET_SERVER = 'http://localhost:3000';
 $scope.ordres = [];
 $scope.societe = [];

console.log('Real time controller is loaded');
 var socket = io.connect( $scope.URL_SOCKET_SERVER , {reconnect: false});




    	$scope.load_societe = function () {
		$http.get($scope.SERVICE_URL + "/societe")
			.success(function (data) {
				$scope.societe = data;
			});
	}
$scope.load_societe ();

	$scope.IdSteBynom = function (nomSte) {

		var result = false;

		for (var i = 0; i < $scope.societe.length; i++) {
			if ($scope.societe[i].nom == nomSte) {
				result = $scope.societe[i].code;
			}
		}

		return result;
	}


$scope.findBySte = function () {
		$scope.SteId = $scope.IdSteBynom($scope.nom_ent);
        console.log("Mapped ID is "+ $scope.SteId);
		if ($scope.nom_ent == undefined || $scope.nom_ent == "" || $scope.SteId == false) {
			$scope.ordres = [];
			$scope.load_societe ();
            socket.emit('update_all');

		} else {
socket.emit('update_specific',$scope.SteId);

		}
	};


// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected to the server ');
         
});



socket.on('update', function (data) {

   $scope.ordres =  JSON.parse( data );
    console.log('Update data tab  ' +  $scope.ordres[0].num +' --- '+   $scope.ordres);
   $scope.$apply()
});





//socket.emit('first_connection', 'me');

});