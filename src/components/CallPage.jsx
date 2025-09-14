import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhoneSlash,
} from "react-icons/fa";
import useSocketStore from "../store/socketStore";

const CallPage = () => {
  const { id } = useParams();
  const {
    localVideo,
    setLocalVideoRef,
    setRemoteVideoRef,
    socket,
    loadingUser,
    roomId,
    setupSignalListener,
    startCall,
    connectSocket,
    disconnectSocket,
    joinRandom,
  } = useSocketStore();

  const navigate = useNavigate();
  const localRef = useRef(null);
  const remoteRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [roomIdUse, setRoomId] = useState("");
  const [redirecting, setRedirecting] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const [remoteStreamAvailable, setRemoteStreamAvailable] = useState(false);
  const peerRef = useRef(null); // Ensure peerRef is defined
  // Setup peer connection and handle remote stream robustly

  useEffect(() => {
    if (
      remoteRef.current !== remoteVideoRef.current &&
      remoteVideoRef.current
    ) {
      remoteVideoRef.current = remoteRef.current;
      console.log("Remote video element updated", remoteRef.current);
    }
  }, [remoteRef.current, remoteVideoRef.current]);

  useEffect(() => {
    if (!socket || !localVideo) return;

    // Only create peer connection once
    if (!peerRef.current) {
      peerRef.current = new window.RTCPeerConnection();
    }
    const peer = peerRef.current;

    // Always add local stream tracks to peer connection
    if (localVideo && localVideo.getTracks) {
      // Remove all existing senders before adding new tracks
      peer.getSenders().forEach((sender) => {
        peer.removeTrack(sender);
      });
      localVideo.getTracks().forEach((track) => {
        peer.addTrack(track, localVideo);
      });
    }

    // Always set remote video on ontrack
    peer.ontrack = (event) => {
      if (remoteRef.current) {
        remoteRef.current.srcObject = event.streams[0];
        setRemoteStreamAvailable(true);
      }
    };

    // ICE candidate handling
    peer.onicecandidate = (event) => {
      const room = localStorage.getItem("activeRoom") || roomId || roomId;
      if (event.candidate) {
        console.log("ICE candidate:", event.candidate);
        socket.emit("signal", {
          roomId: room,
          data: { candidate: event.candidate },
        });
      } else {
        console.log("ICE candidate event but no candidate (end of candidates)");
      }
    };

    return () => {
      if (peer) {
        peer.ontrack = null;
        peer.onicecandidate = null;
      }
    };
  }, [localVideo, socket, roomId]);
  useEffect(() => {
    if (!socket) return;
    const handleRoomReady = (payload) => {
      (async () => {
        const roomId =
          typeof payload === "object" && payload.roomId
            ? payload.roomId
            : payload;
        console.log("Room ready, navigating to:", roomId);
        localStorage.setItem("activeRoom", roomId);
        setRoomId(roomId);
        startCall();

        let tries = 0;
        while (!peerRef.current && tries < 10) {
          console.log("⏳ Waiting for peer to be created...");
          await new Promise((res) => setTimeout(res, 200));
          tries++;
        }

        const peer = peerRef.current;
        if (!peer) {
          console.error("❌ Peer not ready even after waiting");
          return;
        }

        try {
          const offer = await peer.createOffer();
          await peer.setLocalDescription(offer);
          socket.emit("signal", { roomId: roomId, data: { offer } });
          console.log("✅ Offer sent", offer);
        } catch (err) {
          console.error("❌ Failed to create/send offer", err);
        }
      })();
    };
    socket.on("room-ready", handleRoomReady);
    return () => {
      socket.off("room-ready", handleRoomReady);
    };
  }, [socket, startCall, navigate]);

  useEffect(() => {
    if (
      remoteRef.current !== remoteVideoRef.current &&
      remoteVideoRef.current
    ) {
      remoteVideoRef.current = remoteRef.current;
      console.log("Remote video element updated", remoteRef.current);
    }
  }, [remoteRef.current, remoteVideoRef.current]);

  const handleMouseDown = (e) => {
    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    offset.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    };
    setDragging(true);
  };

  useEffect(() => {
    socket?.on("room-joined", (room) => {
      setRoomId(room);
      // Doctor: call startCall and setupSignalListener after joining
      startCall();
      setupSignalListener();
    });

    socket?.on("ready", async () => {
      // Patient: call startCall and setupSignalListener after ready
      startCall();
      setupSignalListener();
      // Wait for peer connection
      let tries = 0;
      while (!peerRef.current && tries < 10) {
        await new Promise((res) => setTimeout(res, 200));
        tries++;
      }
      const peer = peerRef.current;
      if (!peer) return;
      try {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        console.log("4");
        socket.emit("signal", { roomId, data: { offer } });
      } catch (err) {
        console.error("Failed to create/send offer", err);
      }
    });

    // ICE candidate queue for race condition
    let iceCandidateQueue = [];
    socket?.on("signal", async (data) => {
      const peer = peerRef.current;
      if (!peer) return;
      if (data.offer) {
        await peer.setRemoteDescription(new RTCSessionDescription(data.offer));
        // Add any queued ICE candidates
        if (iceCandidateQueue.length > 0) {
          for (const candidate of iceCandidateQueue) {
            try {
              await peer.addIceCandidate(new RTCIceCandidate(candidate));
              console.log("Added queued ICE candidate", candidate);
            } catch (err) {
              console.error("Error adding queued ICE candidate", err);
            }
          }
          iceCandidateQueue = [];
        }
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        socket.emit("signal", { roomId: roomId, data: { answer } });
      } else if (data.answer) {
        await peer.setRemoteDescription(new RTCSessionDescription(data.answer));
        // Add any queued ICE candidates
        if (iceCandidateQueue.length > 0) {
          for (const candidate of iceCandidateQueue) {
            try {
              await peer.addIceCandidate(new RTCIceCandidate(candidate));
              console.log("Added queued ICE candidate", candidate);
            } catch (err) {
              console.error("Error adding queued ICE candidate", err);
            }
          }
          iceCandidateQueue = [];
        }
      } else if (data.candidate) {
        try {
          // Only add ICE candidate if remote description is set
          if (peer.remoteDescription && peer.remoteDescription.type) {
            await peer.addIceCandidate(new RTCIceCandidate(data.candidate));
            console.log("Added ICE candidate immediately", data.candidate);
          } else {
            iceCandidateQueue.push(data.candidate);
            console.log("Queued ICE candidate", data.candidate);
          }
        } catch (err) {
          console.error("Error adding ICE candidate", err);
        }
      }
    });

    socket?.on("user-disconnected", () => {
      remoteVideoRef.current.srcObject = null;
      setRoomId(null);
      navigate("/");
      if (peerRef.current) {
        peerRef.current.close();
        peerRef.current = null;
      }
    });

    return () => {
      socket &&
        (socket.off("room-joined"),
        socket.off("ready"),
        socket.off("signal"),
        socket.off("user-disconnected"));
    };
  }, [roomId]);

  const handleTouchMove = (e) => {
    if (!dragging) return;
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - offset.current.x,
      y: touch.clientY - offset.current.y,
    });
  };

  const handleTouchEnd = () => {
    setDragging(false);
  };
  useEffect(() => {
    if (!socket) {
      navigate("/");
    }
  }, [socket, navigate]);

  // Save video refs to store
  useEffect(() => {
    setLocalVideoRef(localRef);
    setRemoteVideoRef(remoteRef);
    console.log(remoteRef, "this is remote ref");
  }, [setLocalVideoRef, setRemoteVideoRef, remoteRef]);

  // Attach local stream to video element
  useEffect(() => {
    if (localRef.current && localVideo) {
      localRef.current.srcObject = localVideo;
    }
  }, [localVideo]);

  // Listen for remote stream attach by watching remoteRef's srcObject
  useEffect(() => {
    const remoteVideoEl = remoteRef.current;

    if (!remoteVideoEl) return;

    const checkRemoteStream = () => {
      if (remoteVideoEl.srcObject) {
        setRemoteStreamAvailable(true);
      }
    };

    // Also listen to 'loadedmetadata' event as video stream is ready to play
    remoteVideoEl.addEventListener("loadedmetadata", () => {
      setRemoteStreamAvailable(true);
      remoteVideoEl.play().catch(() => {});
    });

    // Initial check
    checkRemoteStream();

    return () => {
      remoteVideoEl.removeEventListener("loadedmetadata", () => {});
    };
  }, [remoteRef]);

  // Setup socket listeners once socket is ready
  useEffect(() => {
    if (!socket) return;

    setupSignalListener();
    // joinRandom();

    socket.on("user-disconnected", () => {
      navigate("/");
      toast.error("User disconnected 🤦‍♂️🤷‍♂️");
    });

    return () => {
      if (socket) {
        socket.off("signal");
        socket.off("room-joined");
        socket.off("ready");
        socket.off("user-disconnected");
        // disconnectSocket(roomId);
      }
    };
  }, [
    socket,
    roomId,
    navigate,
    setupSignalListener,
    joinRandom,
    disconnectSocket,
  ]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      disconnectSocket(socket, roomId);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [socket, roomId, disconnectSocket]);
  const startPollingForRemote = () => {
    startCall();

    socket.emit("retry-call", {
      roomId,
      data: {
        type: "poll",
        message: "Retrying connection or signaling...",
      },
    });

    setupSignalListener();
    let intervalId = setInterval(() => {
      if (remoteRef.current) {
        clearInterval(intervalId);
        intervalId = null;
      } else {
        console.log("Polling: calling setupSignalListener");
      }
    }, 5000);
    startCall();
    // Optionally call immediately once
    if (!remoteRef.current) {
      startCall();
      setupSignalListener();
      console.log("Immediate call to setupSignalListener");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {redirecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-xl shadow-lg px-8 py-6 flex flex-col items-center">
            <span className="text-blue-600 text-xl font-bold mb-2">
              Redirecting to active call...
            </span>
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      {/* Header - sticky navbar */}
      <div className="relative w-screen h-screen">
        <video
          ref={localRef}
          autoPlay
          muted
          playsInline
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="w-32 h-48 object-cover rounded-2xl transform scale-x-[-1] z-10 cursor-move absolute"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        />

        <video
          ref={remoteRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover transform scale-x-[-1]"
        />

        {/* Show message if remote stream is NOT available */}
        {!remoteStreamAvailable && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-white text-center p-4">
            <h2 className="text-xl font-bold mb-2">
              waiting for user to join...
            </h2>
            <p>
              Please check your internet connection or wait for the other user
              to join.
            </p>
            <button
              onClick={() => {
                startPollingForRemote();
              }}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallPage;
