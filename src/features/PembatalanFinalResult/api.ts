import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PembatalanFinalResult } from './types'

export const PembatalanFinalResultEndpoint = '/final-results'

export function usePembatalanFinalResultResource() {
  return useCrudResource<PembatalanFinalResult>(PembatalanFinalResultEndpoint)
}
