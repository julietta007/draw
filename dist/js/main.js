var draw = (function(){

   // Get the height and width of the main element.
   var mWidth = document.querySelector('main').offsetWidth;
   var mHeight = document.querySelector('main').offsetHeight;

   // Create the canvas
   var canvas = document.createElement('canvas');

   // Create the context
   var ctx = canvas.getContext('2d');

   // Create the initial bounding rectangle
   var rect = canvas.getBoundingClientRect();

   // Current x,y position
   var x = 0;
   var y = 0;

   // Start x,y position
   var x1 = 0;
   var y1 = 0;    
   
   // End x,y position
   var x2 = 0;
   var y2 = 0;

   //Previous X,Y
   var lx = 0;
   var ly = 0;

   //Set the shape to be drawn
   var shape = '';

   //Does the user want to draw?
   var isDrawing=false;

   //Stroke color
   var stroke = '';

   //Fill color
   var fill = '';


   return {

        //Creates random color
        randColor: function(){
            return '#' + Math.floor(Math.random()*16777215).toString(16);
        },

        //A setter for stroke
        setStrokeColor: function(color){
            stroke = color;
        },

        //A setter for fill
        setFillColor: function(color){
            fill = color;
        },

        //A getter for stroke
        getStrokeColor: function(){

            if(stroke.length > 6){
                return stroke;
            }

            return this.randColor();
        },

        //A getter for fill
        getFillColor: function(){

            if(fill.length > 6){
                return fill;
            }

            return this.randColor();
        },

        // Set the x,y coords based on current event data
        setXY: function(evt){
            //Track the last x,y position
            lx=x;
            ly=y;

        //set the current x,y position
        x = (evt.clientX - rect.left) - canvas.offsetLeft;
        y = (evt.clientY - rect.top) - canvas.offsetTop;
        },
       
       //Write the x,y coords based on current event data
       writeXY: function(){
               document.getElementById('trackX').innerHTML = 'X: ' + x;
               document.getElementById('trackY').innerHTML = 'Y: ' + y;
       },
        //Setter for isDrawing
        setIsDrawing: function(bool){
            isDrawing = bool;
        },
        
        //Getter for isDrawing
        getIsDrawing: function(){
            return isDrawing;
        },

       //Sets the shape to be drawn
       setShape: function(shp){
           shape = shp;
       },

       // Set x1, y1
       setStart: function(){
           x1 = x;
           y1 = y;
       },

       // Set x2, y2
       setEnd: function(){
           x2 = x;
           y2 = y;
       },

       // Access the canvas
       getCanvas: function(){
           return canvas;
       },

       //Get the current shape
       getShape: function(){
           return shape;
       },

       // Draw the selected shape
       draw: function(){
           ctx.restore();
           if(shape === 'rectangle'){
               this.drawRect();
           } else if (shape === 'line'){
               this.drawLine();
           }else if (shape === 'circle'){
                this.drawCircle();
            }else if (shape === 'path'){
                this.drawPath();
           }else{
               alert('Please choose a shape');
           }
           ctx.save();
       },

       // Draw a line
       drawLine: function(){
           ctx.strokeStyle = this.getStrokeColor();
           ctx.beginPath();
           ctx.moveTo(x1, y1);
           ctx.lineTo(x2, y2);
           ctx.stroke();
       },

       // Drawing a rectangle using the event of clicking and dragging mouse
       // xyhw are arguments the function is expecting
       drawRect: function(x, y, h, w){
           ctx.fillStyle = this.getFillColor();
           ctx.strokeStyle = this.getStrokeColor();
           ctx.fillRect(x1, y1, (x2-x1), (y2-y1));
           ctx.strokeRect(x1, y1, (x2-x1), (y2-y1));

       },

       // Drawing a circle using the event of clicking and dragging mouse
       // xyrse are arguments the function is expecting
       drawCircle: function(x, y, r, s, e){
        ctx.fillStyle = this.getFillColor();
        ctx.strokeStyle = this.getStrokeColor();  

        ctx.beginPath();

        var a = (x1-x2);
        var b = (x1-x2);
        radius = Math.sqrt(a*a+b*b);
        ctx.arc(x1, y1, radius, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fill();
        },

        //Draw a path during a drag even
        drawPath: function(){
            ctx.strokeStyle = '#' + Math.floor(Math.random()*16777215).toString(16);    
            ctx.beginPath();
            ctx.moveTo(lx, ly);
            ctx.lineTo(x, y);
            ctx.stroke();
        },

        //Initialize the object, this must be called before anything else
        init: function(){
            canvas.width = mWidth;
            canvas.height = mHeight;
            document.querySelector('main').appendChild(canvas);
        }
    }
})();

// Initialize draw
draw.init();

draw.getCanvas().addEventListener('mousemove', function(evt){
   draw.setXY(evt);
   draw.writeXY();
   if(draw.getShape()==='path' && draw.getIsDrawing()===true){
    draw.draw();
}
});

draw.getCanvas().addEventListener('mousedown', function(){
   draw.setStart();
   draw.setIsDrawing(true);
});

draw.getCanvas().addEventListener('mouseup', function(){
   draw.setEnd();
   draw.draw();
   draw.setIsDrawing(false);
});

document.getElementById('btnRect').addEventListener('click', function(){
   draw.setShape('rectangle');
});

document.getElementById('btnLine').addEventListener('click', function(){
   draw.setShape('line');
});

document.getElementById('btnCircle').addEventListener('click', function(){
   draw.setShape('circle');
 });

document.getElementById('btnPath').addEventListener('click', function(){
   draw.setShape('path');
 });

document.getElementById('strokeColor').addEventListener('change', function(){
    var rsc = document.getElementById('randStrokeColor');

   // if(rsc.checked===true){
   //     draw.setStrokeColor('');
   // }
    draw.setStrokeColor(document.getElementById('strokeColor').value);
  });

document.getElementById('randStrokeColor').addEventListener('change', function(){
    draw.setStrokeColor('');

  });
