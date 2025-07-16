

import axios from "axios";

import Movie from "../models/movie.models.js";
import Show from "../models/show.models.js";



export const getNowPlayingMovies = async (req, res) => {
  try {
    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
      throw new Error("TMDB_API_KEY is undefined. Check your .env file.");
    }

    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
    

    const { data } = await axios.get(url);

    res.status(200).json({ success: true, movies: data.results });
  } catch (error) {
    console.error("TMDB Fetch Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch from TMDB",
      error: error.message,
    });
  }
};



export const addShow = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body;

    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
      throw new Error("TMDB_API_KEY is undefined. Check your .env file.");
    }

    let movie = await Movie.findById(movieId);

    // If movie doesn't exist in DB, fetch from TMDB
    if (!movie) {
      const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`),
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`),
      ]);

      const movieApiData = movieDetailsResponse.data;
      const movieCreditsData = movieCreditsResponse.data;

      const movieDetails = {
        _id: movieId,
        title: movieApiData.title,
        overview: movieApiData.overview,
        poster_path: movieApiData.poster_path,
        backdrop_path: movieApiData.backdrop_path,
        genres: movieApiData.genres,
        release_date: movieApiData.release_date,
        original_language: movieApiData.original_language,
        vote_average: movieApiData.vote_average,
        runtime: movieApiData.runtime,
        tagline: movieApiData.tagline || "",
        casts: movieCreditsData.cast, // ✅ Corrected field
      };

      movie = await Movie.create(movieDetails);
    }

    // Create show entries
    const showsToCreate = [];

    showsInput.forEach((show) => {
      const showDate = show.date;
      show.time.forEach((time) => {
        const dateTimeString = `${showDate}T${time}`;
        showsToCreate.push({
          movie: movieId,
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeats: {},
        });
      });
    });

    if (showsToCreate.length > 0) {
      await Show.insertMany(showsToCreate);
    }

    res.json({ success: true, message: "Show Added Successfully" });
  } catch (error) {
    console.error("TMDB Fetch Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch from TMDB",
      error: error.message,
    });
  }
};
