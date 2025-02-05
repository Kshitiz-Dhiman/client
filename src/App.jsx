import { useState, useEffect, useRef } from 'react'
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa'
import axios from "axios";

function App() {
    const [count, setCount] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const [songs, setSongs] = useState([])
    const audioElement = useRef(new Audio());
    const [isLoading, setIsLoading] = useState(false)
    const [playingSong, setPlayingSong] = useState({ name: "Music Player", duration: 0 })
    const musicapi = import.meta.env.VITE_MUSIC_API;

    const togglePlayPause = () => {
        if (isPlaying) {
            audioElement.current.pause();
        } else {
            audioElement.current.play();
        }
        setIsPlaying(!isPlaying);
    }

    const handleSliderChange = (event) => {
        const value = event.target.value;
        const newTime = (audioElement.current.duration / 100) * value;
        audioElement.current.currentTime = newTime;
        setProgress(value);
        console.log(progress);
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
    }

    const updateProgress = () => {
        const progressValue = (audioElement.current.currentTime / audioElement.current.duration) * 100;
        setProgress(progressValue);
    };

    const resetPlayer = () => {
        setIsPlaying(false);
        setProgress(0);
    };

    const handleTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        audioElement.current.addEventListener('timeupdate', updateProgress);
        audioElement.current.addEventListener('ended', resetPlayer);

        return () => {
            audioElement.current.removeEventListener('timeupdate', updateProgress);
            audioElement.current.removeEventListener('ended', resetPlayer);
        };
    }, []);

    async function getStream(song, params) {
        setPlayingSong(song);
        try {
            setIsLoading(true);
            if (audioElement.current.src !== `${musicapi}/stream/${params}`) {
                const streamUrl = `${musicapi}/stream/${params}`;
                audioElement.current.src = streamUrl;
                audioElement.current.load();
                await audioElement.current.play();
                setIsPlaying(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function getMusic() {
        try {
            const response = await axios.get(`${musicapi}/music/getsong?q=${searchQuery}`);
            setSongs(response.data.content);
            console.log(response.data.content[0].thumbnails.url);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='bg-gray-900 min-h-screen flex flex-col justify-evenly items-center'>
            <div className='flex gap-3 items-center w-full p-4'>
                <input
                    type='text'
                    placeholder='Search songs...'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className='p-2 text-white rounded w-full placeholder:text-white border-white border-2'
                />
                <button type='button' className='p-2 bg-white rounded' onClick={() => getMusic()}>Search</button>
            </div>
            <div className='text-white flex flex-col gap-2 w-full p-4'>
                {songs.map((song) => {
                    // console.log(song.thumbnails[0].url)
                    return (
                        <div key={song.videoId}>
                            <div className='bg-gray-800 rounded w-full cursor-pointer hover:bg-gray-600 flex'>
                                <img src={song.thumbnails[0].url} alt="" />

                            <h1
                                onClick={() => getStream(song, song.videoId)}
                                onKeyUp={(e) => { if (e.key === 'Enter') getStream(song , song.videoId); }}
                                tabIndex="0"
                                className='p-2'
                            >
                                {song.name}
                                <h2 className='text-gray-400'>{song.artist.name}</h2>
                            </h1>

                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='flex flex-col items-center w-full bg-gray-700 fixed bottom-0 p-4'>
                <div className='text-white text-2xl mb-4'>{playingSong.name}</div>
                {isLoading ? (
                    <div className='text-white'>Loading...</div>
                ) : (
                    <>
                        <div className='flex items-center space-x-4 '>
                            <button type='button' className='text-white'>
                                <FaBackward size={30} />
                            </button>
                            <button type='button' className='text-white' onClick={togglePlayPause}>
                                {isPlaying ? <FaPause size={30} /> : <FaPlay size={30} />}
                            </button>
                            <button type='button' className='text-white'>
                                <FaForward size={30} />
                            </button>
                        </div>
                        <div className='text-white flex justify-between w-full'>
                            <h1>{handleTime(audioElement.current.currentTime * 1000)}</h1>
                            <h1>{handleTime(playingSong.duration)}</h1>
                        </div>
                        <input
                            type='range'
                            min='0'
                            max='100'
                            value={progress}
                            onChange={handleSliderChange}
                            className='w-full mt-4'
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default App
