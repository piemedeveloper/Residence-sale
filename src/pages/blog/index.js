import axios from 'axios';
import React, { useState, useEffect } from 'react'

function BlogPosts() {
    const [posts, setPosts] = useState([]);
    const getPostData = () => {
        axios
            .get("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@Pieme_io")
            .then((res) => {
                setPosts(res.data.items);
            })
            .catch((error) => {
                console.error("Error fetching blog posts:", error);
            });
    };

    useEffect(() => {
        getPostData();
    }, []);

    return (
        <div className="pb-10">
            <div className="container mx-auto">
                <h1 className="pt-10 pb-6 text-5xl font-medium text-center heading-color">
                    Our Blogs
                </h1>

                <div className='grid grid-cols-1 gap-10 mt-4 md:grid-cols-2 lg:grid-cols-4'>
                    {posts.slice(0, 4).map((post, i) => <a href={post.link} key={i} target='_blank' rel='noreferrer'>
                        <div>
                            <h3 className='mb-3 font-medium line-clamp-1 head-color'>{post.title}</h3>
                            <div dangerouslySetInnerHTML={{ __html: post.description }} className='line-clamp-6' />
                        </div>
                    </a>)}
                </div>
            </div>
        </div>
    )
}

export default BlogPosts
