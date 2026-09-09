import { describe, expect, it } from 'vitest'
import { normalizeItem, normalizeList } from './types'

/**
 * Backend tidak seragam (Resource {data} vs model/paginator mentah) —
 * helper ini satu-satunya penopang kontrak itu di semua fitur.
 */
describe('normalizeList', () => {
  it('membaca Resource::collection paginated {data, meta}', () => {
    const out = normalizeList<{ id: number }>({
      data: [{ id: 1 }, { id: 2 }],
      meta: { current_page: 2, last_page: 5, total: 10 },
    })
    expect(out.items).toHaveLength(2)
    expect(out.currentPage).toBe(2)
    expect(out.total).toBe(10)
  })

  it('membaca paginator Laravel mentah', () => {
    const out = normalizeList<{ id: number }>({
      current_page: 1, last_page: 1, total: 1, data: [{ id: 7 }],
    })
    expect(out.items).toEqual([{ id: 7 }])
  })

  it('membaca paginator dibungkus ganda {data: {paginator}}', () => {
    const out = normalizeList<{ id: number }>({
      data: { current_page: 1, last_page: 1, total: 1, data: [{ id: 9 }] },
    })
    expect(out.items).toEqual([{ id: 9 }])
  })

  it('membaca array polos dan respons kosong', () => {
    expect(normalizeList([{ id: 1 }]).items).toEqual([{ id: 1 }])
    expect(normalizeList(null).items).toEqual([])
  })
})

describe('normalizeItem', () => {
  it('membuka wrapper {data} dan melewatkan objek polos', () => {
    expect(normalizeItem({ data: { id: 3 } })).toEqual({ id: 3 })
    expect(normalizeItem({ id: 4 })).toEqual({ id: 4 })
  })
})
