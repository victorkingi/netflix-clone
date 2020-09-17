import React, {useEffect, useState} from "react";
import axios from './axios';
import requests from "./requests";
import "./Banner.css";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

function Banner() {
    const [movie, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                    ]
            )
            return request;
        }
        fetchData();
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substring(0, n - 1) + "..." : str;
    }

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                }).catch((error) => console.log(error))
        }
        console.log(movie?.name || movie?.title || movie?.original_name || '')
    }

    return (
        <div>
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
                backgroundPosition: "center center"
            }}
        >
            <div className="banner_contents">
                <h1 className="banner_title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="banner_buttons">
                    <button className="banner_button" onClick={() => handleClick(movie)}>Play</button>
                    <button className="banner_button">My List</button>
                </div>

                <h1 className="banner_description">
                    {truncate(movie?.overview, 150)}
                </h1>


            </div>

            <div className="banner--fadeBottom">
            </div>
        </header>
    {trailerUrl && <div>
        <YouTube videoId={trailerUrl} opts={opts} />
        <br /> <br /> <br />
    </div>
    }
    </div>
    )
}

export default Banner;