// codegen:preserve — interaksi obat wajib diperiksa sebelum dispense.
import { useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { EndpointQueryDialog } from '@/shared/components/EndpointQueryDialog'
import { apiClient } from '@/api/client'
import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'
import { humanizeField, humanizeModuleName } from '@/shared/labels'
import { LayananPharmacyDispenseEndpoint, usePharmacyDispenseResource, useInteractionCheck } from '../api'
import type { PharmacyDispense } from '../types'

const SEVERITY_COLORS: Record<string, string> = {
  minor: 'bg-blue-100 text-blue-800',
  mild: 'bg-blue-100 text-blue-800',
  moderate: 'bg-yellow-100 text-yellow-800',
  major_contraindicated: 'bg-red-100 text-red-800',
  severe: 'bg-red-100 text-red-800',
}

const SEVERITY_LABELS: Record<string, string> = {
  minor: 'Ringan',
  mild: 'Ringan',
  moderate: 'Sedang',
  major_contraindicated: 'Kontraindikasi',
  severe: 'Berat',
}

function InteractionCheckDialog({
  prescriptionId,
  open,
  onOpenChange,
}: {
  prescriptionId: number | undefined
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { data: findings, isLoading } = useInteractionCheck(
    open ? prescriptionId : undefined,
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] flex-col overflow-hidden sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Cek Interaksi Obat</DialogTitle>
          <DialogDescription>
            Resep #{prescriptionId} — Hasil pemeriksaan interaksi obat & alergi (CDSS advisory).
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 overflow-y-auto px-1 py-2 pr-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : !findings || findings.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
              <span className="text-4xl">✅</span>
              <p className="text-sm">Tidak ditemukan interaksi obat maupun alergi untuk resep ini.</p>
            </div>
          ) : (
            findings.map((f, i) => (
              <div
                key={i}
                className="rounded-md border p-3 flex flex-col gap-1.5"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={f.type === 'allergy' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'}>
                    {f.type === 'allergy' ? 'Alergi' : 'Interaksi'}
                  </Badge>
                  {f.severity && (
                    <Badge variant="outline" className={SEVERITY_COLORS[f.severity] ?? ''}>
                      {SEVERITY_LABELS[f.severity] ?? f.severity}
                    </Badge>
                  )}
                </div>
                <p className="text-sm">{f.message}</p>
              </div>
            ))
          )}
        </div>

        <DialogFooter className="bg-transparent pt-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function PharmacyDispenseListPage() {
  const resource = usePharmacyDispenseResource()
  const title = humanizeModuleName('LayananPharmacyDispense')
  const [checkPrescriptionId, setCheckPrescriptionId] = useState<number | undefined>(undefined)

  const columns: ColumnDef<PharmacyDispense, unknown>[] = [
    {
      header: humanizeField('prescription_id'),
      accessorKey: 'prescription_id',
      cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).prescription_id ?? '—'),
    },
    {
      header: humanizeField('dispensed_by'),
      accessorKey: 'dispensed_by',
      cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).dispensed_by ?? '—'),
    },
    {
      header: humanizeField('dispensed_at'),
      accessorKey: 'dispensed_at',
      cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).dispensed_at ?? '—'),
    },
    {
      header: humanizeField('quantity'),
      accessorKey: 'quantity',
      cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).quantity ?? '—'),
    },
    {
      header: humanizeField('status'),
      cell: ({ row }) => {
        const v = (row.original as unknown as Record<string, unknown>).status
        return v ? <Badge variant="outline">{String(v)}</Badge> : '—'
      },
    },
    {
      header: 'Interaksi',
      id: 'interaction',
      cell: ({ row }) => {
        const prescriptionId = (row.original as unknown as Record<string, unknown>).prescription_id as number | undefined
        if (!prescriptionId) return <span className="text-muted-foreground text-xs">—</span>
        return (
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation()
              setCheckPrescriptionId(prescriptionId)
            }}
          >
            Cek Interaksi
          </Button>
        )
      },
    },
  ]

  const fields: CrudField[] = [
    { key: 'prescription_id', label: humanizeField('prescription_id'), type: 'number', required: true },
  ]

  const emptyForm = {
    prescription_id: '',
  }

  const actions: WorkflowAction<PharmacyDispense>[] = [
    {
      key: 'cancel',
      label: 'Batalkan Dispense',
      method: 'put',
      path: (item) => `/pharmacy-dispenses/${item.id}`,
      payload: { status: 'cancelled' },
      variant: 'destructive',
      visibleWhen: (item) => item.status === 'dispensed',
      confirmDescription: (item) => `Batalkan dispense #${item.id}? Stok akan dikembalikan dan status resep disinkronkan.`,
    },
  ]

  return (
    <>
      <WorkflowListPage<PharmacyDispense>
        title={title}
        description={`Kelola data ${title.toLowerCase()}.`}
        endpoint={LayananPharmacyDispenseEndpoint}
        columns={columns}
        capabilities={{ canCreate: true, canUpdate: false, canDestroy: false }}
        fields={fields}
        emptyForm={emptyForm}
        itemLabel={(item) => `#${item.id}`}
        actions={actions}
        resource={resource}
        createLabel="Layani Resep"
        headerActions={
          <EndpointQueryDialog
            triggerLabel="Cek Interaksi Sebelum Dispense"
            title="Cek Interaksi Pra-Dispense"
            description="Periksa interaksi obat dan alergi sebelum resep dilayani."
            fields={[{ key: 'prescription_id', label: humanizeField('prescription_id'), type: 'number', required: true }]}
            initialForm={{ prescription_id: '' }}
            query={async (form) => {
              const response = await apiClient.get(`/prescriptions/${form.prescription_id}/interaction-check`)
              return response.data?.data ?? []
            }}
          />
        }
      />
      <InteractionCheckDialog
        prescriptionId={checkPrescriptionId}
        open={checkPrescriptionId !== undefined}
        onOpenChange={(open) => {
          if (!open) setCheckPrescriptionId(undefined)
        }}
      />
    </>
  )
}
