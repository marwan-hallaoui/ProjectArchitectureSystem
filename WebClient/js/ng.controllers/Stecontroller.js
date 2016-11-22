
app.controller("societeCntrl", function ($scope, $http) {
	$scope.societe = [];
	$scope.SERVICE_URL = "http://127.0.0.1:8080/rest";

	console.log('societe  contoroller initialized');
	$scope.motCle = null;
	$scope.pageCourante = 0;


	// Getting all societe -- Read All
	$scope.charger = function () {
		//	$http.get("http://localhost:8080/produits/produitsParMC?mc="+$scope.motCle+"&page="+$scope.pageCourante)
		$http.get($scope.SERVICE_URL+"/societe/" + $scope.pageCourante)
			.success(function (data) {
				$scope.societe = data.content;
				$scope.pages = new Array(data.totalPages);
			});
	};


	// Function for adding a new Societe
	$scope.add = function () {
		//	$http.get("http://localhost:8080/produits/produitsParMC?mc="+$scope.motCle+"&page="+$scope.pageCourante)
		$http.put($scope.SERVICE_URL+"/societe?code=" + $scope.codeent + "&nom=" + $scope.noment)
			.success(function (data) {
				$scope.societe = data;
				$scope.codeent = "";
				$scope.noment = "";

				console.log("From Post " + data);
				// $scope.pages=new Array(data.length);
			});
		$scope.clear();
		setTimeout(function () {
			$scope.charger();
		}, 300);

	};

	// Function for deleting a specific Societe
	$scope.deleteSte = function (code) {

		console.log("Code Ste a supprimer " + code);
		$http(
			{
				method: "DELETE",
				url: $scope.SERVICE_URL + "/societe/" + code
			}).then(function success(response) {
				console.log("Deleting is successufly achieved" + response.data);
				$scope.gotoPage(0);
			}, function Error(response) {
				$scope.statut = response.statusText;
				console.log("Error in delete some Order Staut Error" + $scope.statut);
			});

	};


	$scope.clear = function () {

		$scope.codeent = "";
		$scope.noment = "";

	};

	$scope.gotoPage = function (p) {
		$scope.pageCourante = p;
		$scope.charger();
	};

	$scope.charger();
});


