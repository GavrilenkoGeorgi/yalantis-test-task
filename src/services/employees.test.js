import employees from './employees'
import axiosMock from 'axios'
import { apiUrl } from './apiUrl'

import mockResponseData from '../fixtures/users'

describe('Employees service', () => {
	it('fetches employees array from API', async () => {
		axiosMock.get.mockResolvedValue({ data: mockResponseData })

		const [ employee ] = mockResponseData
		const data = await employees.getAllEmployees()

		expect(axiosMock.get).toHaveBeenCalledWith(apiUrl)
		expect(data).toHaveLength(mockResponseData.length)
		expect(data).toEqual(
			expect.arrayContaining([
				expect.objectContaining(employee)
			])
		)
	})
})
