import React from 'react'

const PlaylistHome = () => {
  return (
    <div className='flex gap-3 bg-[#202020] p-4 rounded-xl items-center w-full'>
        <div className='bg-white h-10 w-10 rounded-xl'>
            {/* <img src='https://i.scdn.co/image/ab67616d0000b273b9f6c5e7a7b3c5c7c5b1f3f7' alt='playlist' className='rounded-xl'/> */}
        </div>
        <div className='flex flex-col'>
            <h1 className=''>Get Lucky ft.</h1>
            <p className='text-[#898989]'>Daft Punk</p>
        </div>
    </div>
  )
}

export default PlaylistHome
