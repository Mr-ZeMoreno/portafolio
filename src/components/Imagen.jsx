import React, { useState, useRef } from "react";
import "../styles/imagenStyles.css";

const DIEZMINUTOS = 10 * 60 * 1000;

const Imagen = ({ children }) => {
    const [isFirstClick, setIsFirstClick] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [audioUrlExpiry, setAudioUrlExpiry] = useState(null);
    const imagenRef = useRef(null);
    const reproductorRef = useRef(null);

    const fetchAudioUrl = async () => {
        const now = Date.now();
        if (audioUrl && audioUrlExpiry && now < audioUrlExpiry) {
            return audioUrl;
        }

        try {
            const response = await fetch('/api/audio');
            const json = await response.json();
            const newUrl = json.url || null;
            setAudioUrl(newUrl);
            setAudioUrlExpiry(now + DIEZMINUTOS);
            return newUrl;
        } catch (error) {
            console.error("Error fetching audio URL:", error);
            return null;
        }
    };

    const handleClick = async () => {
        const imagen = imagenRef.current;
        const reproductor = reproductorRef.current;

        imagen.classList.toggle("invert-color");

        const newAudioUrl = imagen.classList.contains("invert-color")
            ? await fetchAudioUrl()
            : null;

        if (isFirstClick) {
            imagen.classList.add("first-click");
            setIsFirstClick(false);
        } else if (!imagen.classList.contains("invert-color")) {
            imagen.classList.remove("first-click");
        }

        if (newAudioUrl) {
            if (newAudioUrl !== reproductor.src) {
                reproductor.src = newAudioUrl;
                reproductor.load();
            }
            if (!isPlaying) {
                try {
                    await reproductor.play();
                    setIsPlaying(true);
                } catch (error) {
                    console.error("Error playing audio:", error);
                }
            }
        } else {
            if (isPlaying) {
                reproductor.pause();
                reproductor.currentTime = 0;
                setIsPlaying(false);
            }
        }
    };

    return (
        <>
            <div
                ref={imagenRef}
                className="imagen"
                onClick={handleClick}
            >
                {children}
            </div>
            <audio src="" className="hidden" ref={reproductorRef}></audio>
        </>
    );
};

export default Imagen;
