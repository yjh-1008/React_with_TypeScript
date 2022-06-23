type AddFn = (a:number, b:number)=>number
let add:AddFn
interface Named{
    readonly name:string
}

interface Greetable extends Named{
    greet(parse:string):void;
}

class Person implements Greetable{
    name:string;
    constructor(name:string){
        this.name=name;
    }
    greet(pharse:string){
        console.log(pharse);
    }
}

let user1: Person;
