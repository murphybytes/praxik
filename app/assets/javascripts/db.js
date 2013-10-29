l = console.log;

var app = angular.module("LowaFieldsServices", ['ngResource']);
app.factory("Data", DB);

function DB($resource) {
    var options = {
    };

    var Doc = $resource("/account/fields/:id");

    return Doc;
}
