describe("registerctrl", function() {
    var scope;
    beforeEach(module("starter"));
    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      $controller('registerctrl', {$scope: scope});
    }));

    it("check if username and password is empty", function() {
        scope.testfunction("","");
        expect(scope.result).toEqual("username and password can not be empty");
        });

    it("check if password is empty", function() {
        scope.testfunction("harish","");
        expect(scope.result).toEqual("username and password can not be empty");
        });
    
    it("check if username starts with number", function() {
        scope.testfunction("1harish","qwerty");
        expect(scope.result).toEqual("username cannot start with number");
        });
  
  });



  

