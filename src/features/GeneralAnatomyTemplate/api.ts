import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AnatomyTemplate } from './types'

export const GeneralAnatomyTemplateEndpoint = '/anatomy-templates'

export function useAnatomyTemplateResource() {
  return useCrudResource<AnatomyTemplate>(GeneralAnatomyTemplateEndpoint)
}
