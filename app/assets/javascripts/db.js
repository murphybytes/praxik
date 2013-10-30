l = console.log;

var app = angular.module("LowaFieldsServices", ['ngResource']);
app.factory("Data", DB);

function DB($resource) {
    var options = {
    };

    var Doc = $resource("/account/fields/:id",
            {id: '@id'},
            {update: {method:'PUT', params:{}, isArray:false}});
             

    return Doc;
}
