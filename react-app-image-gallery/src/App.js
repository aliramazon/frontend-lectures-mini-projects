import React from "react";
import { ImageApi } from "./api";

import "./App.css";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            images: [],
            loading: false,
            page: 1,
            zoomedInImage: {},
            showImage: false,
        };
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        });
        try {
            const result = await ImageApi.fetchImages(this.state.page);

            this.setState((prevState) => {
                return {
                    images: result,
                    loading: false,
                };
            });
        } catch (error) {
            console.log(error);
        }
    }

    componentDidUpdate(_, prevState) {
        if (prevState.page !== this.state.page) {
            this.fetchImages();
        }
    }

    fetchImages = async () => {
        try {
            const result = await ImageApi.fetchImages(this.state.page);

            this.setState((prevState) => {
                return {
                    images: [...prevState.images, ...result],
                    loading: false,
                };
            });
        } catch (error) {
            console.log(error);
        }
    };
    loadMore = () => {
        this.setState((prevState) => {
            return {
                loading: true,
                page: prevState.page + 1,
            };
        });
    };

    // loadMore = async () => {
    //     this.setState(
    //         (prevState) => {
    //             return {
    //                 loading: true,
    //                 page: prevState.page + 1,
    //             };
    //         },
    //         () => {
    //             this.fetchImages();
    //         }
    //     );

    //     // this.setState(async (prevState) => {
    //     //     const nextPage = prevState.page + 1;

    //     //     const result = await ImageApi.fetchImages(nextPage);
    //     //     console.log(result);

    //     //     return {
    //     //         page: nextPage,
    //     //         images: [...prevState.images, ...result],
    //     //     };
    //     // });
    // };

    zoomInImage = (image) => {
        this.setState({
            showImage: true,
            zoomedInImage: image,
        });
    };

    hideImage = () => {
        this.setState({
            showImage: false,
            zoomedInImage: {},
        });
    };

    render() {
        return (
            <main>
                <h1>Unsplash Like App </h1>
                <section>
                    <div className="gallery">
                        {this.state.images.map((image) => {
                            return (
                                <figure key={image.id}>
                                    <img
                                        src={image.download_url}
                                        alt={image.author}
                                        onClick={() => this.zoomInImage(image)}
                                    />
                                </figure>
                            );
                        })}
                    </div>
                    {this.state.images.length >= 1 ? (
                        <div>
                            <button
                                className="load-more"
                                onClick={this.loadMore}
                                disabled={this.state.loading}
                            >
                                Load More
                            </button>
                        </div>
                    ) : null}
                </section>
                {this.state.showImage && (
                    <div className="overlay">
                        <span
                            className="overlay__close-icon"
                            onClick={this.hideImage}
                        >
                            &#10005;
                        </span>
                        <img
                            className="zoomed-in-image"
                            src={this.state.zoomedInImage.download_url}
                            alt={this.state.zoomedInImage.author}
                        />
                    </div>
                )}
            </main>
        );
    }
}

export default App;
