import "../../styles/imagenStyles.css";

const Thumbnail = ({ onClick, isPlaying, isEnd, timer, children }) => {
    return (
        <div className={`imagen flex h-[250px] md:h-[100%] ${isPlaying ? 'invert-color' : ''}`} onClick={onClick}>
            {children}
            <span className={`ml-auto mr-[5px] ${isEnd ? 'hidden' : ''}`} >{timer} s</span>
        </div>
    );
};

export default Thumbnail;
