import React from 'react'
import NavBar from '../components/NavBar'
import { FiSearch } from "react-icons/fi";

const Search = () => {
    return (
        <>
            <div className='bg-[#111111] p-4 flex flex-col min-h-screen min-w-full text-white'>
                <input type="text" className='bg-[#202020] p-3 rounded-xl outline-none' placeholder='What do you want to play'/>
                <h1 className='text-2xl font-semibold mt-4'>Browser all</h1>
                <h1 className='mt-4'>Discover</h1>
            </div>
            <NavBar />
        </>
    )
}

export default Search
