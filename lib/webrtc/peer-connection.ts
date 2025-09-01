"use client"

// إدارة اتصالات WebRTC للبث الصوتي والمرئي
export class PeerConnectionManager {
  private peerConnections: Map<string, RTCPeerConnection> = new Map()
  private localStream: MediaStream | null = null
  private configuration: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  }

  constructor(
    private onRemoteStream: (userId: string, stream: MediaStream) => void,
    private onIceCandidate: (userId: string, candidate: RTCIceCandidate) => void
  ) {}

  async createPeerConnection(userId: string): Promise<RTCPeerConnection> {
    const pc = new RTCPeerConnection(this.configuration)

    // إضافة المسار المحلي إذا كان متاحاً
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        pc.addTrack(track, this.localStream!)
      })
    }

    // معالجة المسارات البعيدة
    pc.ontrack = (event) => {
      const [remoteStream] = event.streams
      this.onRemoteStream(userId, remoteStream)
    }

    // معالجة ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.onIceCandidate(userId, event.candidate)
      }
    }

    pc.onconnectionstatechange = () => {
      console.log(`[Leqaa] Connection state with ${userId}:`, pc.connectionState)
    }

    this.peerConnections.set(userId, pc)
    return pc
  }

  async createOffer(userId: string): Promise<RTCSessionDescriptionInit> {
    const pc = await this.createPeerConnection(userId)
    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)
    return offer
  }

  async createAnswer(userId: string, offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> {
    const pc = await this.createPeerConnection(userId)
    await pc.setRemoteDescription(offer)
    const answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)
    return answer
  }

  async handleAnswer(userId: string, answer: RTCSessionDescriptionInit) {
    const pc = this.peerConnections.get(userId)
    if (pc) {
      await pc.setRemoteDescription(answer)
    }
  }

  async handleIceCandidate(userId: string, candidate: RTCIceCandidate) {
    const pc = this.peerConnections.get(userId)
    if (pc) {
      await pc.addIceCandidate(candidate)
    }
  }

  async setLocalStream(stream: MediaStream) {
    this.localStream = stream
    
    // إضافة المسارات لجميع الاتصالات الموجودة
    this.peerConnections.forEach(pc => {
      stream.getTracks().forEach(track => {
        pc.addTrack(track, stream)
      })
    })
  }

  removePeerConnection(userId: string) {
    const pc = this.peerConnections.get(userId)
    if (pc) {
      pc.close()
      this.peerConnections.delete(userId)
    }
  }

  cleanup() {
    this.peerConnections.forEach(pc => pc.close())
    this.peerConnections.clear()
    
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop())
      this.localStream = null
    }
  }
}