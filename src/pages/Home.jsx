import React from 'react'
import PlaylistHome from '../components/PlaylistHome'
import MadeForYou from '../components/MadeForYou';
import { BsThreeDots } from "react-icons/bs";
import NavBar from '../components/NavBar';

const Home = () => {
    return (
        <>
            <div className='bg-[#111111] p-4 flex flex-col min-h-screen min-w-full text-white'>
                <div className='flex gap-3 w-full items-start'>
                    <h1 className='bg-[#202020] px-6 py-2 rounded-xl'>Music</h1>
                    <h1 className='bg-[#202020] px-6 py-2 rounded-xl'>Albums</h1>
                </div>
                <div className='grid grid-cols-2 gap-4 justify-between mt-4'>
                    <PlaylistHome />
                    <PlaylistHome />
                    <PlaylistHome />
                    <PlaylistHome />
                    <PlaylistHome />
                    <PlaylistHome />
                </div>
                <div>
                    <div className='flex mt-6 justify-between items-center'>
                        <h1 className='text-xl font-bold'>Made for you</h1>
                        <h1><BsThreeDots size={"30px"} opacity={"0.5"} /></h1>
                    </div>
                    <div className='min-w-fit-content flex gap-3 mt-4 overflow-x-auto'>
                        <MadeForYou />
                        <MadeForYou />
                        <MadeForYou />
                        <MadeForYou />
                        <MadeForYou />
                    </div>
                </div>

                <div>
                    <div className='flex mt-6 justify-between items-center'>
                        <h1 className='text-xl font-bold'>Your top mixes</h1>
                        <h1><BsThreeDots size={"30px"} opacity={"0.5"} /></h1>
                    </div>
                    <div className='min-w-fit-content flex gap-3 mt-4 overflow-x-auto'>
                        <MadeForYou />
                        <MadeForYou />
                        <MadeForYou />
                        <MadeForYou />
                        <MadeForYou />
                    </div>
                </div>
            </div>
            <NavBar />
        </>
    )
}

export default Home
