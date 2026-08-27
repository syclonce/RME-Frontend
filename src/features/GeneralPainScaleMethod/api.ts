import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PainScaleMethod } from './types'

export const GeneralPainScaleMethodEndpoint = '/pain-scale-methods'

export function usePainScaleMethodResource() {
  return useCrudResource<PainScaleMethod>(GeneralPainScaleMethodEndpoint)
}
