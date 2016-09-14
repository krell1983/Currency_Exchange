var App = angular.module('Currency_Exchange', []);

App.controller('Currency_Exchange_Controller', function ($scope, $http) {

//** Load Yahoo API Data **
    $scope.Load_New_Data = function () {

        $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22" + $scope.Select_Currency_1 + $scope.Select_Currency_2 + "%22%2C%20%22" + $scope.Select_Currency_2 + $scope.Select_Currency_1 + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=")
                .then(function (response) {
                    $scope.CurrencyExcange = response.data.query.results.rate;

                    $scope.Currency_Excange_Rate_1 = $scope.CurrencyExcange[0].Rate;
                    $scope.Currency_Excange_Rate_2 = $scope.CurrencyExcange[1].Rate;

                    $scope.calculate_currency(1);

                }, function (response) {
                 
                });


    };


//** Currency Calculator **
    $scope.calculate_currency = function (select_imput) {

        if (select_imput === 1) {
            $scope.Currency_Imput_2 = Math.round($scope.Currency_Imput_1 * $scope.Currency_Excange_Rate_1 * 100) / 100;
        }

        if (select_imput === 2) {
            $scope.Currency_Imput_1 = Math.round($scope.Currency_Imput_2 * $scope.Currency_Excange_Rate_2 * 100) / 100;
        }


    };


    $http.get("currency-list.json")
            .then(function (response) {
                $scope.currency_list = response.data;
            });

    $scope.Load_New_Data();

});
