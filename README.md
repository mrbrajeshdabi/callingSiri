# callingSiri
this module is video calling 


/*  send call   */
let stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
    
conn = new callingSiri(stream,socket);

conn.remoteStream((stream)=>{
    document.querySelector('#remote_video').srcObject= stream;
});

let startcall = await conn.createCall();
socket.emit('send-call',{fromname,to,call:startcall});


/*  recieve call   */

let stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true});

conn = new callingSiri(stream,socket);

conn.remoteStream((stream)=>{
    document.querySelector('#remote_video').srcObject= stream;
});

let answer = await conn.createAnswer(call);
socket.emit('send-answer',{from,to,answer});


/*  set Answer from  */
await conn.setAnswer(answer);



/* Backend Socket Listener */

socket.on('send-call',({fromname,to,call})=>{
        socket.to(to).emit('receive-call',{from:alluser[fromname].id,to,call});
});

socket.on('send-answer',({from,to,answer})=>{
    socket.to(from).emit('receive-answer',{from,to,answer});
});

socket.on('candidate',(candidate)=>{
    socket.broadcast.emit('candidate',candidate);
});
