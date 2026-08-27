import { apiClient } from '@/api/client'

export interface RegionCode {
  code: string
  name: string
}

export interface Village {
  id: number
  code: string
  name: string
}

export async function fetchProvinces(): Promise<RegionCode[]> {
  const res = await apiClient.get('/regions/provinces')
  return res.data
}

export async function fetchCities(provinceCode: string): Promise<RegionCode[]> {
  const res = await apiClient.get(`/regions/provinces/${provinceCode}/cities`)
  return res.data
}

export async function fetchDistricts(cityCode: string): Promise<RegionCode[]> {
  const res = await apiClient.get(`/regions/cities/${cityCode}/districts`)
  return res.data
}

export async function fetchVillages(districtCode: string): Promise<Village[]> {
  const res = await apiClient.get(`/regions/districts/${districtCode}/villages`)
  return res.data
}
