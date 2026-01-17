export function initSocket(socket)
{
    return {
        SendOutgoing : (data) => socket.emit('outgoing',data),
        SendIncoming : (data) => socket.emit('incoming',data),
        SendCandidate : (data) => socket.emit('candidate',data),
        EndCall : (data) => socket.emit('endcall',data),
        ListenOutgoing : (cb) => socket.on('outgoing',cb),
        ListenIncoming : (cb) => socket.on('incoming',cb),
        ListenCandidate : (cb) => socket.on('candidate',cb),
        ListenEndCall :(cb) => socket.on('endcall',cb)

    }
}