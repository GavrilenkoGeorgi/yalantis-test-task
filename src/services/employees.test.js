import employees from './employees'
import axiosMock from 'axios'

import mockResponseData from '../fixtures/users'

describe('Employees service', () => {
	test('fetches employees array from API', async () => {
		const [ employee ] = mockResponseData
		axiosMock.get.mockResolvedValue({ data: mockResponseData })
		const response = await employees.getAllEmployees()

		expect(response.data).toHaveLength(mockResponseData.length)
		expect(response.data).toEqual(
			expect.arrayContaining([
				expect.objectContaining(employee)
			])
		)
	})
})
