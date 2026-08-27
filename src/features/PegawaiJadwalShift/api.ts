import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ShiftSchedule } from './types'

export const PegawaiJadwalShiftEndpoint = '/shift-schedules'

export function useShiftScheduleResource() {
  return useCrudResource<ShiftSchedule>(PegawaiJadwalShiftEndpoint)
}
