import { API_URL } from "api"
import axios from "axios"

export const login = (name: string, password: string) => axios.post<{ token: string }>(`${API_URL}/api/auth`, { name, password })
	.then(({ data: { token } }) => token).catch(() => null)