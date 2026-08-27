import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ContactType } from './types'

export const GeneralContactTypeEndpoint = '/contact-types'

export function useContactTypeResource() {
  return useCrudResource<ContactType>(GeneralContactTypeEndpoint)
}
