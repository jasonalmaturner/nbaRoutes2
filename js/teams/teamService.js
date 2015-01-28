var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q){

this.addNewGame = function(gameObject){
	var url = "https://api.parse.com/1/classes/" + gameObject.homeTeam;
	if(parseInt(gameObject.homeTeamScore) > parseInt(gameObject.opponentScore)){
		gameObject.won = true;
	} else {
		gameObject.won = false;
	};
	return $http({
		method: 'POST',
		url: url,
		data: gameObject
	})
};

this.getTeamData = function(team) {
	var deferred = $q.defer();
	var url = 'https://api.parse.com/1/classes/' + team;
	$http({
		method: 'GET',
		url: url
	}).then(function(res){
		var results = res.data.results;
		var wins = 0;
		var losses = 0;
		for(var i = 0; i < results.length; i++){
			if(results[i].won === true){
				wins++;
			} else {
				losses++;
			}
		}
		results['wins'] = wins;
		results['losses'] = losses;
		deferred.resolve(results);
	}, function(err){
		deferred.reject(err);
	})
	return deferred.promise;
}

});