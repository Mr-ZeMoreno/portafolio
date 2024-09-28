import "../../styles/imagenStyles.css";
import { Volume } from "./Volume.tsx";
import React from 'react';

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
  children 
}) => {
  return (
    <>
      <button
        title="Reproducir música"
        className={`imagen flex h-[250px] md:h-[100%]`}
        onClick={onClick}
      >
        {children}
        <div className="ml-auto mr-[5px] flex items-center justify-between flex-col h-full pb-3">
          <span id="timer" className="opacity-0">{timer} s</span>
        </div>
      </button>
      <Volume audioRef={audioRef} />
    </>
  );
};

export default Thumbnail;
