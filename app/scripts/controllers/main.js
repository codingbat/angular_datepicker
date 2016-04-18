'use strict';

/**
* @ngdoc function
* @name datepickerApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the datepickerApp
*/
angular.module('datepickerApp')
  .controller('AppCtrl', function ($scope, $http, $filter) {

    // Leave class
    class Leave {
      constructor (employeeId, managerId, leaveType, dates) {
        this.employeeId = employeeId;
        this.managerId = managerId;
        this.leaveType = leaveType;
        this.dates = dates;
      }
    };

    // LeaveDate class
    class LeaveDate {
      constructor (date, duration) {
        this.date = date;
        this.duration = duration;
      }
    };

    // get selected dates
    $scope.selectedDates = [];
    $scope.identity = angular.identity;
    $scope.removeFromSelected = function(dt) {
      $scope.selectedDates.splice($scope.selectedDates.indexOf(dt), 1);
    };

    // display json output of the selected dates
    $scope.json = '';
    $scope.getJson = function() {
      var selectedDates = $scope.selectedDates.map(function(date) {
        return new Date(date);
      });
      $scope.json = angular.toJson(selectedDates, true);
    };

    // generate leave dates
    $scope.dates = function(selectedDates) {
      var leaveDates = [];
      angular.forEach(selectedDates, function(value) {
        var date = $filter('date')(new Date(value),'yyyy-MM-dd');
        var leaveDate = new LeaveDate(date , "FULL_DAY");
        leaveDates.push(leaveDate);
      });
      return leaveDates;
    };

    // CRUD
    // http://localhost:8182/api/leaves
    $scope.postLeave = '';
    $scope.postStatus = '';
    $scope.sendPost = function() {
        var data = new Leave(5, 4, "holiday", $scope.dates($scope.selectedDates));
        $scope.postLeave = angular.toJson(data, true);
        $http.post("http://localhost:8182/api/leaves", $scope.postLeave).success(function(data, status) {
          $scope.postLeave = data;
          $scope.postStatus = status;
        });
    };

    $scope.getAllLeaves = '';
    $scope.getStatus = '';
    $scope.getAll = function() {
        $http.get("http://localhost:8182/api/leaves").success(function(data, status) {
          $scope.getAllLeaves = data;
          $scope.getStatus = status;
        });
    };

  });
