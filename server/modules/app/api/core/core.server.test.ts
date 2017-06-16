/* eslint-env jest */
import * as axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000'
})

describe('Core API', () => {
  it('should return core api home', async () => {
    const response = await instance.get('/api/v1')
    expect(response.data.status).toBe(200)
  })
})
