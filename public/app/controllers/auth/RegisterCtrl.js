(function() {
  angular.module('dashboard').controller('RegisterCtrl', ['$scope','Account','Socket', function($scope,Account,Socket) {

    var vm = this;
    var _id = -1;

    vm.hidepasswordA = true;
    vm.hidepasswordB = true;
    vm.showA = true;
    vm.hideA = false;
    vm.showB = true;
    vm.hideB = false;
    vm.create = true;
    vm.sendSuccess = false;
    vm.sendDanger = false;
    vm.start = false;
    vm.err = false;
    vm.errDescription = "";

    vm.toggle = function(param){
      if(param==='showA'){
        vm.hidepasswordA = false;
        vm.showA = false;
        vm.hideA = true;
      }else{
        if(param==='hideA'){
          vm.hidepasswordA = true;
          vm.showA = true;
          vm.hideA = false;
        }else{
          if(param==='showB'){
            vm.hidepasswordB = false;
            vm.showB = false;
            vm.hideB = true;
          }else{
            vm.hidepasswordB = true;
            vm.showB = true;
            vm.hideB = false;
          }
        }
      }
    };

    vm.submit = function() {
      if(!$scope.RegisterForm.$invalid) {
        vm.start = true;
        Account.signup(vm.user.name,vm.user.email,vm.user.password).then(function(res){
          if(res.data){
            _id = res.data._id;
            vm.user._id = _id;
            vm.user.isActive = false;
            Socket.emit('admin add',vm.user);
          }
          vm.create = false;
          vm.start = false;
          vm.err = false;
        }).catch(function(err){
          vm.errDescription = err.data.error.description;
          vm.err = true;
          vm.start = false;
        });
      }
    };

    vm.close = function(code) {
      if(code==0)
        vm.sendSuccess = false;
      else
        if(code==1)
          vm.sendDanger = false;
        else
          vm.err = false;
    };

  }]);
}());
