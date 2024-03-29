/**
 * Created by liangmanman1 on 5/26/16.
 */
(function()  {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername:findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            register: register,
            checkLoggedin: checkLoggedin,
            getAllUsers: getAllUsers
        };
        return api;
        
        function getAllUsers() {
            return $http.get("/api/admin/allUsers");
        }

        function checkLoggedin() {
            return $http.get("/api/loggedin");
        }

        function register(username, password) {
            var newUser = {
                username: username,
                password: password
            };
            return $http.post("/api/register", newUser);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login", user);
        }

        function createUser(username, password) {
            var url = "/api/user";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&&password=" + password;
            return $http.get(url);
        }

        function findUserById(id) {
            var url = "/api/user/"+id;
            return $http.get(url);

        }

        function updateUser(id, newUser) {
            var url = "/api/user/" + id;
            return $http.put(url, newUser);

        }

        function deleteUser(id) {
            var url = "/api/user/" + id;
            return $http.delete(url);
        }



    }
})();