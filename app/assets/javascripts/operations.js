function MyOperationsCtrl($scope, Operation) {
    $scope.docs = Operation.query();
}

function EditOperationCtrl($scope, $routeParams, $http, $interval, Operation) {
   var timer = $interval(saveDoc, 3000);
   var docChanged = false;

   $scope.action = "Edit";
   $scope.rOperation = Operation.get({"id": $routeParams.id}, function(doc) {
     $scope.doc = doc.data;
   });
   $scope.$watch('doc', function (value) { docChanged = true; }, true);

   function saveDoc() {
       if (docChanged) {
           docChanged = false;

           $scope.rOperation.data = $scope.doc;
           $scope.rOperation.$update();
       }
   };

   $scope.$on("$destroy", function() {
       if (timer) {
           $interval.cancel(timer);
       }
   });
}

function NewOperationCtrl($scope, $http, $interval, Operation) {
   var timer = $interval(saveDoc, 3000);
   var docChanged = false;

   $scope.action = "Add";
   $scope.rOperation = new Operation();
   $scope.doc = {plans: [{}, {}, {}, {}]};
   $scope.$watch("doc", function (value) { docChanged = true; }, true);

   function saveDoc() {
       if (docChanged) {
           docChanged = false;
            
           $scope.rOperation.data = $scope.doc;
           if ($scope.rOperation.id) {
             $scope.rOperation.$update();
           } else {
             $scope.rOperation.$save();
           }
       }
   };

   $scope.$on("$destroy", function() {
       if (timer) {
           $interval.cancel(timer);
       }
   });
}


