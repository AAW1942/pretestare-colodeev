import { Outlet, useNavigate } from "react-router"
import { BiHomeAlt, BiSearchAlt } from 'react-icons/bi'

import { Avatar, Group, Loader, Select, Text, Image } from '@mantine/core'
import { useDebouncedState } from '@mantine/hooks'
import { forwardRef, useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { userState } from "atoms"
import api from "api"

export const Layout = () => {
	const navigate = useNavigate()
	const user = useRecoilValue(userState)

	return (
		<div className=" h-screen flex">
			<div className="flex-col p-4 max-w-[200px] lg:max-w-[300px] flex-1 hidden md:flex" style={{ borderRight: '1px solid #252527' }}>
				<div className="text-2xl mt-3 mb-10 cursor-pointer" onClick={() => navigate('/')}>RED HD</div>
				<div className="grid gap-4">
					<div className="text-[#807f84] flex items-center gap-4 p-2 cursor-pointer" onClick={() => navigate('/animes')}>
						<BiHomeAlt size={24} />
						<div>Animes</div>
					</div>
					<div className="text-[#807f84] flex items-center gap-4 p-2 cursor-pointer" onClick={() => navigate('/cartoons')}>
						<BiHomeAlt size={24} />
						<div>Cartoons</div>
					</div>
					<div className="text-[#807f84] flex items-center gap-4 p-2 cursor-pointer" onClick={() => navigate('/movies')}>
						<BiHomeAlt size={24} />
						<div>Films</div>
					</div>
					<div className="text-[#807f84] flex items-center gap-4 p-2 cursor-pointer" onClick={() => navigate('/series')}>
						<BiHomeAlt size={24} />
						<div>Series</div>
					</div>
				</div>
			</div>
			<div className="flex-1 flex flex-col">
				<div className="flex p-4 lg:p-8 items-center gap-4">
					<Search />
					{!!user && (
						<div className="flex items-center gap-4 text-[#807f84]">
							<Avatar radius="md" size='md' src={user.avatar} />
							<div>{user.username}</div>
						</div>
					)}
				</div>
				<div id="contentArea" className="px-4 pb-4 lg:px-8 md:pb-8 flex-1 overflow-y-auto ">
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export const Search = () => {
	const navigate = useNavigate()

	interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
		image: string;
		label: string;
		description: string;
	}

	const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
		({ image, label, description, ...others }: ItemProps, ref) => (
			<div ref={ref} {...others}>
				<Group noWrap>
					<Image
						className='rounded overflow-hidden'
						height={120}
						width={100}
						src={image}
						alt="With custom placeholder"
						withPlaceholder
						placeholder={<Text align="center">No image</Text>}
					/>
					<div>
						<Text size="sm">{label}</Text>
						<Text size="xs" opacity={0.65}>
							{description}
						</Text>
					</div>
				</Group>
			</div>
		)
	)

	const [data, setData] = useState<{ image: string, label: string, value: string, description: string }[]>([])

	const [value, setValue] = useDebouncedState('', 500)

	const [isFetching, setIsFetching] = useState(false)

	useEffect(() => {
		if (!value) {
			setIsFetching(false)
			setData([])
			return
		}
		setIsFetching(true)
		api.movies.search(value).then(data => {
			setData(data?.map(x => ({
				image: x.img ?? '',
				label: x.name ?? '',
				value: x.url ?? '',
				description: x.info ?? ''
			})) ?? [])
			setIsFetching(false)
		})
	}, [value])

	return (
		<>
			<Select
				className='flex-1'
				placeholder="Search..."
				itemComponent={SelectItem}
				icon={<BiSearchAlt />}
				rightSection={isFetching ? <Loader size="xs" /> : true}
				data={data}
				searchable
				size="md"
				maxDropdownHeight={400}
				nothingFound={!value.length ? 'Type something' : !isFetching && 'Nothing here'}
				onSearchChange={setValue}
				filter={() => true}
				onChange={(url) => {
					if (!url) return setValue('')
					api.movies.getMovieId(url).then(id => {
						if (url.startsWith('https://rezka.ag/animation')) return navigate(`/animes/${id}`)
						if (url.startsWith('https://rezka.ag/cartoons')) return navigate(`/cartoons/${id}`)
						if (url.startsWith('https://rezka.ag/films')) return navigate(`/movies/${id}`)
						if (url.startsWith('https://rezka.ag/series')) return navigate(`/series/${id}`)
					})
				}}
			/>
		</>
	)
}