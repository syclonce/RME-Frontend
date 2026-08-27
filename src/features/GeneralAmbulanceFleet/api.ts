import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Ambulance } from './types'

export const GeneralAmbulanceFleetEndpoint = '/ambulances'

export function useAmbulanceResource() {
  return useCrudResource<Ambulance>(GeneralAmbulanceFleetEndpoint)
}
