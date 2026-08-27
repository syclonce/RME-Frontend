import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { RemunerationEntry } from './types'

export const PegawaiRemunerasiJasaMedisEndpoint = '/remuneration-entries'

export function useRemunerationEntryResource() {
  return useCrudResource<RemunerationEntry>(PegawaiRemunerasiJasaMedisEndpoint)
}
