import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AudioAttachment } from './types'

export const GeneralAudioAttachmentEndpoint = '/audio-attachments'

export function useAudioAttachmentResource() {
  return useCrudResource<AudioAttachment>(GeneralAudioAttachmentEndpoint)
}
