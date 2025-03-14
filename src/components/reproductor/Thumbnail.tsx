import "../../styles/imagenStyles.css";
import { Volume } from "./Volume.tsx";
import React from "react";

interface ThumbnailProps {
  audioRef: HTMLAudioElement;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isPlaying: boolean;
  isEnd: boolean;
  timer: string;
  children: React.ReactNode;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  audioRef,
  onClick,
  timer,
  children,
}) => {
  return (
    <>
      <button
        title="Reproducir música"
        className={`imagen flex h-[250px] md:h-[100%] ml-auto w-full mr-auto md:ml-0 md:mr-0`}
        onClick={onClick}
      >
        {children}
        <div className="ml-auto mr-[5px] flex items-center justify-between flex-col h-full pb-3">
          <span id="timer" className="opacity-0 transition-all duration-200">
            {timer} s
          </span>
        </div>
      </button>
      <Volume audioRef={audioRef} className="transition-all duration-200" />
    </>
  );
};

export default Thumbnail;
