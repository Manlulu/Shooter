var canvas = document.getElementById("game_board");
var context = canvas.getContext("2d");
context.fillStyle = "#456";
context.fillRect(0, 0, canvas.width, canvas.height);

var MYAPP = MYAPP || {};

MYAPP.commonMethods = {
    firstName: "",
    phoneNr: "",

    validateName: function(name){
        this.firstName = "abc" + name;
    },

    validateNr: function(nr){
        this.phoneNr = 123 + "" + nr;
    }
};

MYAPP.event = {
    addListener: function(el, type, fn){
        console.log("Adding listener");
        return fn("qqqq");
    },

    removeListener: function(el, type, fn){
        console.log("Removing listener");
    },

    getEvent: function(e){
        console.log("Getting event");
    }
};

MYAPP.event.addListener("Your_el", "Your_type", callback);

function callback(a){
    console.log(a + "asdf");
}
var glob = "hello";

var Person = function(firstName){
    this.firstName = firstName;
};

Person.prototype.walk = function(){
    console.log("Im walking");
};

Person.prototype.sayHello = function() {
    console.log("Hello, Im " + this.firstName);
};

function Student(firstName, subject){
    Person.call(this, firstName);

    this.subject = subject;
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.constructor = Student;

Student.prototype.sayHello = function(){
    console.log("Hello, Im " + this.firstName + ". Im studying " + this.subject + ".");
};

Student.prototype.sayGoodBye = function() {
    console.log("GoodBye!");
};

var student1 = new Student("Kim", "Norsk");

student1.sayHello();
student1.walk();
student1.sayGoodBye();

console.log(student1 instanceof Person);