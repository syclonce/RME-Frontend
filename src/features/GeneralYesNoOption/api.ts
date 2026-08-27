import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { YesNoOption } from './types'

export const GeneralYesNoOptionEndpoint = '/yes-no-options'

export function useYesNoOptionResource() {
  return useCrudResource<YesNoOption>(GeneralYesNoOptionEndpoint)
}
