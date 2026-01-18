/* This Read */ <br>
<b> /* Insert CDN Your Html File </b> <br>
<span style="background-color:white; color:red;"> <script src="https://cdn.jsdelivr.net/gh/mrbrajeshdabi/callingSiri@v1.0.3/dist/callingsiri.min.js"></script> </span><br>
🚀 <b> let socket = io(); <b> <br>
🤖 <b> let conn; </b> <br>
-----------------------------
<b> /* start call */ </b> <br>
-----------------------------
👁let stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true}); <br>
conn = new callingSiri(stream,socket); <br>
conn.remoteStream((stream)=>{
   👀 document.querySelector('#remote_video').srcObject= stream;
}); <br>
👋🏻let calling = await conn.createCall(); <br>
🚀socket.emit('send-call',{fromname,to,calling}); <br>

---------------------------------------------
<b> /* receive call With Socket */ </b> <br>
---------------------------------------------
socket.on('receive-call',async({from,to,calling})=>{
    
👁let stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true}); <br>
conn = new callingSiri(stream,socket); <br>
conn.remoteStream((stream)=>{
     👀 document.querySelector('#remote_video').srcObject= stream;
}); <br>
👋🏻let answer = await conn.createAnswer(calling); <br>
🚀socket.emit('send-answer',{from,to,answer});
});


    socket.emit('send-answer',{from,to,answer});
});
