import { useState, useRef, useEffect } from 'react';
import Thumbnail from './Thumbnail';
import { ConsoleManager } from '../../js/consoleObject/consoleManager';
import { $, clases, dotClass } from "../../js/utils";

const Reproductor = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isEnd, setIsEnd] = useState(true);
    const audioRef = useRef(null);
    const consoleRef = useRef(null);

    useEffect(() => {
        const $consola = $(dotClass(clases.CONSOLA));
        consoleRef.current = new ConsoleManager($consola);

        const audio = audioRef.current;
        if (audio) {
            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('ended', handleAudioEnd);
        }

        return () => {
            if (audio) {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('ended', handleAudioEnd);
            }
        };
    }, []);

    const handleThumbnailClick = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                consoleRef.current.play();
            } else {
                consoleRef.current.pause();
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

        consoleRef.current.appendMessage("La canción ha terminado", "middle-msg");
    };

    const AudioAttributes = {
        Name: "'Wait a Minute' de SnakeCity",
        Url: "music/01 Wait a Minute.mp3"
    };



    return (
        <>
            <Thumbnail
                onClick={handleThumbnailClick}
                isPlaying={isPlaying}
                isEnd={isEnd}
                timer={currentTime.toFixed(0)}
                audioRef={audioRef}

            >
                {children}
            </Thumbnail>
            {AudioAttributes.Url && (
                <audio
                    id="audio-rep"
                    name={AudioAttributes.Name}
                    ref={audioRef}
                    src={AudioAttributes.Url}
                    className="hidden"
                    preload="auto"
                />
            )}
        </>
    );
};

export default Reproductor;
