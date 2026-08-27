import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientReceivable } from './types'

export const PembayaranPatientReceivableEndpoint = '/patient-receivables'

export function usePatientReceivableResource() {
  return useCrudResource<PatientReceivable>(PembayaranPatientReceivableEndpoint)
}
