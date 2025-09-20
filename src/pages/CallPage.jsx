import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMic,
  FiVideo,
  FiPhone,
  FiMessageCircle,
  FiUserPlus,
  FiSettings,
  FiMaximize,
} from "react-icons/fi";
import { toast } from "react-toastify";
const CallPageLoad = () => {
  const { id } = useParams();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
  };

  const elementVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Topbar */}
      <motion.div
        className="w-full max-w-5xl flex items-center justify-between mb-4"
        variants={elementVariants}
      >
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-emerald-700">
            Video Call Room
          </h1>
          <div className="text-sm text-gray-600">
            Meeting ID: <span className="font-mono text-emerald-500">{id}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-3 py-2 rounded-lg bg-white shadow flex items-center gap-2"
          >
            <FiUserPlus /> Invite
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-3 py-2 rounded-lg bg-white shadow flex items-center gap-2"
          >
            <FiSettings /> Settings
          </motion.button>
        </div>
      </motion.div>

      {/* One-to-one video call UI */}
      <motion.div
        className="relative w-full max-w-5xl h-[520px] bg-white rounded-2xl shadow-lg overflow-hidden flex"
        variants={elementVariants}
      >
        {/* Remote video */}
        <div className="flex-1 bg-slate-200 flex items-center justify-center text-gray-600 text-lg">
          Remote Video
        </div>

        {/* Local video overlay */}
        <div className="absolute bottom-24 right-8 w-44 h-32 bg-slate-300 rounded-lg shadow-md flex items-center justify-center text-sm text-gray-700">
          You
        </div>

        {/* Top-right toolbar */}
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="p-2 rounded-full bg-white shadow"
          >
            <FiMaximize />
          </motion.button>
        </div>
      </motion.div>

      {/* Bottom controls */}
      <motion.div
        className="mt-6 flex gap-5 bg-white rounded-full px-6 py-3 shadow-lg"
        variants={elementVariants}
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-full hover:bg-emerald-50"
        >
          <FiMic className="text-emerald-600 text-xl" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-full hover:bg-emerald-50"
        >
          <FiVideo className="text-emerald-600 text-xl" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-full hover:bg-emerald-50"
        >
          <FiMessageCircle className="text-emerald-600 text-xl" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600"
        >
          <FiPhone className="text-xl" />
        </motion.button>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="mt-4 text-xs text-gray-500"
        variants={elementVariants}
      >
        Encrypted • HD Quality • Stable Connection
      </motion.div>
    </motion.div>
  );
};

export default CallPageLoad;
