import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ControlSchedule } from './types'

export const MedicalRecordControlScheduleEndpoint = '/control-schedules'

export function useControlScheduleResource() {
  return useCrudResource<ControlSchedule>(MedicalRecordControlScheduleEndpoint)
}
