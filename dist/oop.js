"use strict";
class person {
    constructor(personName, personSubname) {
        this.name = personName;
        this.subname = personSubname;
    }
}
const person1 = new person("Joe", "Pull");
person1.name = "tyty";
console.log(person1);
