import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DoctorDiscount } from './types'

export const PembayaranDoctorDiscountEndpoint = '/doctor-discounts'

export function useDoctorDiscountResource() {
  return useCrudResource<DoctorDiscount>(PembayaranDoctorDiscountEndpoint)
}
