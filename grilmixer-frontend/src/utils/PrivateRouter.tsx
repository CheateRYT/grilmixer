import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { backendApiUrl } from './BackendUrl'

const PrivateRouter = ({ Page }: { Page: React.ComponentType }) => {
	const [loading, setLoading] = useState(true)
	const [isAuthorize, setAuthorize] = useState(false)
	useEffect(() => {
		const getUserFromServer = async () => {
			try {
				const token = Cookies.get('admin-token')
				if (token) {
					const response: AxiosResponse = await axios.get(
						`${backendApiUrl}admin`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					)
					if (response.status === 200 && response.data.valid) {
						setAuthorize(response.data.valid)
					} else {
						Cookies.remove('admin-token')
						setAuthorize(false)
					}
				}
			} catch (error) {
				console.error(
					'An error occurred while fetching the current user',
					error
				)
			} finally {
				setLoading(false)
			}
		}

		getUserFromServer()
	}, [])

	if (loading) {
		return <p>Загрузка...</p>
	}

	if (isAuthorize) {
		return <Page />
	} else {
		return <Navigate to='/admin' />
	}
}

export default PrivateRouter
