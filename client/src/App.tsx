import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Details } from "./routes/Details"
import { Home } from "./routes/Home"
import { Layout } from "./routes/Layout"
import { Profile } from "./routes/Profile"
import { MantineProvider } from '@mantine/core'

import {
	RecoilRoot,
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
} from 'recoil'
import Login from "routes/Login"
import PrivateRoutes from "utils/PrivateRoutes"


export default function App() {

	return (
		<RecoilRoot>
			<Routes>
				<Route element={<Home />} path="/" />
			</Routes>
			{/* <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
				<Routes>
					<Route element={<PrivateRoutes />}>
						<Route element={<Layout />}>
							<Route path="/profile" element={<Profile />} />
							<Route path="/animes" element={<Home type="anime" />} />
							<Route path="/cartoons" element={<Home type="cartoon" />} />
							<Route path="/movies" element={<Home type="movie" />} />
							<Route path="/series" element={<Home type="series" />} />
							<Route path="/" element={<Profile />} />
							<Route path="/:type/:id" element={<Details />} />
						</Route>
					</Route>
					<Route element={<Login />} path="/login" />
				</Routes>
			</MantineProvider> */}
		</RecoilRoot>
	);
}
