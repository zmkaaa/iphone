var btul = document.getElementById('btul');
var btulli  = btul.getElementsByTagName('li');
var on_ol = document.getElementById('on_ol');
var on_olli  = on_ol.getElementsByTagName('li');

for(var i=0;i<on_olli.length;i++){
    on_olli[i].index = i;
    on_olli[i].onclick = function(){
        for(var i = 0;i<on_olli.length;i++){
            on_olli[i].className = '';
            btulli[i].className = '';
        }
        this.className = 'active';
        btulli[this.index].className = 'show';
    }
}