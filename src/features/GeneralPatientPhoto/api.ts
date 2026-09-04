import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { useCrudResource } from '@/shared/hooks/useCrudResource'
import { normalizeItem } from '@/shared/types'
import type { GeneralPatientPhoto } from './types'

export const GeneralPatientPhotoEndpoint = '/patient-photos'

export function useGeneralPatientPhotoResource() {
  return useCrudResource<GeneralPatientPhoto>(GeneralPatientPhotoEndpoint)
}

/**
 * File upload butuh multipart/form-data, bukan JSON — useCrudResource.create
 * tidak cocok untuk ini (endpoint backend menerima field `photo` sebagai
 * UploadedFile, bukan `file_path` string).
 */
export function useUploadPatientPhoto() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ patientId, file }: { patientId: number; file: File }) => {
      const formData = new FormData()
      formData.append('patient_id', String(patientId))
      formData.append('photo', file)

      const res = await apiClient.post(GeneralPatientPhotoEndpoint, formData)
      return normalizeItem<GeneralPatientPhoto>(res.data)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [GeneralPatientPhotoEndpoint] }),
  })
}
