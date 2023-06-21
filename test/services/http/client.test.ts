import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { HttpClient, type Normalized } from '@/services/http'

const TEST_BASE_URL = 'https://some-endpoint.test'

type TestProps = Awaited<Normalized<any>> & {
  method: 'delete' | 'get' | 'patch' | 'post' | 'put'
  url: string
}

const TEST_CASES: TestProps[] = [
  {
    method: 'get',
    url: '/login',
    data: { exp: 9999, username: 'username' },
    ok: true,
    status: 200,
  },
  {
    method: 'post',
    url: '/login',
    data: null,
    ok: false,
    status: 400,
  },
  {
    method: 'delete',
    url: '',
    data: { d: 'some text' },
    ok: true,
    status: 200,
  },
  {
    method: 'post',
    url: '/somepath',
    data: null,
    ok: true,
    status: 201,
  },
  {
    method: 'patch',
    url: '',
    data: null,
    ok: false,
    status: 403,
  },
]

const server = setupServer(
  ...TEST_CASES.map(({ method, url, status, data }) =>
    rest[method](TEST_BASE_URL + url, async (_req, res, ctx) => {
      if (data) {
        return res(ctx.status(status), ctx.json(data))
      }
      return res(ctx.status(status))
    }),
  ),
)

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})
afterAll(() => { server.close(); })
afterEach(() => { server.resetHandlers(); })

const testClient = new HttpClient(TEST_BASE_URL)

describe('HttpClient', () => {
  it.each(TEST_CASES)(
    'handles and normalizes a $method request as JSON',
    async ({ url, method, data, ok, status }) => {
      const res = await testClient[method](url)

      expect(ok).toEqual(res.ok)

      expect(data).toEqual(res.data)
      expect(status).toEqual(res.status)
    },
  )
})
