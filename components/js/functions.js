// ---------------------------------------------descripting variables
const bEqual = document.getElementsByClassName("equal")[0];
const bAc = document.getElementsByClassName("ac")[0];
const bCalcu=document.querySelectorAll("[calcu]");
let inputValues=[];
let index = 0;
let input=document.getElementsByClassName("equation")[0];
//--------------------------------------------------- validation---------------------------
const compose = function(f,g){
    return function mixer(...args){
        return f(g(...args))
    }
}
function operationChecker(string){
    let char1 = string.charAt(0);
    let char2 = string.charAt(string.length-1)
    if(char1==="*"||char1==="/"||char1==="-"||char1==="+"){
        string=string.slice(1);
    }else if(char2==="*"||char2==="/"||char2==="-"||char2==="+"){
        string=string.slice(0,-1);
    }
    return string;
}
function Inner (...fns) {
    return fns.reduce(compose);
}
const checker = Inner(
    changer,
    starToMultiple,
    remover,
    keyChecker
)
function keyChecker(mykey){
    if(mykey>64 && mykey<91 ||  mykey>96 && mykey<123){
        alert("wtf bro im calculator not wizard \n just type number and operation")
        return true;
    }
    return false;
}
function remover(boolean){
    let string = document.getElementsByClassName("equation")[0].value;
    if(boolean){
        return string.substr(0,string.length-1);
    }
    return string;
}
function changer (string){
    document.querySelector("input").value=string;
}
function starToMultiple(initialString){
    let string=initialString;
    let char = string.charAt(string.length-1)
    console.log(char)
    if(char==="*"){
        string=string.substring(0,string.length-1)+"×"
    }
    return string;
}
// --------------------------------------calculator----------------------------------
// mathematical functions
function multiplication(number1 , number2){return number1*number2}
function division(number1 , number2){return number1/number2}
function plus(number1 , number2){return number1+number2}
function minus(number1 , number2){return number1-number2}
function ac(string){return}
// reader functions
const calculatorCompose=function(f,g){
    return function mixer(...args){
        return f(g(...args),...args)
    }
}
function spaceRemover(initialString){
    let string=initialString;
    for(let i=0;i<string.length;i++){
        let char = string.charAt(i);
        if(char===" "){
            string=string.slice(0,i)+string.slice(i+1);
        }
    }
    return string;
}
function calculatorInner (...fns) {
    return fns.reduce(calculatorCompose);
}
function leftSide(array,i){
    let leftside;
    if(i===0){
        leftside=0;
    }else{
        leftside=array[i-1][0]+1;
    }
    return leftside;
}
function rightSide(array,i,string){
    let rightside;
    if(i===array.length-1){
        rightside=string.length;
    }else{
        rightside=array[i+1][0];
    }
    return rightside;
}
function myOperate(string,array,i,op){
    let leftside=leftSide(array,i);
    let rightside=rightSide(array,i,string);
    let midle=array[i][0];
    let firstNumber=Number(string.substring(leftside,midle))
    console.log(firstNumber)
    let secondNumber=Number(string.substring(midle+1,rightside))
    console.log(secondNumber)
    let result =op(firstNumber,secondNumber)
    return result;
}
function replace(result,string,array,i){
    let leftside=leftSide(array,i);
    let rightside=rightSide(array,i,string);
    return string=string.substring(0,leftside)+result.toString()+string.substring(rightside);
}
function minusChecker(firstArray){
    console.log(firstArray)
    let array=firstArray;
    if(array.length===0){
        return array;
    }else if(array[0][0]===0 && array[0][1]==="-"){
        return array.shift()
    }
    return array;
}
function operationFinder(string){
    let array = [];
    let index=0;
    for(let i =0; i<string.length ; i++){
        let character= string.charAt(i)
        if (character==="-"||character==="+"||character==="×"||character==="/"){
            let subarray=[];
            subarray[0]=i;
            subarray[1]=character;
            array[index]=subarray;
            index++;
        }
    }
    array=minusChecker(array);
    return array;
}
function signChecker (firstString){
    let string=firstString;
    for(let i=0;i<string.length;i++){
        let char1 = string.charAt(i);
        let char2 = string.charAt(i+1);
        if(char1==="+"&&char2==="-"){
            string = string.slice(0, i) + string.slice(i+1);
        }else if(char1==="-"&&char2==="+"){
            string = string.slice(0, i+1) + string.slice(i+2);
        }else if(char1==="-"&&char2==="-"){
            string = string.slice(0,i)+"+"+string.slice(i+2)
        }
    }
    return string;
}
function ZeroDenominatorChecker(firstString){
    let string=firstString;
    for(let i=0;i<string.length;i++){
        let char1 =string.charAt(i);
        let char2 =string.charAt(i+1);
        if(char1==="/"&&char2==="0"){
            alert("bro u want to broke me? \n this calculate have zero denominator")
            return 0;
        }
    }
    return string;
}
function calculatorUnit(firstString,operation,symbol,operation2=0,symbol2=0){
    let string=firstString;
    let array=operationFinder(string);
    console.log(array)
    let op;
    for(let i=0 ; i<array.length;i++){
        if(array[i][1]===symbol){
            op=operation;
            string= ZeroDenominatorChecker(string);
            string =calculatorInner(
                replace,
                myOperate
            )(string,array,i,op);
            string=signChecker(string);
            console.log(string)
            array=operationFinder(string);
            i--;
        }else if(array[i][1]===symbol2){
            op=operation2;
            string= ZeroDenominatorChecker(string);
            string =calculatorInner(
                replace,
                myOperate
            )(string,array,i,op);
            string=signChecker(string);
            console.log(string)
            array=operationFinder(string);
            i--;
        }
    }
    return string;
}
// function toMultiple (initialString){
//     let operation=multiplication;
//     let firstString=initialString;
//     let symbol="*";
//     return calculatorUnit(firstString,operation,symbol);
// }
// function divide (initialString){
//     let operation=division;
//     let firstString=initialString;
//     let symbol="/";
//     return calculatorUnit(firstString,operation,symbol);
// }
function toPlus (initialString){
    let operation=plus;
    let firstString=initialString;
    let symbol="+";
    return calculatorUnit(firstString,operation,symbol);
}
function subtraction (initialString){
    let operation=minus;
    let firstString=initialString;
    let symbol="-";
    return calculatorUnit(firstString,operation,symbol);
}
function ComputationalPriority(initialString){
    let operation1 = multiplication;
    let operation2 = division;
    let symbol1="×";
    let symbol2="/";
    let firstString=initialString;
    return calculatorUnit(firstString,operation1,symbol1,operation2,symbol2)
}
const calInner=Inner(
    subtraction,
    toPlus,
    ComputationalPriority
)
function calculator(string){
    return calInner(string);
}


// ------------------------------event listeners-----------------------
input.addEventListener("keypress",function(event){
    mykey=event.keyCode;
    setTimeout(checker,0,mykey);
    if(mykey===13){
        let string=input.value;
        string=operationChecker(string);
        string=spaceRemover(string);
        string=calculator(string);
        changer(string);
    }
})
bEqual.addEventListener("click",function(event){
    let string=input.value;
    string=operationChecker(string);
    string=spaceRemover(string);
    string=calculator(string);
    changer(string);
})
bCalcu.forEach(button=>{
    button.addEventListener("click",function(){
        let myValue=this.innerText.toString();
        let newString=input.value+myValue;
        changer(newString);
    })
})
bAc.addEventListener("click",function(){
    let string="";
    changer(string);
})