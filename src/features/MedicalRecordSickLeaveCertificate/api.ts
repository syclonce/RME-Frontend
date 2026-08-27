import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SickLeaveCertificate } from './types'

export const MedicalRecordSickLeaveCertificateEndpoint = '/sick-leave-certificates'

export function useSickLeaveCertificateResource() {
  return useCrudResource<SickLeaveCertificate>(MedicalRecordSickLeaveCertificateEndpoint)
}
