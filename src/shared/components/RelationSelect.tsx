import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useOptions } from '@/shared/hooks/useOptions'

interface RelationSelectProps {
  endpoint: string
  value: number | null
  onChange: (value: number | null) => void
}

export function RelationSelect({ endpoint, value, onChange }: RelationSelectProps) {
  const { data: options, isLoading } = useOptions(endpoint)

  return (
    <Select
      value={value !== null ? String(value) : undefined}
      onValueChange={(v) => onChange(v ? Number(v) : null)}
    >
      <SelectTrigger>
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
