/* This Read */
let socket = io();
let conn; <br>

let stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
conn = new callingSiri(stream,socket);
conn.remoteStream((stream)=>{
    document.querySelector('#remote_video').srcObject= stream;
});
let calling = await conn.createCall();
socket.emit('send-call',{fromname,to,calling});
