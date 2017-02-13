(function(){
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);
    
    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            if (user && user.username && user.password) {
                var loginUser = UserService.findUserByCredentials(user.username, user.password);
                if (loginUser != null) {
                    $location.url('/user/' + loginUser._id);
                } else {
                    vm.error = 'user not found';
                }
            } else {
                vm.error = 'Please fill in all blanks';
            }
        }
    }
})();