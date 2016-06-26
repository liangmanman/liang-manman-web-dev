/**
 * Created by liangmanman1 on 6/22/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/homepage", {
                templateUrl: "homepage.html"
        })
            //1 √
            .when("/login", {
                templateUrl: "views/user/login.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            //2 √
            .when("/register", {
                templateUrl: "views/user/register.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            //3 √
            .when("/profile/:userId", {
                templateUrl: "views/user/profile.html",
                controller: "ProfileController",
                controllerAs: "model",

                resolve: {
                    loggedin: checkLoggedin
                }
            })

            //4.1 √
            .when("/user/:userId/shares", {
                templateUrl: "views/shares/sharesList.html",
                controller: "shareListController",
                controllerAs: "model"
            })
            //4.2 √
            .when("/user/:userId/shares/new", {
                templateUrl: "views/shares/shareNew.html",
                controller: "shareNewController",
                controllerAs: "model"
            })
            //4.3 √
            .when("/user/:userId/shares/:type/:shareId/edit", {
                templateUrl: "views/shares/shareEdit.html",
                controller: "shareEditController",
                controllerAs: "model"
            })
            //5.1 √
            .when("/user/:userId/likes", {
                templateUrl: "views/likes/likesList.html",
                controller: "likesListController",
                controllerAs: "model"
            })
            //5.2 √
            .when("/user/:userId/likes/:type/:likeId/information", {
                templateUrl: "views/likes/likeInformation.html",
                controller: "likeInformationController",
                controllerAs: "model"
            })
            //6 √
            .when("/user/:userId/findAll", {
                templateUrl: "views/mainView/AllShares.html",
                controller: "findAllController",
                controllerAs: "model"
            })
            //7 √
            .when("/guest", {
                templateUrl: "views/mainView/AllShares.html",
                controller: "findAllController",
                controllerAs: "model"
            })
        
        ;

        function checkLoggedin(UserService, $q, $location, $rootScope) {

            var deferred = $q.defer();

            UserService
                .checkLoggedin()
                .then(
                    function(response) {
                        var user = response.data;
                        console.log(user);
                        if(user == '0') {
                            deferred.reject();
                            $rootScope.currentUser = null;
                            $location.url("/login")
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function(err) {
                        console.log(err);
                        $rootScope.currentUser = null;
                        deferred.reject();
                    }
                );

            return deferred.promise;
        }


    }
})();
