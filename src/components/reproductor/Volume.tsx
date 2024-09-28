import "../../styles/volumeStyles.css";
import { useState, useEffect, useRef } from 'react';
import { Reproductor } from "../../js/consoleObject/Reproductor/Reproductor";

export function Volume({ audioRef, className }: { audioRef: HTMLAudioElement | null, className?: string }) {
    const [volume, setVolume] = useState(1);
    const reproductorRef = useRef<Reproductor | null>(null); 

    useEffect(() => {
        if (audioRef) {
            reproductorRef.current = new Reproductor(audioRef.current);
            audioRef.volume = volume;
        }
    }, [audioRef]);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (reproductorRef.current) {
            reproductorRef.current.setVolume(newVolume);
        }
    };

    return (
        <>
            <input
                className={`opacity-0 transition-all mt-2 mb-2 ${className ? className : ""}`} 
                type="range"
                min="0"
                max="1"
                step="0.01"
                id="volume"
                value={volume}
                onChange={handleVolumeChange}
            />
        </>
    );
}
