import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { normalizeItem } from '@/shared/types'
import { resolveActiveVisitId } from '@/shared/lib/visitContext'
import type { Patient } from '@/features/GeneralPatient/types'
import type { Registration } from '@/features/PendaftaranRegistration/types'
import type { Visit } from '@/features/PendaftaranVisit/types'

export interface ActiveVisitContext {
  visit: Visit
  registration: Registration
  patient: Patient
}

/**
 * Kunjungan yang sedang dilayani, bila ada.
 *
 * Dipakai modul klinis agar tahu pasien mana yang sedang dikerjakan tanpa
 * petugas mengetik `visit_id` manual — sumber salah-input yang nyata, karena
 * nomor kunjungan tidak dihafal siapa pun.
 *
 * Mengembalikan `visitId: null` bila modul dibuka lepas dari workspace; pemanggil
 * harus tetap berfungsi tanpa konteks (halaman CRUD biasa).
 */
export function useActiveVisit() {
  const { search } = useLocation()
  const visitId = useMemo(() => resolveActiveVisitId(search), [search])

  const query = useQuery<ActiveVisitContext>({
    queryKey: ['active-visit', visitId],
    enabled: visitId !== null,
    staleTime: 60_000,
    queryFn: async () => {
      const visitResponse = await apiClient.get(`/visits/${visitId}`)
      const visit = normalizeItem<Visit>(visitResponse.data)
      const registrationResponse = await apiClient.get(`/registrations/${visit.registration_id}`)
      const registration = normalizeItem<Registration>(registrationResponse.data)
      const patientResponse = await apiClient.get(`/patients/${registration.patient_id}`)
      const patient = normalizeItem<Patient>(patientResponse.data)
      return { visit, registration, patient }
    },
  })

  return {
    visitId,
    context: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  }
}
