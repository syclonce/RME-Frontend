import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSettingsResource } from '../api'

export function SettingFormPage() {
  const navigate = useNavigate()
  const { key: routeKey } = useParams<{ key: string }>()
  const isEdit = routeKey !== undefined
  const { useList, create, update } = useSettingsResource()
  const { data: existing } = useList()

  const [key, setKey] = useState('')
  const [value, setValue] = useState('')
  const [type, setType] = useState<'string' | 'int' | 'bool' | 'json'>('string')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (isEdit && routeKey && existing?.[routeKey]) {
      const entry = existing[routeKey]
      setKey(routeKey)
      setValue(typeof entry.value === 'object' ? JSON.stringify(entry.value) : String(entry.value ?? ''))
      setType(entry.type)
      setDescription(entry.description ?? '')
    }
  }, [isEdit, routeKey, existing])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        const parsedValue = type === 'bool' ? value === 'true' : type === 'int' ? Number(value) : type === 'json' ? JSON.parse(value || '{}') : value
        if (isEdit && routeKey) {
          update.mutate(
            { key: routeKey, payload: { value: parsedValue, type, description: description || undefined } },
            { onSuccess: () => navigate('/modul/aplikasi-setting') },
          )
        } else {
          create.mutate(
            { key, value: parsedValue, type, description: description || undefined },
            { onSuccess: () => navigate('/modul/aplikasi-setting') },
          )
        }
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} Pengaturan</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="key">Kunci *</Label>
        <Input id="key" value={key} onChange={(e) => setKey(e.target.value)} disabled={isEdit} required />
      </div>
      <div className="grid gap-1.5">
        <Label>Tipe</Label>
        <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="string">string</SelectItem>
            <SelectItem value="int">int</SelectItem>
            <SelectItem value="bool">bool</SelectItem>
            <SelectItem value="json">json</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="value">Nilai *</Label>
        <Input id="value" value={value} onChange={(e) => setValue(e.target.value)} required />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="description">Deskripsi</Label>
        <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
