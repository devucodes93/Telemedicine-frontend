import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhoneSlash,
  FaShareSquare,
  FaUsers,
} from "react-icons/fa";
import useSocketStore from "../store/socketStore";
import { toast } from "react-toastify";

const CallPage = () => {
  const [showLocalMirror, setShowLocalMirror] = useState(false);
  const [showRetry, setShowRetry] = useState(false);
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
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const [remoteStreamAvailable, setRemoteStreamAvailable] = useState(false);
  const peerRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const overlayVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const videoVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  // WebRTC and socket logic (unchanged)
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
    if (!socket) {
      navigate("/");
      return null;
    }
  }, [socket, navigate]);
  useEffect(() => {
    if (!socket || !localVideo) return;
    if (!peerRef.current) {
      peerRef.current = new window.RTCPeerConnection();
    }
    const peer = peerRef.current;
    if (localVideo && localVideo.getTracks) {
      peer.getSenders().forEach((sender) => {
        peer.removeTrack(sender);
      });
      localVideo.getTracks().forEach((track) => {
        peer.addTrack(track, localVideo);
      });
    }
    peer.ontrack = (event) => {
      if (remoteRef.current) {
        remoteRef.current.srcObject = event.streams[0];
        setRemoteStreamAvailable(true);
      }
    };
    peer.onicecandidate = (event) => {
      const room = localStorage.getItem("activeRoom") || roomId || id;
      if (event.candidate) {
        console.log("ICE candidate:", event.candidate);
        socket.emit("signal", {
          roomId: room,
          data: { candidate: event.candidate },
        });
      } else {
        console.log("ICE candidate event but no candidate (end of candidates)");
        // If no remote video after ICE candidates, start timeout to show local mirror
        setTimeout(() => {
          if (!remoteStreamAvailable) {
            setShowLocalMirror(true);
          }
        }, 4000); // 4 seconds after ICE end
      }
    };
    // If remote video doesn't arrive in 8 seconds, show local mirror
    const timeoutId = setTimeout(() => {
      if (!remoteStreamAvailable) {
        setShowLocalMirror(true);
      }
    }, 8000);
    return () => clearTimeout(timeoutId);
    return () => {
      if (peer) {
        peer.ontrack = null;
        peer.onicecandidate = null;
      }
    };
  }, [localVideo, socket, roomId, id]);

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
  }, [socket, startCall]);

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
    offset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
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
    socket?.on("room-joined", (room) => {
      setRoomId(room);
      startCall();
      setupSignalListener();
    });
    socket?.on("ready", async () => {
      startCall();
      setupSignalListener();
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
    let iceCandidateQueue = [];
    socket?.on("signal", async (data) => {
      const peer = peerRef.current;
      if (!peer) return;
      if (data.offer) {
        if (
          peer.signalingState === "stable" ||
          peer.signalingState === "have-remote-offer"
        ) {
          await peer.setRemoteDescription(
            new RTCSessionDescription(data.offer)
          );
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
        } else {
          console.warn(
            "Skipped setRemoteDescription(offer) due to signalingState:",
            peer.signalingState
          );
        }
      } else if (data.answer) {
        if (peer.signalingState === "have-local-offer") {
          await peer.setRemoteDescription(
            new RTCSessionDescription(data.answer)
          );
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
        } else {
          console.warn(
            "Skipped setRemoteDescription(answer) due to signalingState:",
            peer.signalingState
          );
        }
      } else if (data.candidate) {
        try {
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
    socket.on("user-disconnected", () => {
      setShowRetry(true);
    });
    const handleRetry = () => {
      setShowRetry(false);
      if (disconnectSocket) disconnectSocket(socket, roomId);
      if (connectSocket) connectSocket();
      if (roomId && joinRandom) joinRandom(roomId);
    };
    return () => {
      socket &&
        (socket.off("room-joined"),
        socket.off("ready"),
        socket.off("signal"),
        socket.off("user-disconnected"));
    };
  }, [roomId, socket, setupSignalListener, startCall, navigate]);

  useEffect(() => {
    setLocalVideoRef(localRef);
    setRemoteVideoRef(remoteRef);
    console.log(remoteRef, "this is remote ref");
  }, [setLocalVideoRef, setRemoteVideoRef]);

  useEffect(() => {
    if (localRef.current && localVideo) {
      localRef.current.srcObject = localVideo;
    }
  }, [localVideo]);

  useEffect(() => {
    const remoteVideoEl = remoteRef.current;
    if (!remoteVideoEl) return;
    const checkRemoteStream = () => {
      if (remoteVideoEl.srcObject) {
        setRemoteStreamAvailable(true);
      }
    };
    remoteVideoEl.addEventListener("loadedmetadata", () => {
      setRemoteStreamAvailable(true);
      remoteVideoEl.play().catch(() => {});
    });
    checkRemoteStream();
    return () => {
      remoteVideoEl.removeEventListener("loadedmetadata", () => {});
    };
  }, [remoteRef]);

  useEffect(() => {
    if (!socket) return;
    socket.on("user-disconnected", () => {
      if (disconnectSocket) disconnectSocket(socket, roomId);
      navigate("/");
    });
    return () => {
      if (socket) {
        socket.off("signal");
        socket.off("room-joined");
        socket.off("ready");
        socket.off("user-disconnected");
      }
    };
  }, [socket, setupSignalListener, joinRandom, disconnectSocket]);

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
      data: { type: "poll", message: "Retrying connection or signaling..." },
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
    if (!remoteRef.current) {
      startCall();
      setupSignalListener();
      console.log("Immediate call to setupSignalListener");
    }
  };

  useEffect(() => {
    const userFromLocal = localStorage.getItem("user");
    const user = userFromLocal ? JSON.parse(userFromLocal) : null;
    if (user && user.role !== "Doctor") {
      return;
    } else {
      fetch(
        "https://telemedicine-backend-2.onrender.com/api/booking/doctor-live",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            doctorId: user.id,
            status: true,
            bookingId: roomId,
          }),
        }
      );
    }
    return () => {
      user.role === "Doctor" &&
        fetch(
          "https://telemedicine-backend-2.onrender.com/api/booking/doctor-live",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              doctorId: user.id,
              status: false,
              bookingId: roomId,
            }),
          }
        );
    };
  }, [roomId]);

  // Button functionality
  const toggleMute = () => {
    if (localVideo && localVideo.getAudioTracks) {
      localVideo.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
        setIsMuted(!track.enabled);
      });
    }
  };

  const toggleVideo = () => {
    if (localVideo && localVideo.getVideoTracks) {
      localVideo.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
        setIsVideoOff(!track.enabled);
      });
    }
  };

  const handleLeave = () => {
    navigate("/"); // if using react-router
    socket.emit("leave-room", { roomId });
    window.location.reload();
    if (disconnectSocket) disconnectSocket(socket, roomId);
  };

  const handleShareScreen = () => {
    toast.info("This feature is coming soon!");
    // Placeholder for screen sharing logic
    console.log("Screen sharing initiated");
    // Implement actual screen sharing logic here if needed
  };
  useEffect(() => {
    socket.on("user-left", (data) => {
      const { roomId } = data;
      if (id == roomId) {
        toast.info("The other user has left the call.");
        navigate("/");
      }
    });
  }, []);
  const handleParticipants = () => {
    toast.info("Participants panel feature is coming soon!");
    // Placeholder for participants panel logic
    console.log("Participants panel toggled");
    // Implement actual participants panel logic here if needed
  };

  return (
    <motion.div
      className="min-h-screen bg-emerald-950 flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {redirecting && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="bg-emerald-900 rounded-xl shadow-lg px-6 sm:px-8 py-6 flex flex-col items-center"
              variants={overlayVariants}
            >
              <motion.span
                className="text-emerald-400 text-lg sm:text-xl font-bold mb-2 text-center"
                variants={videoVariants}
              >
                Redirecting to active call...
              </motion.span>
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"
                variants={videoVariants}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 px-4 py-2"
        variants={videoVariants}
      >
        <h1 className="text-xl sm:text-3xl font-bold text-emerald-400">
          Telecure Meet
        </h1>
        <div className="text-sm sm:text-lg text-gray-300">
          Call ID: <span className="font-mono text-emerald-400">{id}</span>
        </div>
      </motion.div>

      {/* Video Area */}
      <div className="relative flex-grow w-full max-w-5xl mx-auto h-[50vh] sm:h-[70vh]">
        {showLocalMirror ? (
          <motion.video
            ref={localRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover rounded-lg sm:rounded-xl bg-emerald-900 transform scale-x-[-1]"
            variants={videoVariants}
          />
        ) : (
          <>
            <motion.video
              ref={remoteRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover rounded-lg sm:rounded-xl bg-emerald-900"
              variants={videoVariants}
            />
            <motion.video
              ref={localRef}
              autoPlay
              muted
              playsInline
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="w-24 h-32 sm:w-32 sm:h-48 object-cover rounded-lg sm:rounded-xl transform scale-x-[-1] absolute shadow-md cursor-move z-10 border-2 border-emerald-500"
              style={{ left: `${position.x}px`, top: `${position.y}px` }}
              variants={videoVariants}
            />
            <AnimatePresence>
              {!remoteStreamAvailable && (
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-white text-center p-4"
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.h2
                    className="text-lg sm:text-2xl font-bold mb-2"
                    variants={videoVariants}
                  >
                    Waiting for user to join...
                  </motion.h2>
                  <motion.p
                    className="text-xs sm:text-base max-w-md"
                    variants={videoVariants}
                  >
                    Please check your internet connection or wait for the other
                    user to join.
                  </motion.p>
                  <motion.button
                    onClick={startPollingForRemote}
                    className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all text-sm sm:text-base"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Retry
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Controls Bar */}
      <motion.div
        className="w-full max-w-5xl mx-auto flex flex-wrap justify-center gap-3 mt-4 p-3 sm:p-4 bg-emerald-900 rounded-lg sm:rounded-xl shadow-lg"
        variants={videoVariants}
      >
        <motion.button
          onClick={toggleMute}
          className={`flex flex-col items-center px-3 sm:px-4 py-2 rounded-lg transition-colors text-white ${
            isMuted
              ? "bg-red-600 hover:bg-red-500"
              : "bg-emerald-700 hover:bg-emerald-600"
          }`}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {isMuted ? (
            <FaMicrophoneSlash className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <FaMicrophone className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
          <span className="text-[10px] sm:text-xs mt-1">
            {isMuted ? "Unmute" : "Mute"}
          </span>
        </motion.button>

        <motion.button
          onClick={toggleVideo}
          className={`flex flex-col items-center px-3 sm:px-4 py-2 rounded-lg transition-colors text-white ${
            isVideoOff
              ? "bg-red-600 hover:bg-red-500"
              : "bg-emerald-700 hover:bg-emerald-600"
          }`}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {isVideoOff ? (
            <FaVideoSlash className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <FaVideo className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
          <span className="text-[10px] sm:text-xs mt-1">
            {isVideoOff ? "Video On" : "Video Off"}
          </span>
        </motion.button>

        <motion.button
          onClick={handleShareScreen}
          className="flex flex-col items-center px-3 sm:px-4 py-2 bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-colors text-white"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <FaShareSquare className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-[10px] sm:text-xs mt-1">Share</span>
        </motion.button>

        <motion.button
          onClick={handleParticipants}
          className="flex flex-col items-center px-3 sm:px-4 py-2 bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-colors text-white"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <FaUsers className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-[10px] sm:text-xs mt-1">Participants</span>
        </motion.button>

        <motion.button
          onClick={() => handleLeave()}
          className="flex flex-col items-center px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors text-white"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <FaPhoneSlash className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-[10px] sm:text-xs mt-1">Leave</span>
        </motion.button>
      </motion.div>

      {/* Retry Overlay */}
      {showRetry && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-emerald-900 rounded-xl shadow-lg p-6 sm:p-8 flex flex-col items-center">
            <h2 className="text-base sm:text-lg font-bold mb-4 text-red-400">
              Connection lost
            </h2>
            <button
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold shadow transition text-sm sm:text-base"
              onClick={() => {
                setShowRetry(false);
                if (disconnectSocket) disconnectSocket(socket, roomId);
                if (connectSocket) connectSocket();
                if (roomId && joinRandom) joinRandom(roomId);
              }}
            >
              Retry Call
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CallPage;
