import axios from "axios";

export default axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
  timeout: 2000,
  headers: {
    Authorization:
      `Bearer ${process.env.REACT_APP_MOVIE_DB_API}`,
  },
});
