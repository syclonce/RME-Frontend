import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PendaftaranHistory } from './types'

export const PendaftaranHistoryEndpoint = '/registration-histories'

export function usePendaftaranHistoryResource() {
  return useCrudResource<PendaftaranHistory>(PendaftaranHistoryEndpoint)
}
