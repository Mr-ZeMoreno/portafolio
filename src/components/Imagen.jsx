import React, { useState, useRef, useEffect, useCallback } from "react";
import "../styles/imagenStyles.css";

const DIEZMINUTOS = 10 * 60 * 1000;

class Reproductor {
    constructor(reproductorRef) {
        this.reproductor = reproductorRef.current;
        this.isPlaying = false;
    }

    load(url) {
        if (url !== this.reproductor.src) {
            this.reproductor.src = url;
            this.reproductor.load();
        }
    }

    async play() {
        if (!this.isPlaying) {
            try {
                await this.reproductor.play();
                this.isPlaying = true;
            } catch (error) {
                console.error("Error playing audio:", error);
            }
        }
    }

    async pause() {
        if (this.isPlaying) {
            this.reproductor.pause();
            this.isPlaying = false;
        }
    }
}

const authenticateUser = async (username, password, setIsAuthenticated) => {
    try {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }) // Asegúrate de que el cuerpo esté en formato JSON
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Authentication failed:', errorData.error);
            setIsAuthenticated(false); // Actualizar el estado de autenticación
            return;
        }

        const data = await response.json();
        const token = data.token;
        localStorage.setItem('authToken', token);
        console.log('Authentication successful');
        setIsAuthenticated(true); // Actualizar el estado de autenticación
    } catch (error) {
        console.error('Error during authentication:', error);
        setIsAuthenticated(false); // Actualizar el estado de autenticación
    }
};

const Imagen = ({ children }) => {
    const [audioUrl, setAudioUrl] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para manejar autenticación
    const imagenRef = useRef(null);
    const reproductorRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        authenticateUser('testuser', 'password123', setIsAuthenticated); // Pasar la función setIsAuthenticated
    }, []);

    useEffect(() => {
        playerRef.current = new Reproductor(reproductorRef);

        const preloadAudio = async () => {
            try {
                // Solo intentar obtener el audio si el usuario está autenticado
                if (!isAuthenticated) {
                    console.error("User is not authenticated");
                    return;
                }

                const response = await fetch('/api/audio', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Enviar el token JWT en la cabecera
                    }
                });
                const json = await response.json();
                const newUrl = json.url || null;
                if (newUrl) {
                    playerRef.current.load(newUrl);
                    setAudioUrl(newUrl); // Guardar el URL en el estado si es necesario en otro lugar
                }
            } catch (error) {
                console.error("Error preloading audio URL:", error);
            }
        };

        preloadAudio();
    }, [isAuthenticated]); // Dependencia para recargar audio cuando la autenticación cambia

    const handleClick = useCallback(async () => {
        const imagen = imagenRef.current;
        const player = playerRef.current;

        if (!player.isPlaying) {
            imagen.classList.add("invert-color");

            try {
                await player.play();
            } catch (error) {
                console.error("Error playing audio:", error);
            }
        } else {
            imagen.classList.remove("invert-color");

            try {
                await player.pause();
            } catch (error) {
                console.error("Error pausing audio:", error);
            }
        }
    }, []);


    return (
        <>
            <div ref={imagenRef} className="imagen" onClick={handleClick}>
                {children}
            </div>
            <audio src="" className="hidden" ref={reproductorRef} preload="auto"></audio>
        </>
    );
};

export default Imagen;
