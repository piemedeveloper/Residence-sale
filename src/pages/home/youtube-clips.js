import React from 'react'
import YouTube from 'react-youtube';

export default function YoutubeClips() {
    const links = ["gKLm163B-Zc", "Wu_sZjaFdds?si=J7imuCg6AUwdKwGP", "lt5yU2dXJso", "kFRlLIxWI4M"]
    return (
        <div className='container grid justify-center gap-4 mx-auto xl:grid-cols-4 md:grid-cols-2'>
            {links.map((l, i) => <div className='youtube-clip' key={i}>
                <YouTube videoId={l} className='w-full' />
            </div>)}

        </div>
    )
}


