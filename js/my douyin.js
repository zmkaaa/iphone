var oul1 = document.getElementById('ul1');
var oli = oul1.getElementsByTagName('li');
var op = oul1.getElementsByTagName('p');
var oclose = document.getElementById('close');
var odeter = document.getElementById('deter');
var onewly = document.getElementById('newly');
var ofooter = document.getElementById('footer');
for(var i = 0;i<oli.length;i++){
    oli[i].index = i;
    op[i].index = i;
    oli[i].onclick = function (){        
        if(this.className == ''){
            this.className = 'active';
        op[this.index].style.display = 'block';
        }else{
            this.className ='';
            op[this.index].style.display = 'none';
        }
    }
    
}
oclose.onclick = function (){
    onewly.style.display = 'none';
}
odeter.onclick = function (){
    onewly.style.display = 'none';
}
ofooter.onclick = function (){
    onewly.style.display = 'block';
}