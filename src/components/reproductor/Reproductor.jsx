import { useState, useRef, useEffect } from 'react';
import Thumbnail from './Thumbnail.tsx';
import { ConsoleManager, messageFormat } from '../../js/consoleObject/consoleManager.ts';
import { Reproductor as Rep } from '../../js/consoleObject/Reproductor/Reproductor.ts';

const Reproductor = ({ children }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);
    const consoleElementRef = useRef(null);
    const consoleRef = useRef(null);
    const reproductorRef = useRef(null);

    useEffect(() => {
        consoleRef.current = new ConsoleManager();
        consoleElementRef.current = consoleRef.current.getConsola();
        reproductorRef.current = new Rep();

        audioRef.current = reproductorRef.current.getRep();

        if (audioRef.current) {
            reproductorRef.current.onTimeUpdate(handleTimeUpdate, true);
            reproductorRef.current.onEnd(handleAudioEnd, true);
        }

        return () => {
            if (audioRef.current) {
                reproductorRef.current.onTimeUpdate(handleTimeUpdate, false);
                reproductorRef.current.onEnd(handleAudioEnd, false);
            }
        };
    }, []);

    const handleThumbnailClick = () => {
        if (reproductorRef.current) {
            if (!reproductorRef.current.isPlaying()) {
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
        consoleRef.current.appendMessage("La canción ha terminado", messageFormat.middle);
    };

    const AudioAttributes = {
        Name: "'Wait a Minute' de SnakeCity",
        Url: "music/01 Wait a Minute.mp3"
    };

    return (
        <>
            <Thumbnail
                onClick={handleThumbnailClick}
                timer={currentTime.toFixed(0)}
                audioRef={audioRef}
            >
                {children}
            </Thumbnail>
            {AudioAttributes.Url && (
                <audio
                    id="audio-rep"
                    name={AudioAttributes.Name}
                    src={AudioAttributes.Url}
                    preload="auto"
                    ref={(el) => (audioRef.current = el)}
                />
            )}
        </>
    );
};

export default Reproductor;
