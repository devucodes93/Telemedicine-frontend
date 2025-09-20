import { io } from "socket.io-client";
import { create } from "zustand";

const BASE_URL = "https://telemedicine-backend-2.onrender.com/";

const useSocketStore = create((set, get) => ({
  connectionStatus: "idle", // idle | connecting | waiting | connected | error
  connectionTimer: null,
  socket: null,
  isConnected: false,
  roomId: null,
  localVideo: null,
  localVideoRef: { current: null },
  remoteVideoRef: { current: null },
  peerRef: { current: null },
  loadingUser: false,
  setRoomId: (id) => set({ roomId: id }),
  setLocalVideo: (stream) => set({ localVideo: stream }),
  setLocalVideoRef: (ref) => set({ localVideoRef: ref }),
  setRemoteVideoRef: (ref) => set({ remoteVideoRef: ref }),
  setConnected: (status) => set({ isConnected: status }),
  connectSocket: () => {
    if (get().socket?.connected) return;
    console.log("came");
    const socket = io(BASE_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected with ID:.....", socket.id);
      set({ socket });
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      set({ socket: null, playerSocketId: "" });
    });

    set({ socket });
  },
  disconnectSocket: () => {
    const socket = get().socket;
    if (!socket) return;

    console.log("🔌 Disconnecting socket...");
    socket.disconnect();
    set({ socket: nu });
  },
  joinVideo: (roomId, doctorIdRaw) => {
    const socket = get().socket;
    const userRaw = localStorage.getItem("user");
    if (!userRaw) {
      console.error("❗ Cannot join room: User not logged in.");
      return;
    }
    const user = JSON.parse(userRaw);
    if (!socket || !socket.connected || !socket.id) {
      console.error(
        "❗ Cannot join room: Socket not connected or ID unavailable."
      );
      return;
    }
    let eventName, payload;
    const isDoctor = String(user.role).toLowerCase() === "doctor";
    if (isDoctor) {
      eventName = "doctor-join-room";
      payload = {
        doctorId: user.id || user._id,
        roomId,
        socketId: socket.id,
      };
    } else {
      eventName = "patient-join-room";
      payload = {
        patientId: user.id || user._id,
        doctorId: doctorIdRaw,
        roomId,
        socketId: socket.id,
      };
    }
    set({ roomId: roomId });
    get().roomJoined();
    const retryDelay = 4000;

    function tryJoin() {
      if (!get().socket || !get().socket.connected || !get().socket.id) {
        console.warn(`🔄 Socket not ready, retrying join...`);
        setTimeout(tryJoin, retryDelay);
        return;
      }
      get().socket.emit(eventName, payload);
      console.log("🔗 Attempting to join room:", roomId, payload);
    }
    tryJoin();

    // Listen for connection events
    get().socket?.off("connection-established");
    get().socket?.off("waiting");
    get().socket?.off("join-error");

    const handleWaiting = (data) => {
      console.log("⏳ Waiting for doctor to join...");
      setTimeout(tryJoin, retryDelay);
    };
    const handleEstablished = (data) => {
      console.log("✅ Connection established:", data);
    };
    const handleJoinError = (data) => {
      console.error("❌ Join error:", data.message);
      setTimeout(tryJoin, retryDelay);
    };
    get().socket?.on("connection-established", handleEstablished);
    get().socket?.on("waiting", handleWaiting);
    get().socket?.on("join-error", handleJoinError);
  },
  roomJoined: () => {
    const socket = get().socket;
    if (!socket) return;
    socket.on("room-joined", (data) => {
      console.log("✅ Room joined:", data);
      set({ roomId: data.roomId });
    });
  },
  startCall: async () => {
    const {
      remoteVideoRef,
      localVideoRef,
      socket,
      roomId,
      setLocalVideo,
      peerRef,
    } = get();

    console.log("[startCall] Attempting to get local media stream...");
    let localStream;
    try {
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("[startCall] Local media stream acquired:", localStream);
    } catch (err) {
      console.error("[startCall] Error getting local media stream:", err);
      return;
    }

    setLocalVideo(localStream);
    if (localVideoRef?.current) {
      localVideoRef.current.srcObject = localStream;
      console.log("[startCall] Local video element srcObject set.");
    } else {
      console.warn("[startCall] Local video ref not available.");
    }

    console.log("[startCall] Creating RTCPeerConnection...");
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        {
          urls: "turn:relay1.expressturn.com:3478",
          username: "ef1dd7e0",
          credential: "b1b2c3d4e5f6g7h8",
        },
      ],
    });

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
      console.log(`[startCall] Added track to peerConnection:`, track);
    });

    peerRef.current = peerConnection;
    console.log("[startCall] peerRef.current assigned.");

    peerConnection.ontrack = (event) => {
      const remoteStream = event.streams[0];
      console.log(
        "[startCall] ontrack event received. Remote stream:",
        remoteStream
      );

      const tryAttach = () => {
        const remoteVideo = get().remoteVideoRef;
        set({ loadingUser: true });
        if (remoteVideo?.current) {
          if (remoteVideo.current.srcObject !== remoteStream) {
            remoteVideo?.current.pause();
            remoteVideo.current.srcObject = remoteStream;
            console.log("[startCall] Remote video element srcObject set.");
          }

          remoteVideo.current.onloadedmetadata = () => {
            setTimeout(() => {
              set({ loadingUser: false });
              remoteVideo.current.play().catch((err) => {
                console.error("[startCall] Error playing remote video:", err);
                set({ loadingUser: false });
              });
              console.log("[startCall] Remote video playback started.");
            }, 500);
          };
        } else {
          console.warn(
            "[startCall] Remote video ref not available, retrying..."
          );
          setTimeout(tryAttach, 500);
        }
      };

      tryAttach();
    };

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("[startCall] Sending ICE candidate:", event.candidate);
        const roomNo = localStorage.getItem("activeRoom") || roomId;
        socket.emit("signal", {
          roomId: roomNo,
          data: { candidate: event.candidate },
        });
      }
    };
    peerConnection.oniceconnectionstatechange = () => {
      console.log("[startCall] ICE State:", peerConnection.iceConnectionState);
      if (
        peerConnection.iceConnectionState === "disconnected" ||
        peerConnection.iceConnectionState === "failed"
      ) {
        console.warn(
          "[startCall] ICE connection lost. Attempting to restart ICE..."
        );
        if (typeof peerConnection.restartIce === "function") {
          peerConnection.restartIce();
          console.log("[startCall] Called restartIce().");
        } else {
          // Fallback: try to renegotiate
          if (socket && roomId) {
            socket.emit("signal", { roomId, data: { renegotiate: true } });
            console.log("[startCall] Sent renegotiate signal.");
          }
        }
      }
    };
    peerConnection.onconnectionstatechange = () => {
      console.log(
        "[startCall] Connection State:",
        peerConnection.connectionState
      );
      if (
        peerConnection.connectionState === "disconnected" ||
        peerConnection.connectionState === "failed"
      ) {
        console.warn(
          "[startCall] Peer connection lost. Attempting to reconnect..."
        );
        // Optionally, you could trigger a full restart or reload here
      }
    };
    peerConnection.onnegotiationneeded = () => {
      console.log("[startCall] Negotiation needed.");
    };
    peerConnection.ondatachannel = (event) => {
      console.log("[startCall] Data channel event:", event);
    };
    console.log("[startCall] Peer connection setup complete.");
  },
  setupSignalListener: () => {
    const { socket, peerRef, roomId } = get();

    // ICE candidate queue for race condition
    let iceCandidateQueue = [];
    socket.on("signal", async (data) => {
      const peer = peerRef.current;
      if (!peer) {
        console.warn("[signal] No peer connection available.");
        return;
      }
      // Get roomId from store, URL, or localStorage
      let effectiveRoomId = roomId;
      if (!effectiveRoomId) {
        const match = window.location.pathname.match(/\/call\/(\w+)/);
        if (match && match[1]) {
          effectiveRoomId = match[1];
        }
      }
      if (!effectiveRoomId) {
        effectiveRoomId = localStorage.getItem("activeRoom");
      }
      try {
        console.log(`[signal] Current signalingState: ${peer.signalingState}`);
        if (data.offer) {
          console.log("[signal] Received offer:", data.offer);
          if (
            peer.signalingState === "stable" ||
            peer.signalingState === "have-remote-offer"
          ) {
            await peer.setRemoteDescription(
              new RTCSessionDescription(data.offer)
            );
            console.log(
              `[signal] setRemoteDescription(offer) called in signalingState: ${peer.signalingState}`
            );
            // Add any queued ICE candidates
            if (iceCandidateQueue.length > 0) {
              for (const candidate of iceCandidateQueue) {
                try {
                  await peer.addIceCandidate(new RTCIceCandidate(candidate));
                  console.log(
                    "[signal] Added queued ICE candidate:",
                    candidate
                  );
                } catch (err) {
                  console.error(
                    "[signal] Error adding queued ICE candidate:",
                    err
                  );
                }
              }
              iceCandidateQueue = [];
            }
            const answer = await peer.createAnswer();
            console.log(answer, "answer here");
            await peer.setLocalDescription(answer);
            socket.emit("signal", {
              roomId: effectiveRoomId,
              data: { answer },
            });
            console.log("[signal] Sent answer:", answer);
          } else {
            console.warn(
              `[signal] Skipped setRemoteDescription(offer) due to signalingState: ${peer.signalingState}`
            );
          }
        } else if (data.answer) {
          console.log("[signal] Received answer:", data.answer);
          if (peer.signalingState === "have-local-offer") {
            await peer.setRemoteDescription(
              new RTCSessionDescription(data.answer)
            );
            console.log(
              `[signal] setRemoteDescription(answer) called in signalingState: ${peer.signalingState}`
            );
            // Add any queued ICE candidates
            if (iceCandidateQueue.length > 0) {
              for (const candidate of iceCandidateQueue) {
                try {
                  await peer.addIceCandidate(new RTCIceCandidate(candidate));
                  console.log(
                    "[signal] Added queued ICE candidate:",
                    candidate
                  );
                } catch (err) {
                  console.error(
                    "[signal] Error adding queued ICE candidate:",
                    err
                  );
                }
              }
              iceCandidateQueue = [];
            }
          } else {
            console.warn(
              `[signal] Skipped setRemoteDescription(answer) due to signalingState: ${peer.signalingState}`
            );
            // Log duplicate/late answer for diagnostics
            console.warn(
              `[signal] Duplicate or late answer received. This may cause remote video instability.`
            );
          }
        } else if (data.candidate) {
          console.log("[signal] Received ICE candidate:", data.candidate);
          if (peer.remoteDescription && peer.remoteDescription.type) {
            await peer.addIceCandidate(new RTCIceCandidate(data.candidate));
            console.log(
              "[signal] Added ICE candidate immediately:",
              data.candidate
            );
          } else {
            iceCandidateQueue.push(data.candidate);
            console.log("[signal] Queued ICE candidate:", data.candidate);
          }
        }
      } catch (err) {
        console.error("[signal] Error in signal handler:", err);
      }
    });
  },
}));

export default useSocketStore;
