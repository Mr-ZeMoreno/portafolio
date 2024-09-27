import "../../styles/imagenStyles.css";

const Thumbnail = ({ onClick, isPlaying, children }) => {
    return (
        <div className={`imagen ${isPlaying ? 'invert-color' : ''}`} onClick={onClick}>
            {children}
        </div>
    );
};

export default Thumbnail;
