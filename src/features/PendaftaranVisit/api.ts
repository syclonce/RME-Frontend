import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Visit } from './types'

export const PendaftaranVisitEndpoint = '/visits'

export function useVisitResource() {
  return useCrudResource<Visit>(PendaftaranVisitEndpoint)
}
