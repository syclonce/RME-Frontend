import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AnamnesisSource } from './types'

export const MedicalRecordAnamnesisSourceEndpoint = '/anamnesis-sources'

export function useAnamnesisSourceResource() {
  return useCrudResource<AnamnesisSource>(MedicalRecordAnamnesisSourceEndpoint)
}
