import React from "react";

const LoadingResponse = () => {
  return (
    <div className="flex justify-center items-center space-x-2 h-12 w-32">
      <span className="w-2.5 h-2.5 bg-[#d1eee0] rounded-full animate-bounce [animation-duration:0.5s]" />
      <span className="w-2.5 h-2.5 bg-[#d1eee0] rounded-full animate-bounce [animation-duration:0.5s] [animation-delay:0.16s]" />
      <span className="w-2.5 h-2.5 bg-[#d1eee0] rounded-full animate-bounce [animation-duration:0.5s] [animation-delay:0.32s]" />
      <span className="w-2.5 h-2.5 bg-[#d1eee0] rounded-full animate-bounce [animation-duration:0.5s] [animation-delay:0.48s]" />
    </div>
  );
};

export default LoadingResponse;
