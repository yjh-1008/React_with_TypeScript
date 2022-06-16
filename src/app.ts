let appId = 'abc';
const button = document.querySelector('button');

function add1(n1:number, n2:number){
    if(n1+n2>0){
        return n1+n2;//함수를 하나라도 반환한다면 전부 반환해야한다.
    }
    return;
}

function clickHandler(message:string){
    console.log('clcked'+message);
}


if(button){
    button.addEventListener('click',()=>{
        clickHandler('click message!');
    });
}