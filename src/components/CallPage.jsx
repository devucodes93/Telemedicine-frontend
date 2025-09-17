import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
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
      }
    };

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
  }, [roomId, socket, setupSignalListener, startCall, navigate]);

  useEffect(() => {
    if (!socket) {
      navigate("/");
    }
  }, [socket, navigate]);

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
  }, [socket, navigate, setupSignalListener, joinRandom, disconnectSocket]);

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
      fetch("http://localhost:5000/api/booking/doctor-live", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: user.id,
          status: true,
          bookingId: roomId,
        }),
      });
    }
    return () => {
      user.role === "Doctor" &&
        fetch("http://localhost:5000/api/booking/doctor-live", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            doctorId: user.id,
            status: false,
            bookingId: roomId,
          }),
        });
    };
  }, [roomId]);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex flex-col"
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
              className="bg-white rounded-xl shadow-lg px-8 py-6 flex flex-col items-center"
              variants={overlayVariants}
            >
              <motion.span
                className="text-emerald-600 text-xl font-bold mb-2"
                variants={videoVariants}
              >
                Redirecting to active call...
              </motion.span>
              <motion.div
                className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"
                variants={videoVariants}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative w-screen h-screen">
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
          className="w-32 h-48 object-cover rounded-xl transform scale-x-[-1] z-10 cursor-move absolute shadow-md"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
          variants={videoVariants}
        />
        <motion.video
          ref={remoteRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover transform scale-x-[-1]"
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
                className="text-xl sm:text-2xl font-bold mb-2"
                variants={videoVariants}
              >
                Waiting for user to join...
              </motion.h2>
              <motion.p
                className="text-sm sm:text-base max-w-md"
                variants={videoVariants}
              >
                Please check your internet connection or wait for the other user to join.
              </motion.p>
              <motion.button
                onClick={startPollingForRemote}
                className="mt-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Retry
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CallPage;