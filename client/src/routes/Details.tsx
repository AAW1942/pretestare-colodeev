import api from 'api'
import { IMovieDetails, MovieStatus } from 'api/rest/movies'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from "react-router"
import { Image, SegmentedControl, Skeleton, Spoiler, Table, Text } from '@mantine/core'

import { Select } from '@mantine/core'

export const Details = () => {
	const { id = '' } = useParams()
	const navigate = useNavigate()


	const [dubs, setDubs] = useState<{ id: string, name: string, isSelected: boolean }[]>()
	const [seasons, setSeasons] = useState<{ id: string, name: string, isSelected: boolean }[]>()
	const [episodes, setEpisodes] = useState<{ id: string, name: string, isSelected: boolean }[]>()
	const [resolutions, setResolutions] = useState<{ name: string, isSelected: boolean }[]>()

	const [movieURL, setMovieURL] = useState<string>()

	const [isDataLoaded, setIsDataLoaded] = useState(false)

	const fetchData = (id: string, t?: string, s?: string, e?: string, q?: string) => api.movies.getMovie(id, t, s, e, q).then(data => {
		if (!data) return navigate('/')
		setDubs(data.translations)
		setSeasons(data.seasons)
		setEpisodes(data.episodes)
		setResolutions(data.resolutions)
		setMovieURL(data.manifest)
		setIsDataLoaded(true)
	})

	const [details, setDetails] = useState<IMovieDetails | null>(null)

	useEffect(() => {
		if (!id) return navigate('/')
		api.movies.getMovieSavedTime(id).then(x => {
			fetchData(id, x?.t, x?.s, x?.e, x?.q)
		})
		api.movies.getMovieDetails(id).then(data => {
			setDetails(data)
			setStatus(data?.status ?? 'none')
		})
	}, [id])

	useEffect(() => {
		const contentArea = document.getElementById('contentArea')
		if (contentArea) contentArea.scrollTop = 0
	}, [])

	const getSelectProps = (items: { id?: string, name: string, isSelected: boolean }[] | undefined, setter: React.Dispatch<any>) => {
		const selected = items?.find(x => x.isSelected)
		return {
			value: selected?.id ?? selected?.name,
			data: items?.map(x => ({ label: x.name, value: x.id ?? x.name })) ?? [],
			disabled: !isDataLoaded,
			onChange: (value: string | null) => {
				if (!value || value === selected?.id || value === selected?.name) { return }
				const newItems = items?.map(x => ({ ...x, isSelected: value === x?.id || value === x?.name }))
				setter(newItems)
				setIsDataLoaded(false)
				const t = (dubs === items ? newItems : dubs)?.find(x => x.isSelected)?.id
				const s = (seasons === items ? newItems : seasons)?.find(x => x.isSelected)?.id
				const e = (episodes === items ? newItems : episodes)?.find(x => x.isSelected)?.id
				const q = (resolutions === items ? newItems : resolutions)?.find(x => x.isSelected)?.name
				fetchData(id, t, s, e, q)
				api.movies.setMovieSavedTime(id!, t, s, e, q).then(console.log)
			}
		}
	}

	const [status, setStatus] = useState<MovieStatus>('none')


	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-wrap items-start gap-4'>
				<div className='max-w-3xl w-full'>
					<div className='rounded overflow-hidden'>
						<Skeleton visible={!isDataLoaded}>
						</Skeleton>
					</div>
				</div>

				<div className='grid gap-4 max-w-sm w-max'>
					<Skeleton visible={!isDataLoaded} className='z-40'>
						<Select {...getSelectProps(dubs, setDubs)} />
					</Skeleton>
					<Skeleton visible={!isDataLoaded} className='z-30'>
						<Select {...getSelectProps(seasons, setSeasons)} />
					</Skeleton>
					<Skeleton visible={!isDataLoaded} className='z-20'>
						<Select {...getSelectProps(episodes, setEpisodes)} />
					</Skeleton>
					<Skeleton visible={!isDataLoaded} className='z-10'>
						<Select {...getSelectProps(resolutions, setResolutions)} />
					</Skeleton>
				</div>
			</div>
			<div>
				<Spoiler maxHeight={318} showLabel="Show more" hideLabel="Hide">
					<div className='flex gap-4'>
						<Skeleton visible={!details} width={228}>
							<div className='grid gap-4'>
								<Image
									className='rounded overflow-hidden'
									height={318}
									width={228}
									src={details?.smallImage}
									alt="err"
									withPlaceholder
									placeholder={<Text align="center">err</Text>}
								/>
								<SegmentedControl
									orientation='vertical'
									fullWidth
									className='mb-4'
									value={status}
									onChange={(value: MovieStatus) => {
										api.movies.setMovieStatus(id, value)
										setStatus(value)
									}}
									color={
										(status === 'watching' && 'violet') ||
										(status === 'will_watch' && 'yellow') ||
										(status === 'viewed' && 'green') ||
										(status === 'abandoned' && 'red') ||
										undefined
									}
									data={[
										{ label: 'None', value: 'none' },
										{ label: 'Watching', value: 'watching' },
										{ label: 'Will watch', value: 'will_watch' },
										{ label: 'Viewed', value: 'viewed' },
										{ label: 'Abandoned', value: 'abandoned' },
									]}
								/>
							</div>
						</Skeleton>
						<div>
							{!!details ? (
								<div>
									<div className='text-2xl font-semibold w-full'>{details?.name}</div>
									<div className='text-lg font-semibold text-[#5c5f66] mt-1'>{details?.alterName}</div>
									<div className='text-lg font-semibold mt-4 mb-2'>{details?.descriptionTitle}</div>
									<div className='max-w-sm font-semibold text-[#5c5f66]'>{details?.description}</div>
								</div>
							) : (
								<div className='flex flex-col gap-4'>
									<Skeleton visible className='w-64 h-8' />
									<Skeleton visible className='w-56 h-6' />
									<Skeleton visible className='w-64 h-8' />
									<Skeleton visible className='w-80 h-44' />
								</div>
							)}
						</div>
					</div>
				</Spoiler>
				<Table className='my-4'>
					<thead>
						<tr>
							<th>Episode</th>
							<th>Name</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>{(details?.episodes || Array(12).fill(null))?.map((episode, i) => (
						<tr key={i}>
							{details ? (
								<>
									<td>{episode.number}</td>
									<td>{episode.name}</td>
									<td>{episode.releaseDate}</td>
								</>
							) : (
								<>
									<td><Skeleton visible className='h-3' /></td>
									<td><Skeleton visible className='h-3' /></td>
									<td><Skeleton visible className='h-3' /></td>
								</>
							)}
						</tr>
					))}</tbody>
				</Table>
			</div>
		</div>
	)
}


const getVideoOptions = (src: string) => ({
	autoplay: false,
	controls: true,
	responsive: true,
	fluid: true,
	sources: [{
		src,
		type: 'application/x-mpegURL'
	}]
})
