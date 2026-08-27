import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { TbDiseaseHistory } from './types'

export const MedicalRecordTbDiseaseHistoryEndpoint = '/tb-disease-histories'

export function useTbDiseaseHistoryResource() {
  return useCrudResource<TbDiseaseHistory>(MedicalRecordTbDiseaseHistoryEndpoint)
}
