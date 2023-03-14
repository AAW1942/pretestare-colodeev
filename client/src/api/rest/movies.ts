import axios from 'axios'
import { API_URL } from 'api'

export interface IMovie {
	translations: {
		id: string
		name: string
		isSelected: boolean
	}[]
	seasons: {
		id: string
		name: string
		isSelected: boolean
	}[]
	episodes: {
		id: string
		name: string
		isSelected: boolean
	}[]
	resolutions: {
		name: string
		isSelected: boolean
	}[]
	manifest: string
}

export interface IMovieDetails {
	name: string
	alterName: string
	smallImage: string
	image: string
	descriptionTitle: string
	description: string
	episodes: {
		number: string
		name: string
		releaseDate: string
	}[]
	status: MovieStatus
}

export type MovieType = 'anime' | 'cartoon' | 'movie' | 'series'

export const search = (q: string) => axios.get(`${API_URL}/api/search`, { params: { q } }).then(x => x.data as {
	img: string | null
	url: string | null
	name: string | null
	info: string | null
}[]).catch(() => null)

export const getMovies = (type: MovieType, page: number) => axios.get(`${API_URL}/api/movies`, { params: { type, page } })
	.then(x => x.data).catch(() => null)

export const getMovieId = (url: string) => axios.get(`${API_URL}/api/get-movie-id`, { params: { url } })
	.then(x => x.data.id as string)

export const getMovie = (id: string, t = '1', s = '1', e = '1', q = '1080p Ultra') => axios.get(`${API_URL}/api/movies/${id}`, {
	params: { t, s, e, q }
}).then(x => x.data as IMovie).catch(() => null)

export const getMovieDetails = (id: string) => axios.get(`${API_URL}/api/movie-details/${id}`)
	.then(x => x.data as IMovieDetails).catch(() => null)

export type MovieStatus = 'none' | 'watching' | 'will_watch' | 'viewed' | 'abandoned'

export const setMovieStatus = (movieId: string, status: MovieStatus) => axios.post(`${API_URL}/api/movies`, { movieId, status })
	.then(x => x.data).catch(() => null)

export const getMovieSavedTime = (id: string) => axios.get(`${API_URL}/api/movie-saved-time/${id}`)
	.then(x => x.data as { t: string, s: string, e: string, q: string } || null).catch(() => null)

export const setMovieSavedTime = (movieId: string, t?: string, s?: string, e?: string, q?: string) =>
	axios.post(`${API_URL}/api/movie-saved-time`, { movieId, t, s, e, q })
		.then(x => true).catch(() => false)