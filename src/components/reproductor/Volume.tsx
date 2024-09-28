import "../../styles/volumeStyles.css"
import { useState } from 'react';

export function Volume({ audioRef, className }: { audioRef: HTMLAudioElement, className: string }) {
    const [volume, setVolume] = useState(1);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef) {
            audioRef.volume = newVolume;
        }
    };

    return (
        <>
            <input className={`volume opacity-0 transition-all mt-2 mb-2 ${className ? className : " "}`} 
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
