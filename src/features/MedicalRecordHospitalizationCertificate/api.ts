import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { HospitalizationCertificate } from './types'

export const MedicalRecordHospitalizationCertificateEndpoint = '/hospitalization-certificates'

export function useHospitalizationCertificateResource() {
  return useCrudResource<HospitalizationCertificate>(MedicalRecordHospitalizationCertificateEndpoint)
}
