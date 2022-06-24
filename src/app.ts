type Admin={
    name:string;
    privileges:string[],

};

type Employee={
    name:string;
    startDate:Date;
};
type ElevatedEmployee=Admin & Employee;
const e1 : ElevatedEmployee = {
    name:'MAX',
    privileges:['created-server'],
    startDate:new Date()
}