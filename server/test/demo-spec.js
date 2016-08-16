var should = require("should");
describe('Should test', function() {
    it('number', function() {
        (123).should.be.a.Number;
    });
    it('object property', function() {
        var obj = {name:'minghe',email:"minghe36@gmail.com"};
        obj.should.have.property('name','minghe');
        obj.should.have.property('email');
    });
});