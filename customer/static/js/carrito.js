const number = Number("1.500")
const n2 = Number("150.500")
const suma = number + n2
Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0; 
}
const uno = Number("1")
const dos = Number("2")
const tres = Number("3")
const dec = suma.countDecimals()
if(Number(dec)==1 || Number(dec)==0){
    var mul = suma * Math.pow(10, tres)
} else if (Number(dec)==2){
    var mul = suma * Math.pow(10, dos)
} else if(Number(dec)==3) {
    var mul = suma * Math.pow(10, uno)
}
console.log(mul)