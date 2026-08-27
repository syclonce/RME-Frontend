import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { HealthCertificate } from './types'

export const MedicalRecordHealthCertificateEndpoint = '/health-certificates'

export function useHealthCertificateResource() {
  return useCrudResource<HealthCertificate>(MedicalRecordHealthCertificateEndpoint)
}
