    var x = Math.random() *700;
    var y = Math.random() *500;


    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#' + Math.floor(Math.random()*16777215).toString(16);
    ctx.fillRect(x, y, 100, 100);
 
ctx.beginPath();
ctx.arc( 230, 400, 190, 0, 2*Math.PI);
ctx.stroke();
