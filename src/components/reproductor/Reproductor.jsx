import { useState, useRef } from 'react';
import Thumbnail from './Thumbnail';

const Reproductor = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const handleThumbnailClick = () => {
        setIsPlaying((prev) => !prev);
        if (audioRef.current) {
            if (!isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    };

    const audioUrl = 'music/01 Wait a Minute.mp3';

    return (
        <>
            <Thumbnail onClick={handleThumbnailClick} isPlaying={isPlaying}>
                {children}
            </Thumbnail>
            {audioUrl && (
                <audio ref={audioRef} src={audioUrl} className="hidden" preload="auto" />
            )}
        </>
    );
};

export default Reproductor;
