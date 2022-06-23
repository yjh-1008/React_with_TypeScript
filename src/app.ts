class Department {
    // public id:string;
    // public name: string;
    protected employees :  string[]=[];
    
    constructor(public id:string,public name:string){
        // this.id=id;
        // this.name = name;
    }
    describe(this: Department){
        console.log('Department: '+this.name);
    }
    addEmployee(employee: string){
        this.employees.push(employee);
    }
    printEmployeeInformation(){
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
class ITDepartment extends Department{
    //자동으로 Department것을 가져옴
    admins:string[]
    constructor(id:string, name:string ,admins:string[]){
        super(id, name);//상위 클래스 값
        this.admins=admins;
    }
}


class AccountDepartment extends Department{
    private lastReport:string;
    private static instance: AccountDepartment;
    get mostRecentReport(){
        if(this.lastReport){
            return this.lastReport;
        }
        throw new Error('No Report found');
    }
    static getInstance(){
        if(this.instance){
            return this.instance;
        }
        this.instance = new AccountDepartment('d2',[]);
    }

    set mostRecentReport(value:string){
        if(!value){
            throw new Error('no value');
        }
        this.addReport(value)
    }
    constructor(id:string, private reports:string[]){
        super(id,'IT');
        this.lastReport = reports[0];
    }

    addReport(text:string){
        this.reports.push(text);
    }
    addEmployee(employee: string): void {
        if(employee==='MAX'){
            return;
        }
        this.employees.push(employee);
    }
}

const accounting = new Department('jun','mAX');
const acc1 = new ITDepartment('1','2',['MAX']);//ITDepartment의 생성자가 없으므로 자동으로 Department 생성자 호출
accounting.addEmployee('MAX');
accounting.addEmployee('Mune');
accounting.describe();
accounting.printEmployeeInformation();

// const accountingCopy = {name:'s',describe: accounting.describe};
// accountingCopy.describe();