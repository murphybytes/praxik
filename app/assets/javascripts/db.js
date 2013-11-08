l = console.log;

var app = angular.module("BackendServices", ['ngResource']);
app.factory("Field", Field);
app.factory("Operation", Operation);
app.factory("Profile", Profile);

function Profile($resource) {
    var options = {
    };

    var Doc = $resource("/account/profile", {}, {
                  update: {method:'PUT', params:{}, isArray:false},
                  updatePassword: {url: "account/update_password",method:'PUT', params:{}, isArray:false}
              });
             

    return Doc;
}

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
