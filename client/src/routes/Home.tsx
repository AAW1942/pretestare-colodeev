import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"
import { Image, SegmentedControl, Skeleton, Spoiler, Table, Text } from '@mantine/core'
import { Navbar } from "components/Navbar"
import { Section2 } from "components/Section2"
import { Section3 } from "components/Section3"
import { Footer } from "components/Footer"


export const Home = () => {

	// const [data, setData] = useState<animData>()
	// const [isFetching, setIsFetching] = useState(false)

	// const fetchData = (page: number) => api.animations.getAnimations(page).then(data => {
	// 	setIsFetching(false)
	// 	setData(data)
	// })



	return (
		<div className="grid gap-16">
			<Navbar />
			<Section2/>
			<Section3/>
			<Footer/>
		</div>
	)
}