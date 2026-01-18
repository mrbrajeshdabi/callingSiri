/* This Read */ <br>
 /* Insert CDN Your Html File */  <br>
<script src="https://cdn.jsdelivr.net/gh/mrbrajeshdabi/callingSiri@v1.0.3/dist/callingsiri.min.js"></script> <br><br>
    🚀 <b> let socket = io(); <b> <br>
    🤖 <b> let conn; </b> <br>
-----------------------------
 /* start call */  <br>
-----------------------------
    👁let stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true}); <br>
    conn = new callingSiri(stream,socket); <br>
    conn.remoteStream((stream)=>{
     👀 document.querySelector('#remote_video').srcObject= stream;
    }); <br>
    👋🏻let calling = await conn.createCall(); <br>
    🚀socket.emit('send-call',{fromname,to,calling}); <br>

---------------------------------------------
 /* receive call With Socket */ <br>
---------------------------------------------
    socket.on('receive-call',async({from,to,calling})=>{
    
    👁let stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true}); <br>
    conn = new callingSiri(stream,socket); <br>
    conn.remoteStream((stream)=>{
     👀 document.querySelector('#remote_video').srcObject= stream;
    }); <br>
    👋🏻let answer = await conn.createAnswer(calling); <br>
    🚀socket.emit('send-answer',{from,to,answer});
    
    }); <br> <br>

-----------------------------------------------
/* Server.Js Insert Socket and Copy This Text */
-----------------------------------------------
<br>

    socket.on('send-call',({from,to,calling})=>{
        socket.to(to).emit('receive-call',{from,to,calling});
    });

    socket.on('send-answer',({from,to,answer})=>{
        socket.to(from).emit('receive-answer',{from,to,answer});
    });

    socket.on('candidate',(candidate)=>{
        socket.broadcast.emit('candidate',candidate);
    });
