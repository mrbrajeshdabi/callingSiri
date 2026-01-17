(function (root, factory) {
  if (typeof module === "object") {
    module.exports = factory();
  } else {
    root.callingSiri = factory();
  }
}(this, function () {
  class callingSiri
{
    connection;
    localstream;    
    constructor(localstream)
    {
        this.localstream = localstream;
        
        this.connection = new RTCPeerConnection({
            iceServers:[{urls:"stun:stun4.l.google.com:19302"}]
        });
        
        this.localstream.getTracks().forEach(track => {
            this.connection.addTrack(track,this.localstream);
        });
        console.log("Dear CallingSiri initialized 🚀");
        // this.init();
    }

    remoteStream(cb) {
        const remotestream = new MediaStream();
        this.connection.ontrack = (event) => {
            event.streams[0].getTracks().forEach(track => {
                remotestream.addTrack(track);
            });
            cb(remotestream);
        };
    }

    candidate(cb)
    {
        this.connection.onicecandidate = (event)=>{
            if(event.candidate) cb(event.candidate);
        }
    }

    async setCandidate(candidate)
    {
        if (this.connection.remoteDescription) {
            await this.connection.addIceCandidate(candidate);
        }
        //else {
        //     // return this.pendingCandidates.push(candidate);
        // }
    }

    async createCall()
    {
        let offer = await this.connection.createOffer();
        await this.connection.setLocalDescription(offer);
        return offer;
    }

    async createAnsWer(offer)
    {
        await this.connection.setRemoteDescription(offer);
        let answer = await this.connection.createAnswer();
        await this.connection.setLocalDescription(answer);
        // this.pendingCandidates.forEach(c =>
        //     this.connection.addIceCandidate(c)
        // );
        // this.pendingCandidates = [];
        return answer;
    }

    async setAnswer(answer)
    {
        if (!this.connection.currentRemoteDescription) {
            await this.connection.setRemoteDescription(new RTCSessionDescription(answer));
        }
    }

    async ConnClosed()
    {
        if(this.connection)
        {
            return this.connection.close();
        }
    }

    async Muted()
    {
        if(this.localstream.getTracks()[0].enabled == false)
        {
            return this.localstream.getTracks()[0].enabled = true;
        }
        else
        {
            return this.localstream.getTracks()[0].enabled = false;
        }
    }

    async VideoClosed()
    {
        if(this.localstream.getTracks()[1].enabled == false)
        {
            return this.localstream.getTracks()[1].enabled = true;
        }
        else
        {
            return this.localstream.getTracks()[1].enabled = false;
        }
    }

}
  return callingSiri;
}));
