import axios from 'axios'
const serviceUrl = 'https://yalantis-react-school-api.yalantis.com/api/task0/users'

/**
 * Get list of all employees
 */

const getAllEmployees = async () => {
	const response = await axios.get(serviceUrl)
	return response
}

export default { getAllEmployees }
