import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Anamnesis } from './types'

export const MedicalRecordAnamnesisEndpoint = '/anamneses'

export function useAnamnesisResource() {
  return useCrudResource<Anamnesis>(MedicalRecordAnamnesisEndpoint)
}
