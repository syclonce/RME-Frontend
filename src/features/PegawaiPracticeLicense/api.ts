import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PracticeLicense } from './types'

export const PegawaiPracticeLicenseEndpoint = '/practice-licenses'

export function usePracticeLicenseResource() {
  return useCrudResource<PracticeLicense>(PegawaiPracticeLicenseEndpoint)
}
