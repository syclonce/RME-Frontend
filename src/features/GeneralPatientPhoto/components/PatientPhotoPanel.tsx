import { useRef, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useGeneralPatientPhotoResource, useUploadPatientPhoto } from '../api'
import type { GeneralPatientPhoto } from '../types'

/**
 * Foto pasien khas rumah sakit: satu pasien bisa punya beberapa foto
 * seiring waktu (Alur 1001 step 3), bukan satu avatar yang ditimpa terus —
 * jadi ini daftar bertumbuh, bukan single-slot upload.
 */
export function PatientPhotoPanel({ patientId }: { patientId: number }) {
  const { useList, remove } = useGeneralPatientPhotoResource()
  const upload = useUploadPatientPhoto()
  const { data, isLoading } = useList({ patient_id: patientId })
  const [deleteTarget, setDeleteTarget] = useState<GeneralPatientPhoto | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    upload.mutate({ patientId, file })
    e.target.value = ''
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border p-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground">Foto</h4>
        <Button type="button" size="sm" variant="outline" disabled={upload.isPending} onClick={() => fileInputRef.current?.click()}>
          {upload.isPending ? 'Mengunggah...' : 'Unggah Foto'}
        </Button>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </div>

      {upload.isError && <p className="text-destructive text-xs">Gagal mengunggah foto. Coba lagi.</p>}

      {isLoading ? (
        <p className="text-muted-foreground text-xs">Memuat...</p>
      ) : data && data.items.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {data.items.map((photo) => (
            <div key={photo.id} className="group relative">
              <img
                src={photo.photo_url ?? undefined}
                alt="Foto pasien"
                className="h-20 w-20 rounded-md border object-cover"
              />
              <button
                type="button"
                className="bg-destructive text-destructive-foreground absolute -top-1.5 -right-1.5 hidden h-5 w-5 items-center justify-center rounded-full text-xs group-hover:flex"
                onClick={() => setDeleteTarget(photo)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-xs">Belum ada foto.</p>
      )}

      <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus foto ini?</AlertDialogTitle>
            <AlertDialogDescription>Foto akan dihapus permanen.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => {
                if (deleteTarget) remove.mutate(deleteTarget.id)
                setDeleteTarget(null)
              }}
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
