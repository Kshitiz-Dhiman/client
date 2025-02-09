import { React, createContext, useRef, useEffect, useState } from 'react'


export const AudioPlayerData = createContext();

const AudioPlayerContext = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackTime, setTrackTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef(null);
    const progressRef = useRef(null);
    const playTrack = async (song) => {
        const audioElement = audioRef.current;
        try {
            setCurrentTrack(song);
            audioElement.src = `${import.meta.env.VITE_MUSIC_API}/stream/${song.videoId}`;
            await audioElement.play();
            setIsPlaying(true);
        } catch (error) {
            console.error('Error playing track:', error);
        }
    };

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Add time update listener
    useEffect(() => {
        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            setTrackTime(audio.currentTime);
            setDuration(audio.duration);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
    }, []);

    const contextValue = {
        currentTrack,
        setCurrentTrack,
        isPlaying,
        setIsPlaying,
        trackTime,
        setTrackTime,
        duration,
        setDuration,
        volume,
        setVolume,
        audioRef,
        progressRef,
        playTrack,
        togglePlayPause
    }

    return (
        <AudioPlayerData.Provider value={contextValue}>
            <audio ref={audioRef}>
                <track kind="captions" />
            </audio>
            {children}
        </AudioPlayerData.Provider>
    )
}

export default AudioPlayerContext
