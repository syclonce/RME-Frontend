import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AnesthesiaPreparation } from './types'

export const MedicalRecordAnesthesiaPreparationEndpoint = '/anesthesia-preparations'

export function useAnesthesiaPreparationResource() {
  return useCrudResource<AnesthesiaPreparation>(MedicalRecordAnesthesiaPreparationEndpoint)
}
