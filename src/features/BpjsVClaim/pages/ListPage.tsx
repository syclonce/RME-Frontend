import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = [
  {
    "verb": "get",
    "uri": "seps"
  },
  {
    "verb": "post",
    "uri": "seps"
  },
  {
    "verb": "get",
    "uri": "seps/{sep}"
  },
  {
    "verb": "put",
    "uri": "seps/{sep}"
  },
  {
    "verb": "delete",
    "uri": "seps/{sep}"
  },
  {
    "verb": "post",
    "uri": "sep-pengajuans"
  },
  {
    "verb": "post",
    "uri": "sep-pengajuans/{sepPengajuan}/approve"
  },
  {
    "verb": "get",
    "uri": "rencana-kontrols"
  },
  {
    "verb": "post",
    "uri": "rencana-kontrols"
  },
  {
    "verb": "get",
    "uri": "rencana-kontrols/{rencanaKontrol}"
  },
  {
    "verb": "put",
    "uri": "rencana-kontrols/{rencanaKontrol}"
  },
  {
    "verb": "delete",
    "uri": "rencana-kontrols/{rencanaKontrol}"
  },
  {
    "verb": "get",
    "uri": "rencana-kontrols-lookup/spesialistik"
  },
  {
    "verb": "get",
    "uri": "rencana-kontrols-lookup/jadwal-dokter"
  },
  {
    "verb": "get",
    "uri": "spris"
  },
  {
    "verb": "post",
    "uri": "spris"
  },
  {
    "verb": "get",
    "uri": "spris/{spri}"
  },
  {
    "verb": "put",
    "uri": "spris/{spri}"
  },
  {
    "verb": "get",
    "uri": "rujukan-antar-rs"
  },
  {
    "verb": "post",
    "uri": "rujukan-antar-rs"
  },
  {
    "verb": "get",
    "uri": "rujukan-antar-rs/{rujukanAntarRs}"
  },
  {
    "verb": "put",
    "uri": "rujukan-antar-rs/{rujukanAntarRs}"
  },
  {
    "verb": "delete",
    "uri": "rujukan-antar-rs/{rujukanAntarRs}"
  },
  {
    "verb": "get",
    "uri": "rujukan-khusus"
  },
  {
    "verb": "post",
    "uri": "rujukan-khusus"
  },
  {
    "verb": "get",
    "uri": "rujukan-khusus/{rujukanKhusus}"
  },
  {
    "verb": "delete",
    "uri": "rujukan-khusus/{rujukanKhusus}"
  },
  {
    "verb": "get",
    "uri": "peserta/no-kartu/{noKartu}/tgl-sep/{tglSep}"
  },
  {
    "verb": "get",
    "uri": "peserta/nik/{nik}/tgl-sep/{tglSep}"
  },
  {
    "verb": "get",
    "uri": "peserta/suplesi-jasa-raharja/{noKartu}/{tglPelayanan}"
  },
  {
    "verb": "get",
    "uri": "referensi/faskes/{parameter1}/{parameter2}"
  },
  {
    "verb": "get",
    "uri": "referensi/dokter"
  },
  {
    "verb": "get",
    "uri": "referensi/diagnosa/{query}"
  },
  {
    "verb": "get",
    "uri": "referensi/poli/{query}"
  },
  {
    "verb": "get",
    "uri": "referensi/propinsi"
  },
  {
    "verb": "get",
    "uri": "referensi/kabupaten/{kodePropinsi}"
  },
  {
    "verb": "get",
    "uri": "referensi/kecamatan/{kodeKabupaten}"
  },
  {
    "verb": "get",
    "uri": "referensi/procedure/{query}"
  },
  {
    "verb": "get",
    "uri": "prb/nomor/{nomor}/no-sep/{noSep}"
  },
  {
    "verb": "get",
    "uri": "prb/tanggal"
  },
  {
    "verb": "get",
    "uri": "lpk"
  },
  {
    "verb": "get",
    "uri": "monitoring/kunjungan"
  }
] as const

export function BpjsVClaimListPage() {
  return <ApiConsole moduleName="BpjsVClaim" routes={[...ROUTES]} />
}
