function MyOperationsCtrl($scope, Operation) {
    $scope.docs = Operation.query();
    $scope.drop = function(i, doc) {
        $scope.docs.splice(i, 1);
        doc.$delete(function() {
            $scope.message = {
                type: "success",
                text: "Was deleted",
                visible: true 
            };
        });
    }
}

function EditOperationCtrl($scope, $routeParams, $http, $interval, Operation) {
   var timer = $interval(saveDoc, 2000);
   var docChanged = false;

   $scope.initialConstructionDateShow = function() {
       if ($scope.doc && $scope.doc.feedingOperationParameters) {
         var show = $scope.doc.feedingOperationParameters.MMP == "Existing operation, expanding";
         return show;
       }
   }

   $scope.action = "Edit";
   $scope.rOperation = Operation.get({"id": $routeParams.id}, function(doc) {
     $scope.doc = doc.data;
     $scope.doc.id = doc.id;

     $scope.doc.state = "Iowa";
   });
   $scope.original = $scope.rOperation;
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
   var timer = $interval(saveDoc, 2000);
   var docChanged = false;

   $scope.action = "Add";
   $scope.rOperation = new Operation();
   $scope.original = $scope.rOperation;
   $scope.doc = {plans: [{}, {}, {}, {}]};
   $scope.doc.state = "Iowa";
   $scope.$watch("doc", function (value) { docChanged = true; }, true);

   $scope.initialConstructionDateShow = function() {
       if ($scope.doc && $scope.doc.feedingOperationParameters) {
           var show = $scope.doc.feedingOperationParameters.MMP == "Existing operation, expanding";
           return show;
       }
   }

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


