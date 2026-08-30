import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Ambulance, AmbulanceTrip } from './types'

export const GeneralAmbulanceFleetEndpoint = '/ambulances'
export const AmbulanceTripEndpoint = '/ambulance-trips'

export function useAmbulanceResource() {
  return useCrudResource<Ambulance>(GeneralAmbulanceFleetEndpoint)
}

export function useAmbulanceTripResource() {
  return useCrudResource<AmbulanceTrip>(AmbulanceTripEndpoint)
}
