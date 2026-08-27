import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BirthCertificateLetter } from './types'

export const MedicalRecordBirthCertificateLetterEndpoint = '/birth-certificate-letters'

export function useBirthCertificateLetterResource() {
  return useCrudResource<BirthCertificateLetter>(MedicalRecordBirthCertificateLetterEndpoint)
}
