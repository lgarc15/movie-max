import axios from "axios";

export default axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
  timeout: 1000,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzNhMzI4NjkzYTA4Yzc0MWIxMDEwZjYwZWQ3ZWNjNyIsInN1YiI6IjVhNzY4NmMyOTI1MTQxMDU5ZjAzZGY4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rp4xW3D4Cl3uqJTPZOZO7QCD299xEsDAFNcRd1FtS-0",
  },
});
