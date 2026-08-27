import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { RadiologyViewerLog } from './types'

export const LayananRadiologyViewerLogEndpoint = '/radiology-viewer-logs'

export function useRadiologyViewerLogResource() {
  return useCrudResource<RadiologyViewerLog>(LayananRadiologyViewerLogEndpoint)
}
