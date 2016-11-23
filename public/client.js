document.addEventListener("DOMContentLoaded", function() {

   // get canvas element and create context
   var canvas  = document.getElementById('drawing');
   var context = canvas.getContext('2d');
   var width   = window.innerWidth;
   var height  = window.innerHeight;
   var socket  = io.connect();

   // set canvas to full browser width/height
   canvas.width = width;
   canvas.height = height;

   var lastPoint = { point: [ 0, 0 ] };

   // register mouse event handlers
   canvas.onmousemove = function(e){
     socket.emit('update_position', { point: [ e.clientX, e.clientY ] });
   };

   // draw line received from server
	socket.on('update_position', function (pos) {
      var a = pos.point;
      context.moveTo(lastPoint[0],lastPoint[1]);
      context.lineTo(a[0],a[1]);
      lastPoint[0]=a[0];
      lastPoint[1]=a[1];
      context.stroke();
   });


});
