import "../../styles/imagenStyles.css";
import { Volume } from "./Volume";

const Thumbnail = ({ audioRef, onClick, isPlaying, isEnd, timer, children }) => {
    return (
<>
<button 
    title="Reproducir música" 
    className={`imagen flex h-[250px] md:h-[100%] ${isPlaying ? 'invert-color' : ''} `} 
    onClick={onClick}
>
    {children}
    <div className="ml-auto mr-[5px] flex items-center justify-between flex-col h-full pb-3">
    <span id="timer" className={`${isEnd ? 'opacity-0' : ''}`}>{timer} s</span>
    </div>
</button>
<Volume 
    audioRef={audioRef} 
    />
</>

    );
};

export default Thumbnail;
