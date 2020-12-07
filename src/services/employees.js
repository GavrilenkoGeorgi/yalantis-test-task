import axios from 'axios'
import { apiUrl } from './apiUrl'

/**
 * Get list of all employees
 */

const getAllEmployees = async () => {
	try {
		const { data } = await axios.get(apiUrl)
		return data
	} catch (error) {
		if (error.response) {
			const { response } = error
			console.error(`Error getting data from API: ${response.status} - ${response.statusText} `)
		} else console.error(error)
	}
}

export default { getAllEmployees }
