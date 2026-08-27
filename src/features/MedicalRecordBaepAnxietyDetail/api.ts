import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BaepAnxietyDetail } from './types'

export const MedicalRecordBaepAnxietyDetailEndpoint = '/baep-anxiety-details'

export function useBaepAnxietyDetailResource() {
  return useCrudResource<BaepAnxietyDetail>(MedicalRecordBaepAnxietyDetailEndpoint)
}
