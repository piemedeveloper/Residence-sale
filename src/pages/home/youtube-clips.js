import React from 'react'
import YouTube from 'react-youtube';

export default function YoutubeClips() {
    return (
        <div className='container grid justify-center gap-4 mx-auto lg:grid-cols-2'>
            <div className='youtube-clip'>
                <YouTube videoId="Wu_sZjaFdds?si=J7imuCg6AUwdKwGP" className='w-full' />
            </div>
            <div className='youtube-clip'>
                <YouTube videoId="lt5yU2dXJso" className='w-full' />
            </div>
        </div>
    )
}


