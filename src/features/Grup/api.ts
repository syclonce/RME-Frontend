import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { normalizeList } from '@/shared/types'
import type {
  CreateGroupReferralInput,
  GroupContext,
  GroupPatientDetail,
  GroupPatientSummary,
  GroupReferral,
} from './types'

const endpoint = '/grup'

export function useGroupContext() {
  return useQuery({
    queryKey: ['grup', 'context'],
    queryFn: async () => (await apiClient.get(`${endpoint}/context`)).data.data as GroupContext | null,
  })
}

export function useGroupPatients(params: { branch_id?: string; q: string }) {
  return useQuery({
    queryKey: ['grup', 'patients', params],
    queryFn: async () => normalizeList<GroupPatientSummary>((await apiClient.get(`${endpoint}/patients`, { params })).data),
    enabled: params.q.trim().length >= 3,
  })
}

export function useGroupPatient(branchId?: string, patientId?: string) {
  return useQuery({
    queryKey: ['grup', 'patient', branchId, patientId],
    queryFn: async () =>
      (await apiClient.get(`${endpoint}/patients/${encodeURIComponent(branchId!)}/${encodeURIComponent(patientId!)}`)).data
        .data as GroupPatientDetail,
    enabled: Boolean(branchId && patientId),
  })
}

export function useGroupReferrals() {
  return useQuery({
    queryKey: ['grup', 'referrals'],
    queryFn: async () => normalizeList<GroupReferral>((await apiClient.get(`${endpoint}/referrals`)).data.data),
    refetchInterval: 15_000,
  })
}

export function useCreateGroupReferral() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: CreateGroupReferralInput) => (await apiClient.post(`${endpoint}/referrals`, payload)).data.data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['grup', 'referrals'] }),
  })
}

export function useUpdateGroupReferralStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) =>
      (await apiClient.patch(`${endpoint}/referrals/${id}/status`, { status })).data.data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['grup', 'referrals'] }),
  })
}

export function useSyncGroupContext() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => (await apiClient.post(`${endpoint}/context/sync`)).data.data as GroupContext,
    onSuccess: (data) => queryClient.setQueryData(['grup', 'context'], data),
  })
}
