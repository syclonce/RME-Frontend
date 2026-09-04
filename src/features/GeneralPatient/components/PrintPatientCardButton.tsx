import { useState } from 'react'
import { apiClient } from '@/api/client'
import { Button } from '@/components/ui/button'
import { usePrintDocumentResource } from '@/features/CetakanPrintDocument/api'

/**
 * Alur 1001 step 5: cetak kartu berobat begitu pasien baru dibuat, sebelum
 * ada pendaftaran/kunjungan apapun. PDF endpoint butuh Bearer token (bukan
 * cookie), jadi tidak bisa window.open ke URL langsung — di-fetch sebagai
 * blob lalu dibuka lewat object URL.
 */
export function PrintPatientCardButton({ patientId }: { patientId: number }) {
  const { issue } = usePrintDocumentResource()
  const [printing, setPrinting] = useState(false)

  async function handlePrint() {
    setPrinting(true)
    try {
      const result = await issue.mutateAsync({
        document_type: 'patient_card',
        ref_type: 'patients',
        ref_id: patientId,
      })
      const documentId = result?.data?.document?.id
      if (!documentId) return

      const res = await apiClient.get(`/print-documents/${documentId}/pdf`, { responseType: 'blob' })
      const blobUrl = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
      window.open(blobUrl, '_blank')
    } finally {
      setPrinting(false)
    }
  }

  return (
    <Button type="button" size="sm" variant="outline" disabled={printing} onClick={handlePrint}>
      {printing ? 'Menyiapkan...' : 'Cetak Kartu Pasien'}
    </Button>
  )
}
