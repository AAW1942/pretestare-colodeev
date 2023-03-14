import axios from "axios"
import jwtDecode from "jwt-decode"
import { atom, selector } from "recoil"
import { tokenState } from "./tokenState"

export interface IUser {
    userId:   string;
    username: string;
    type:     string;
    avatar:   string;
    iat:      number;
}

export const userState = selector<IUser | null>({
	key: 'userSelector',
	get: ({ get }) => {
		const token = get(tokenState)
		if (!token) return null
		axios.defaults.headers.common = {
			'Authorization': `Bearer ${token}`
		}
		return jwtDecode(token)
	},
})




// export interface IUser {
// 	token: string
// 	userInfo: {
// 		iss: string;
// 		nbf: number;
// 		aud: string;
// 		sub: string;
// 		email: string;
// 		email_verified: boolean;
// 		azp: string;
// 		name: string;
// 		picture: string;
// 		given_name: string;
// 		iat: number;
// 		exp: number;
// 		jti: string;
// 	}
// }

// export const userState = atom<IUser | null>({
// 	key: 'userState',
// 	default: getUserFromLocalStorage(),
// 	effects: [({ onSet }) => {
// 		onSet(onSetUser)
// 	}]
// })

// function onSetUser(user: IUser | null) {
// 	setUserInAxios(user)
// 	if (user) {
// 		localStorage['user'] = JSON.stringify(user)
// 	} else {
// 		delete localStorage['user']
// 	}
// }

// function getUserFromLocalStorage() {
// 	const user: IUser | null = localStorage['user'] ? JSON.parse(localStorage['user']) : null
// 	setUserInAxios(user)
// 	return user
// }

// function setUserInAxios(user: IUser | null) {
// 	if (user) {
// 		axios.defaults.headers.common = {
// 			'Authorization': `Bearer ${user.token}`
// 		}
// 	} else {
// 		delete axios.defaults.headers.common['Authorization']
// 	}
// }