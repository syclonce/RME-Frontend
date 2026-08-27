export interface Employee {
  id: number
  user_id?: number | null
  employee_number?: string | null
  name: string | null
  nickname?: string | null
  title_prefix?: string | null
  title_suffix?: string | null
  birth_place?: string | null
  birth_date?: string | null
  religion_id?: number | null
  gender_id?: number | null
  profession_id?: number | null
  smf_id?: number | null
  address?: string | null
  rt?: string | null
  rw?: string | null
  postal_code?: string | null
  village_id?: number | null
  is_non_employee?: boolean | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface EmployeeFormValues {
  user_id?: number | null
  employee_number?: string | null
  name?: string | null
  nickname?: string | null
  title_prefix?: string | null
  title_suffix?: string | null
  birth_place?: string | null
  birth_date?: string | null
  religion_id?: number | null
  gender_id?: number | null
  profession_id?: number | null
  smf_id?: number | null
  address?: string | null
  rt?: string | null
  rw?: string | null
  postal_code?: string | null
  village_id?: number | null
  is_non_employee?: boolean | null
  is_active?: boolean | null
}
