import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DoctorMedicalDepartment } from './types'

export const GeneralDoctorMedicalDepartmentEndpoint = '/doctor-medical-departments'

export function useDoctorMedicalDepartmentResource() {
  return useCrudResource<DoctorMedicalDepartment>(GeneralDoctorMedicalDepartmentEndpoint)
}
