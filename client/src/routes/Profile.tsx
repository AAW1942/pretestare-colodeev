import { Box, Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import api from 'api'
import { userState } from 'atoms'
import { tokenState } from 'atoms/tokenState'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

export const Profile = () => {
	const user = useRecoilValue(userState)
	
	return (
		<>
		asd
			{/* {user && JSON.stringify(user, null, 4)} */}
		</>
	)
}
