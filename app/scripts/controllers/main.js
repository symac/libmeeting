'use strict';


angular.module('libmeetingApp').controller('compteur', function($scope, catsInfos)
{
	$('#summary').hide();
	$scope.catsInfos = catsInfos;
	$scope.timerRunning = false;
	$scope.timerPause = false;

	$scope.users = [];
	$scope.stats = [];
	$scope.stats.A = 0;
	$scope.stats.B = 0;
	$scope.stats.C = 0;

	$scope.addUser = function (type)
	{
		$scope.users.push({type: type, color : catsInfos[type].color});
		$scope.stats[type] = $scope.stats[type] + 1;
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
		
		$scope.totalCost = cost;
		if (cost !== 0)
		{
			$('#summary').show();
		}

		$('#meetingCost').html(cost.toFixed(2) + ' €');
		$('#meetingDuration').html($('#myTimer').html());
	});
}
);