import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BaepStimulationProtocolDetail } from './types'

export const MedicalRecordBaepStimulationProtocolDetailEndpoint = '/baep-stimulation-protocol-details'

export function useBaepStimulationProtocolDetailResource() {
  return useCrudResource<BaepStimulationProtocolDetail>(MedicalRecordBaepStimulationProtocolDetailEndpoint)
}
