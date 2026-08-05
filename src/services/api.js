import axios from 'axios'
import { PRODUCTS } from '../data/products'

// ---------------------------------------------------------------------------
// This app currently runs on local mock data (see src/data/products.js) so it
// works out of the box with `npm run dev` and no backend setup.
//
// To connect it to your existing Flask + PostgreSQL backend, point this at
// your API base URL and replace the mock functions below with the axios
// calls that are already sketched out. The existing Flask app only exposes
// GET /api/products — extend app.py with the endpoints below to unlock the
// rest of the UI (see README.md "Connecting the Flask backend" for the full
// list of suggested endpoints and example implementations).
// ---------------------------------------------------------------------------

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
})

const MOCK_DELAY = 350

function delay(data, ms = MOCK_DELAY) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

export async function fetchProducts() {
  // Real backend equivalent:
  // const { data } = await api.get('/api/products')
  // return data
  return delay(PRODUCTS)
}

export async function fetchProductById(id) {
  // Real backend equivalent: GET /api/products/:id
  return delay(PRODUCTS.find((p) => p.id === Number(id)) || null)
}

export async function placeOrder(orderPayload) {
  // Real backend equivalent:
  // const { data } = await api.post('/place_order', orderPayload)
  // return data
  return delay({
    orderId: Math.floor(100000 + Math.random() * 900000),
    ...orderPayload,
  }, 600)
}
