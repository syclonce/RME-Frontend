import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientTransfer } from './types'

export const PendaftaranPatientTransferEndpoint = '/patienttransfers'

export function usePatientTransferResource() {
  return useCrudResource<PatientTransfer>(PendaftaranPatientTransferEndpoint)
}
