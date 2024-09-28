import { useState, useRef, useEffect } from 'react';
import Thumbnail from './Thumbnail';
import { Console } from '../../js/commandConsole';
import { $, clases, dotClass } from "../../js/utils";

const Reproductor = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isEnd, setIsEnd] = useState(true);
    const audioRef = useRef(null);
    const consoleRef = useRef(null);

    useEffect(() => {
        const $consola = $(dotClass(clases.CONSOLA));
        consoleRef.current = new Console($consola);

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
        // Verificar si el audio ya está reproduciéndose o está en pausa
        if (audioRef.current) {
            if (audioRef.current.paused) {
                play(); // Si está en pausa, reproducir
            } else {
                pause(); // Si está reproduciendo, pausar
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
        consoleRef.current.appendChild("La canción ha terminado", "middle-msg");
    };

    const AudioAttributes = {
        Name: "'Wait a Minute' de SnakeCity",
        Url: "music/01 Wait a Minute.mp3"
    };

    const play = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.play();
            setIsPlaying(true);
            setIsEnd(false);
            consoleRef.current.play(); // Llama al método play de la consola
        }
    };

    const pause = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            setIsPlaying(false);
            consoleRef.current.pause(); // Llama al método pause de la consola
        }
    };

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
