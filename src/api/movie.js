import { API_KEY, API_HOST, API_LANG } from '../utils/constants';

// Creamos una funcion para obtener las peliculas añádidas recientemente
export const getNewsMoviesApi = (page = 1) => {

    try {
        
        const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${API_LANG}&page=${page}`;

        // Hacemos la peticion y obtenemos los datos en formato JSON
        return fetch(url).then(response => {

            return response.json();

        }).then(result => {

            return result;

        });
        
    } catch (error) {
        
        console.log(error);
        return null;

    }

}

// Creamos una funcion para obtener los generos de cada pelicula
export const getGenresMoviesApi = (idGenres) => {

    try {
        
        const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${API_LANG}`;

        // Hacemos la peticion asincrona y obtenemos los datos en formato JSON
        return fetch(url).then(response => {

            return response.json();

        }).then(result => {

            // Obtenemos los generos de cada pelicula
            const arrayGenres = [];
            idGenres.forEach((id) => {
                result.genres.forEach((item) => {

                    if( item.id === id ) arrayGenres.push(item.name);

                })
            });

            return arrayGenres;

        });
    } catch (error) {
        
        console.log(error);
        return null;

    }

}

// Creamos una funcion para obtener los generos de cada pelicula
export const getAllGenresMoviesApi = () => {

    try {
        
        const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${API_LANG}`;

        // Hacemos la peticion y obtenemos los datos en formato JSON
        return fetch(url).then(response => {

            return response.json();

        }).then(result => {

            return result;

        });
        
    } catch (error) {
        
        console.log(error);
        return null;

    }

}

// Creamos una funcion para obtener todas las peliculas de un mismo genero
export const getMoviesByGenreApi = (idGenre) => {

    try {
        
        const url = `${API_HOST}/discover/movie?api_key=${API_KEY}&with_genres=${idGenre}&language=${API_LANG}`

        // Hacemos la peticion y obtenemos los datos en formato JSON
        return fetch(url).then(response => {

            return response.json();

        }).then(result => {

            return result;

        });

    } catch (error) {
        
        console.log(error);
        return null;

    }

}

// Creamos una funcion para obtener todos los datos de una pelicula
export const getDataMovieApi = idMovie => {

    try {
        
        const url = `${API_HOST}/movie/${idMovie}?api_key=${API_KEY}&language=${API_LANG}`;

        // Hacemos la peticion y obtenemos los datos en formato JSON
        return fetch(url).then(response => {

            return response.json();

        }).then(result => {

            return result;

        });

    } catch (error) {
        
        console.log(error);
        return null;

    }

}

// Creamos una funcion para obtener el trailer de una pelicula
export const getVideoMovieApi = (idMovie) => {

    try {
        
        const url = `${API_HOST}/movie/${idMovie}/videos?api_key=${API_KEY}&language=${API_LANG}`;

        // Hacemos la peticion y obtenemos los datos en formato JSON
        return fetch(url).then(response => {

            return response.json();

        }).then(result => {

            return result;

        });


    } catch (error) {
        
        console.log(error);
        return null;

    }

}

export const getPopularMoviesApi = (page = 1 ) => {

    try {
        
        const url = `${API_HOST}/movie/popular?api_key=${API_KEY}&language=${API_LANG}&page=${page}`;

        // Hacemos la peticion y obtenemos los datos en formato JSON
        return fetch(url).then(response => {

            return response.json();

        }).then(result => {

            return result;

        });

    } catch (error) {
        
        console.log(error);
        return null;

    }

}

export const searchApi = query => {

    try {
        
        const url = `${API_HOST}/search/movie?api_key=${API_KEY}&language=${API_LANG}&query=${query}`;

        // Hacemos la peticion y obtenemos los datos en formato JSON
        return fetch(url).then(response => {

            return response.json();

        }).then(result => {

            return result;

        });

    } catch (error) {
        
        console.log(error);
        return null;

    }

}