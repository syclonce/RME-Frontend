import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useOptions } from '@/shared/hooks/useOptions'

interface RelationSelectProps {
  endpoint: string
  value: number | null
  onChange: (value: number | null) => void
  disabled?: boolean
}

export function RelationSelect({ endpoint, value, onChange, disabled }: RelationSelectProps) {
  const { data: options, isLoading } = useOptions(endpoint)

  return (
    <Select value={value !== null ? String(value) : ''} onValueChange={(v) => onChange(v ? Number(v) : null)} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={isLoading ? 'Memuat...' : 'Pilih...'} />
      </SelectTrigger>
      <SelectContent>
        {options?.map((opt) => (
          <SelectItem key={opt.id} value={String(opt.id)}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
