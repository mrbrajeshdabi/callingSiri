/* This Read */ <br>
 /* Insert CDN Your Html File */  <br><br><br>
 
<script src="https://cdn.jsdelivr.net/gh/mrbrajeshdabi/callingSiri@v1.0.3/dist/callingsiri.min.js"></script>

     <b> let socket = io(); <b> <br>
     <b> let conn; </b> <br>
-----------------------------
 /* start call */ 
-----------------------------
    let stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
    conn = new callingSiri(stream,socket);
    conn.remoteStream((stream)=>{
      document.querySelector('#remote_video').srcObject= stream;
    }); 
    let calling = await conn.createCall();
    socket.emit('send-call',{fromname,to,calling});

---------------------------------------------
 /* receive call With Socket */
---------------------------------------------
    socket.on('receive-call',async({from,to,calling})=>{
    
    let stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
    conn = new callingSiri(stream,socket);
    conn.remoteStream((stream)=>{
      document.querySelector('#remote_video').srcObject= stream;
    });
    let answer = await conn.createAnswer(calling);
    socket.emit('send-answer',{from,to,answer});
    
    });

-----------------------------------------------
/* Server.Js Insert Socket and Copy This Text */
-----------------------------------------------

    socket.on('send-call',({from,to,calling})=>{
        socket.to(to).emit('receive-call',{from,to,calling});
    });

    socket.on('send-answer',({from,to,answer})=>{
        socket.to(from).emit('receive-answer',{from,to,answer});
    });

    socket.on('candidate',(candidate)=>{
        socket.broadcast.emit('candidate',candidate);
    });
