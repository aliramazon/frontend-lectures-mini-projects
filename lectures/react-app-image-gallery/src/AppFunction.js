import { useState, useEffect } from "react";
import { ImageApi } from "./api";

import "./App.css";

const AppFunction = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [zoomedInImage, setZoomedInImage] = useState({});
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        setLoading(true);
        try {
            const fetchImages = async () => {
                const result = await ImageApi.fetchImages(page);
                setImages((prevImages) => [...prevImages, ...result]);
                setLoading(false);
            };
            fetchImages();
        } catch (error) {}
    }, [page]);

    const loadMore = async () => {
        setPage((prevPage) => prevPage + 1);
    };

    // const loadMore = async () => {
    //     setLoading(true);
    //     setPage((prevPage) => prevPage + 1);
    //     try {
    //         const nextPage = page + 1;
    //         const fetchImages = async () => {
    //             const result = await ImageApi.fetchImages(nextPage);
    //             setImages((prevImages) => [...prevImages, ...result]);
    //             setLoading(false);
    //         };
    //         fetchImages();
    //     } catch (error) {}
    // };

    const zoomInImage = (image) => {
        setShowImage(true);
        setZoomedInImage(image);
    };

    const hideImage = () => {
        setShowImage(false);
        setZoomedInImage({});
    };

    return (
        <main>
            <h1>Unsplash Like App </h1>
            <section>
                <div className="gallery">
                    {images.map((image) => {
                        return (
                            <figure key={image.id}>
                                <img
                                    src={image.download_url}
                                    alt={image.author}
                                    onClick={() => zoomInImage(image)}
                                />
                            </figure>
                        );
                    })}
                </div>
                {images.length >= 1 ? (
                    <div>
                        <button
                            className="load-more"
                            onClick={loadMore}
                            disabled={loading}
                        >
                            Load More
                        </button>
                    </div>
                ) : null}
            </section>
            {showImage && (
                <div className="overlay">
                    <span className="overlay__close-icon" onClick={hideImage}>
                        &#10005;
                    </span>
                    <img
                        className="zoomed-in-image"
                        src={zoomedInImage.download_url}
                        alt={zoomedInImage.author}
                    />
                </div>
            )}
        </main>
    );
};

export default AppFunction;
