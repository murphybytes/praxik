function MyFieldsCtrl($scope, Field) {
    $scope.docs = Field.query();
}

function EditFieldCtrl($scope, $routeParams, $http, $interval, Field) {
   var timer = $interval(saveDoc, 3000);
   var fieldChanged = false;

   $scope.action = "Edit";
   $scope.rField = Field.get({"id": $routeParams.id}, function(doc) {
     $scope.doc = doc.data;
   });
   $scope.$watch('doc', function (value) { fieldChanged = true; }, true);

   function saveDoc() {
       if (fieldChanged) {
           fieldChanged = false;

           $scope.rField.data = $scope.doc;
           $scope.rField.$update();
       }
   };

   $scope.$on("$destroy", function() {
       if (timer) {
           $interval.cancel(timer);
       }
   });
}

function NewFieldCtrl($scope, $http, $interval, Field) {
   var timer = $interval(saveDoc, 3000);
   var fieldChanged = false;

   $scope.action = "Add";
   $scope.rField = new Field();
   $scope.doc = {plans: [{}, {}, {}, {}]};
   $scope.$watch("doc", function (value) { fieldChanged = true; }, true);

   function saveDoc() {
       if (fieldChanged) {
           fieldChanged = false;
            
           $scope.rField.data = $scope.doc;
           if ($scope.rField.id) {
             $scope.rField.$update();
           } else {
             $scope.rField.$save();
           }
       }
   };

   $scope.$on("$destroy", function() {
       if (timer) {
           $interval.cancel(timer);
       }
   });
}


