(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService, $location) {
        var vm = this;
        vm.registerUser = registerUser;

        function registerUser(user) {
            UserService
                .findUserByUsername(user.username)
                .success(function (returnUser) {
                    console.log(returnUser);
                    if (returnUser != []) {
                        vm.error = "sorry that username is taken";
                    } else {
                        UserService
                            .createUser(user)
                            .success(function (user) {
                                $location.url('/user/' + user._id);
                            })
                            .error(function () {
                                vm.error = 'sorry could not register';
                            });
                    }
                })
                .error(function(){
                    vm.error =  'sorry could not register';
                });
        }
    }
})();