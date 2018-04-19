import callApi from 'util/apiCaller'

export function fetchUsers() {
	return callApi('users/api').then(
		res => res.users
	)
}