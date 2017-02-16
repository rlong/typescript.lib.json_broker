/**
 * Created by rlong on 13/03/2016.
 */

/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../json_broker.ts" />
/// <reference path="../json_broker.angular1.ts" />
/// <reference path="service.test.ts" />



import BrokerMessage = json_broker.BrokerMessage;


class ViewController {


    proxy: test.Proxy;
    $scope: angular.IScope;

    constructor( $http: angular.IHttpService, $q: angular.IQService, $scope: angular.IScope ) {

        let adapter = json_broker.angular1.buildBrokerAdapter( $http, $q );
        this.proxy = new test.Proxy(adapter);
        this.$scope = $scope;
    }


    ping() {

        console.log( arguments );
        this.proxy.ping().then(
            (response ) => { // successCallback

                if(!this.$scope.$$phase) {
                    console.warn( "!this.$scope.$$phase" );
                }
                console.log( response );

            }
            , (response ) => { // errorCallback
                console.error( response );
            }
        )
    }

}


var mcRemote= angular.module('service.test', []);

mcRemote.controller('index', ["$http", "$q", "$scope", function ($http: angular.IHttpService, $q: angular.IQService, $scope) {


    $scope.variable = "hey hey (from angular)";

    $scope.viewController = new ViewController( $http, $q, $scope );
    $scope.viewController.ping();


}]);

