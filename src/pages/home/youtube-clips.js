import React from 'react'
import YouTube from 'react-youtube';

export default function YoutubeClips() {
    const links = ["gKLm163B-Zc", "Wu_sZjaFdds?si=J7imuCg6AUwdKwGP", "lt5yU2dXJso"]
    return (
        <div className='container grid justify-center gap-4 mx-auto lg:grid-cols-3 md:grid-cols-2'>
            {links.map((l, i) => <div className='youtube-clip' key={i}>
                <YouTube videoId={l} className='w-full' />
            </div>)}

        </div>
    )
}


