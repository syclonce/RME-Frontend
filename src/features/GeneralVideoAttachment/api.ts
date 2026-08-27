import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { VideoAttachment } from './types'

export const GeneralVideoAttachmentEndpoint = '/video-attachments'

export function useVideoAttachmentResource() {
  return useCrudResource<VideoAttachment>(GeneralVideoAttachmentEndpoint)
}
