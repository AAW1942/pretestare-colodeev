import { atom } from "recoil"


export const tokenState = atom<string | null>({
	key: 'tokenState',
	default: localStorage['token'] ?? null,
})