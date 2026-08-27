import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Language } from './types'

export const GeneralLanguageEndpoint = '/languages'

export function useLanguageResource() {
  return useCrudResource<Language>(GeneralLanguageEndpoint)
}
