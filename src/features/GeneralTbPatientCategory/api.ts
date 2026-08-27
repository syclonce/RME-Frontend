import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { TbPatientCategory } from './types'

export const GeneralTbPatientCategoryEndpoint = '/tb-patient-categories'

export function useTbPatientCategoryResource() {
  return useCrudResource<TbPatientCategory>(GeneralTbPatientCategoryEndpoint)
}
