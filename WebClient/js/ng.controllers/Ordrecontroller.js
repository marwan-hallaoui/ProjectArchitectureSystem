
app.controller("ordreCntrl", function ($scope, $http) {
	$scope.SERVICE_URL = "http://127.0.0.1:8080/rest";

	console.log('Ordre  contoroller initialized');
	// Ajax obtenir des codes societe

	$scope.ordres = [];
	$scope.pagecourante = 0;
	$scope.societe = [];
	// Load Function
	$scope.load = function (page) {
		$scope.pagecourante = page;
		$http.get($scope.SERVICE_URL + "/ordre/" + $scope.pagecourante)
			.success(function (data) {
				$scope.ordres = data.content;
				$scope.pages = new Array(data.totalPages);
				console.log('Ordres --- ' + data);
			});

	}
	// iNSERT FUNCTION
	$scope.addOrdre = function () {
		$scope.debug();
		$scope.SteId = $scope.IdSteBynom($scope.codeSte);
		console.log("Nom :" + $scope.codeSte + " Id" + $scope.SteId);

		$http.
			put($scope.SERVICE_URL + "/ordre?prix=" + $scope.prix + "&nb_action=" + $scope.nb_action + "&type=" + $scope.type + "&prop=" + $scope.SteId) //+$scope.nb_action+"&prix="+$scope.prix+"&type="+$scope.type+"&prop="+$scope.codeSte
			.success(function (data) {
				console.log('From insert ' + data);
				$scope.clear();
				$scope.load(0);
			var lis =	$document.getElementsById("ordre_success");
			console.log("Get class ordre_classs"+lis.length);
			});
	};
	// Debug iNFORMATION show
	$scope.debug = function () {

		console.log(' prix = ' + $scope.prix);
		console.log(' type vnete = ' + $scope.type_vente);
		console.log(' type achat ' + $scope.type_achat);
		$scope.type = $scope.type_achat || $scope.type_vente;
		console.log(' Result ' + $scope.type);
		console.log(' nbr actions' + $scope.nb_action);
		console.log(' Code Ste = ' + $scope.codeSte);

	};


	// Load society liste  getting 

	$scope.load_societe = function () {
		$http.get($scope.SERVICE_URL + "/societe")
			.success(function (data) {
				$scope.societe = data;
			});
	}


	// Form Clear Function
	$scope.clear = function () {

		$scope.prix = "";
		$scope.type_vente = "";
		$scope.type_achat = "";
		$scope.codeSte = "";
		$scope.nb_action = "";
	};

	// Find ordreS  By entreprise function

	$scope.findBySte = function () {
		$scope.SteId = $scope.IdSteBynom($scope.nom_ent);
		if ($scope.nom_ent == undefined || $scope.nom_ent == "" || $scope.SteId == false) {
			$scope.ordres = [];
			$scope.pagecourante = 0;
			$scope.load($scope.pagecourante);
		} else {

			$http.get($scope.SERVICE_URL + "/societe/" + $scope.SteId + "/ordres")
				.success(function (data) {

					$scope.ordres = data;
					$scope.pages = new Array(1);
				});
		}



	};


	$scope.IdSteBynom = function (nomSte) {

		var result = false;

		for (var i = 0; i < $scope.societe.length; i++) {
			if ($scope.societe[i].nom == nomSte) {
				result = $scope.societe[i].code;
			}
		}

		return result;
	}
// Function for deleting a specific Order
  $scope.deleteOrdre = function(code){

	  console.log("Code ordre a supprimer "+ code);
	  $http(
		  {
        method : "DELETE",
        url : $scope.SERVICE_URL+"/ordre/"+code
    }).then(function success(response){
 	console.log("Deleting is successufly achieved"+response.data);
	 	$scope.load(0);
	}, function Error(response){
    $scope.statut= response.statusText;
	console.log("Error in delete some Order Staut Error"+$scope.statut);
	});

  };

  $scope.updateOrdre = function(code){

	  console.log("Code ordre a mettre a jour "+ code);
  }


	$scope.load($scope.pagecourante);
	$scope.load_societe();

});

