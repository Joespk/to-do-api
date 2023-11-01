class person {
  public name: string;
  public readonly subname: string;

  constructor(personName: string, personSubname: string) {
    this.name = personName;
    this.subname = personSubname;
  }
}

const person1 = new person("Joe", "Pull");
person1.name = "tyty";

console.log(person1);
