import { useState, useRef, useEffect } from 'react';
import Thumbnail from './Thumbnail';

const Reproductor = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isEnd, setIsEnd] = useState(true);
    const audioRef = useRef(null);

    const handleThumbnailClick = () => {
        setIsPlaying((prev) => !prev);
        if (audioRef.current) {
            if (!isPlaying) {
                audioRef.current.play();
                setIsEnd(false);
            } else {
                audioRef.current.pause();
            }
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleAudioEnd = () => {
        setIsPlaying(false);
        setIsEnd(true);
    };

    const audioUrl = 'music/01 Wait a Minute.mp3';
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
            audioRef.current.addEventListener('ended', handleAudioEnd);
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                audioRef.current.removeEventListener('ended', handleAudioEnd);
            }
        };
    }, []);

    return (
        <>
            <Thumbnail
                onClick={handleThumbnailClick}
                isPlaying={isPlaying}
                isEnd={isEnd}
                timer={currentTime.toFixed(0)}
            >
                {children}
            </Thumbnail>
            {audioUrl && (
                <audio
                    id="audio-rep"
                    ref={audioRef}
                    src={audioUrl}
                    className="hidden"
                    preload="auto"
                />
            )}
        </>
    );
};

export default Reproductor;
