(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService, $location) {
        var vm = this;
        //console.log("HELLO");
        vm.register = register;


        function register(newUser) {
            //console.log(newUser);
            if ( !newUser || ! newUser.password || ! newUser.username || ! newUser.rpassword){
                vm.error = "Please fill in all the blanks";
            }
            else if (newUser.password != newUser.rpassword)  {
                vm.error = "Two Passwords are not same";
            } else {
                var user = UserService.registerUser(newUser);
                if (user == null) {
                    vm.error = "unable to register, username already exists";
                } else {
                    vm.message = "user successfully registered";
                    $location.url('/login');
                }
            }
        };
    }
})();
