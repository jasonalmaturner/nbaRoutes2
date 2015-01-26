var app = angular.module('nbaRoutes');

app.controller('teamCtrl', function($scope, $routeParams, teamService, teamData){

$scope.teamData = teamData;
$scope.newGame = {};
$scope.showNewGameForm = false;

$scope.toggleNewGameForm = function(){
	$scope.showNewGameForm = !scope.showNewGameForm;
}

if($routeParams.team === '/teams/utahjazz') {
	$scope.homeTeam = 'Utah Jazz';
	$scope.logoPath = 'images/jazz-logo.png';
} else if($routeParams.team === '/teams/losangeleslakers'){
	$scope.homeTeam = 'Los Angeles Lakers';
	$scope.logoPath = 'images/lakers-logo.png';
} else if($routeParams.team === '/teams/miamiheat'){
	$scope.homeTeam = 'Miami Heat';
	$scope.logoPath = 'images/heat-logo'
}

$scope.submitGame = function(){
	$scope.newGame.homeTeam = $scope.homeTeam.split(' ').join('').toLowerCase();
	teamService.addNewGame($scope.newGame).then(function(res){
		teamService.getTeamData($scope.newGame.homeTeam).then(function(response){

		}, function(error){
			console.log(error);
		})
	}, function(err){
		console.log(err);
	})
}

});