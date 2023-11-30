import React, { useState, useEffect } from 'react';
import fetchJsonp from 'fetch-jsonp';
import './PageWidget.css';

const PageWidget = () => {
    const [posts, setPosts] = useState([]);
    const [offset, setOffset] = useState(0);
    const count = 10;
    const containerRef = React.useRef();

    const loadPosts = async () => {
        try {
            const response = await fetchJsonp(
                `https://api.vk.com/method/wall.get?owner_id=-164992662&domain=ddxfitness/kartini_s_istoriei&count=${count}&offset=${offset}&filter=all&access_token=2914c1c32914c1c32914c1c30d2a0143a8229142914c1c34de7a3b7b2d6996882e55c7b&v=5.131`
            );

            const data = await response.json();
            const newPosts = data.response.items;

            setPosts((prevPosts) => [...prevPosts, ...newPosts]);
            setOffset(offset + count);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleScroll = () => {
        const container = containerRef.current;
        if (container && container.scrollTop + container.clientHeight === container.scrollHeight) {
            loadPosts();
        }
    };

    useEffect(() => {
        loadPosts().then(() => console.log("Ошибка получения API запроса"));
    }, []);

    return (
        <div className="widget-container" ref={containerRef} onScroll={handleScroll}>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.text}</li>
                ))}
            </ul>
            <button onClick={loadPosts}>Load More</button>
        </div>
    );
};

export default PageWidget;