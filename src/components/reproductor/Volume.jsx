import "../../styles/volumeStyles.css"
import { useState } from 'react';

export function Volume({audioRef, className}){
    const [volume, setVolume] = useState(1); 

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };
    return (
        <>
            <input className={`volume opacity-0 transition-all ${className}`} 
                type="range"
                min="0"
                max="1"
                step="0.01"
                id="volume"
                value={volume}
                onChange={handleVolumeChange}
            />
        </>
    )
}