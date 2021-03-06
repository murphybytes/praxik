function MyFieldsCtrl($scope, Field) {
    $scope.docs = Field.query();
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


function EditFieldCtrl($scope, $routeParams, $http, $interval, Field, Operation) {
   var timer = $interval(saveDoc, 2000);
   var fieldChanged = false;

   $scope.data = GlobalData;

   Operation.query(function(coll) {
       $scope.associatedFeedingOperations = [];
       var data = [];

       for(var i in coll) {
           var doc = coll[i];
           if (doc && doc.data) {
             data.push(doc.data.name);
           }
       }

       $scope.associatedFeedingOperations = data;
   });

   $scope.action = "Edit";
   $scope.rField = Field.get({"id": $routeParams.id}, function(doc) {
     $scope.doc = doc.data;
     $scope.doc.id = doc.id;

     if (!$scope.doc.plans) {
       $scope.doc.plans = [{}, {}, {}, {}];
     }
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

function NewFieldCtrl($scope, $http, $interval, Field, Operation) {
   var timer = $interval(saveDoc, 2000);
   var fieldChanged = false;

   $scope.data = GlobalData;
   Operation.query(function(coll) {
       $scope.associatedFeedingOperations = [];
       var data = [];

       for(var i in coll) {
           var doc = coll[i];
           if (doc && doc.data) {
             data.push(doc.data.name);
           }
       }

       $scope.associatedFeedingOperations = data;
   });

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


