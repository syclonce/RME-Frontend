import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Edc } from './types'

export const PembayaranEdcEndpoint = '/edc-transactions'

export function useEdcResource() {
  return useCrudResource<Edc>(PembayaranEdcEndpoint)
}
