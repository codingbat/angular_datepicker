'use strict';

/**
 * @ngdoc function
 * @name datepickerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the datepickerApp
 */
angular.module('datepickerApp')
  .controller('AppCtrl', function ($scope, $http) {
    $scope.selectedDates = [];
    $scope.identity = angular.identity;
    $scope.removeFromSelected = function(dt) {
      $scope.selectedDates.splice($scope.selectedDates.indexOf(dt), 1);
    };

    $scope.json = '';
    $scope.getJson = function() {
      var selectedDates = $scope.selectedDates.map(function(date) {
        return new Date(date);
      });
      $scope.json = angular.toJson(selectedDates, true);
    };

    // http://localhost:8182/api/leaves
    $scope.hello = {name: "Naz"};
    $scope.newName = "";
    $scope.sendPost = function() {
        var data = $.param({
            json: JSON.stringify({
              employeeId: 5,
              managerId: 1,
              leaveType: "holiday",
              dates : $scope.selectedDates
            })
        });
        $http.post("http://localhost:8182/api/leaves", data).success(function(data, status) {
            $scope.hello = data;
        });
    };

  });
