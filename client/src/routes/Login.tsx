import { Box, Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import api from 'api'
import { tokenState } from 'atoms/tokenState'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

export default function Login() {
	const setToken = useSetRecoilState(tokenState)

	const form = useForm({
		initialValues: {
			name: '',
			password: '',
		},
		validate: {
			name: value => !value.length,
			password: value => !value.length,
		}
	})

	const [isFetching, setIsFetching] = useState(false)

	const onSubmit = ({ name, password }: typeof form['values']) => {
		setIsFetching(true)
		api.auth.login(name, password).then(token => {
			setToken(token)
			localStorage['token'] = token
		}).then(() => setIsFetching(false))
	}

	return (
		<div className='h-screen flex items-center'>
			<Box className='mx-auto max-w-xs flex-1 px-4'>
				<form onSubmit={form.onSubmit(onSubmit)}>
					<TextInput
						withAsterisk
						label="Name"
						{...form.getInputProps('name')}
					/>
					<TextInput
						mt='md'
						withAsterisk
						label="Password"
						type='password'
						{...form.getInputProps('password')}
					/>


					<Group position="right" mt="md">
						<Button type="submit" loading={isFetching}>Login</Button>
					</Group>
				</form>
			</Box>
		</div>
	)
}