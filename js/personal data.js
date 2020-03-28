var op = document.getElementById('p');
var ocontent1 = document.getElementById('content1');
var ocontent2 = document.getElementById('content2');
var oem = document.getElementById('em');
var onext = document.getElementById('next');
var ocontent3 = document.getElementById('content3');
var oreturn = document.getElementById('return')
oem.onclick = function(){
    ocontent1.className = 'content';
    ocontent2.className = 'content show';
    ocontent3.className = 'content';
    op.innerHTML = '修改手机';
}
onext.onclick = function(){
    ocontent1.className = 'content';
    ocontent2.className = 'content';
    ocontent3.className = 'content show';
    op.innerHTML = '修改手机';
}
oreturn.onclick = function(){
    ocontent1.className = 'content show';
    ocontent2.className = 'content';
    ocontent3.className = 'content';
    op.innerHTML = '个人资料';
}