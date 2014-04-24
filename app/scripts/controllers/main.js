'use strict';


angular.module('libmeetingApp').controller('compteur', function($scope, catsInfos)
{
	$scope.catsInfos = catsInfos;
	$scope.timerRunning = false;
	$scope.timerPause = false;

	$scope.users = [];
	$scope.stats = [];
	$scope.stats.A = 0;
	$scope.stats.B = 0;
	$scope.stats.C = 0;

	$scope.totalCost = '0.00';
	$scope.meetingDuration = '';

	$scope.addUser = function (type)
	{
		$scope.users.push({type: type, color : catsInfos[type].color});
		$scope.stats[type] = $scope.stats[type] + 1;
	};

	$scope.removeUser = function (index)
	{
		$scope.stats[$scope.users[index].type] = $scope.stats[$scope.users[index].type] - 1;
		$scope.users.splice(index, 1);
	};

	$scope.razTimer = function()
	{
		$scope.users = [];
		$scope.stats.A = 0;
		$scope.stats.B = 0;
		$scope.stats.C = 0;
		$scope.$broadcast('timer-stop');
		$scope.timerRunning = false;
	};

	$scope.startTimer = function (){
		if ($scope.timerPause)
		{
			$scope.$broadcast('timer-resume');
			$scope.timerPause = false;
		}
		else
		{
			$scope.$broadcast('timer-start');
			$scope.timerRunning = true;
		}
	};

	$scope.pauseTimer = function (){
		$scope.$broadcast('timer-stop');
		$scope.timerPause = true;
	};

	$scope.$on('timer-tick', function (event, args) {
		if ($scope.timerPause)
		{
			return;
		}

		// Ici on a le compteur en millisecondes
		var cost = $scope.stats.A * (((args.millis / 1000) * $scope.catsInfos.A.price) / 547200);
		cost += $scope.stats.B * (((args.millis / 1000) * $scope.catsInfos.B.price) / 547200);
		cost += $scope.stats.C * (((args.millis / 1000) * $scope.catsInfos.C.price) / 547200);
		
		// Solution trouvée sur http://stackoverflow.com/a/18634375 pour éviter un warning au premier appel
		if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
			$scope.$apply(function() {
				$scope.totalCost = cost.toFixed(2) + ' €';
			});
		}
		else
		{
			$scope.totalCost = cost.toFixed(2) + ' €';
		}

//		$('#meetingDuration').html($('#myTimer').html());
	});
}
);