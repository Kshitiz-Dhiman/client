import React, { useContext } from 'react'
import { Play, Pause } from 'lucide-react';
import { AudioPlayerData } from '../context/AudioPlayerContext';

const MusicPlayer = () => {
    const { currentTrack, isPlaying, togglePlayPause, trackTime, duration } = useContext(AudioPlayerData);

    return (
        <div className='bg-[#202020] text-white rounded-xl fixed bottom-28 w-full h-24 flex items-center justify-start gap-4 px-4'>
            <div className='bg-white h-10 w-10 rounded-full overflow-hidden'>
                <img src={currentTrack?.thumbnails?.[0]?.url} alt="" className='w-full h-full object-cover' />
            </div>
            <div className='flex justify-between items-center w-full px-3'>
                <div className='flex flex-col gap-1'>
                    <h1 className='text-lg'>{currentTrack?.name || 'No Track Selected'}</h1>
                    <h1 className='text-sm'>{currentTrack?.artist?.name || 'Unknown Artist'}</h1>
                </div>
                <div
                    onClick={togglePlayPause}
                    className='cursor-pointer hover:opacity-80'
                    onKeyDown={(e) => { if (e.key === 'Enter') togglePlayPause(); }}
                >
                    {isPlaying ? <Pause /> : <Play />}
                </div>
            </div>
            <input
                type="range"
                value={(trackTime / duration) * 100 || 0}
                onChange={(e) => {
                    const time = (e.target.value / 100) * duration;
                    audioRef.current.currentTime = time;
                }}
                className='absolute w-9/10 bottom-0 h-1 rounded-lg overflow-hidden accent-white'
            />
        </div>
    );
};

export default MusicPlayer;
