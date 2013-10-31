l = console.log;

var app = angular.module("BackendServices", ['ngResource']);
app.factory("Field", Field);
app.factory("Operation", Operation);

function Field($resource) {
    var options = {
    };

    var Doc = $resource("/account/fields/:id",
            {id: '@id'},
            {update: {method:'PUT', params:{}, isArray:false}});
             

    return Doc;
}

function Operation($resource) {
    var options = {
    };

    var Doc = $resource("/account/operations/:id",
            {id: '@id'},
            {update: {method:'PUT', params:{}, isArray:false}});
             

    return Doc;
}
