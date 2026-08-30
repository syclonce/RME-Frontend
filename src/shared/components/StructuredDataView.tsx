import { Badge } from '@/components/ui/badge'

function labelOf(key: string): string {
  return key.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function ScalarValue({ value }: { value: unknown }) {
  if (typeof value === 'boolean') {
    return <Badge variant={value ? 'default' : 'secondary'}>{value ? 'Ya' : 'Tidak'}</Badge>
  }
  if (value === null || value === undefined || value === '') {
    return <span className="text-muted-foreground">—</span>
  }
  return <span className="break-words">{String(value)}</span>
}

export function StructuredDataView({ data }: { data: unknown }) {
  if (Array.isArray(data)) {
    if (data.length === 0) return <p className="text-muted-foreground text-sm">Tidak ada data.</p>
    return (
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="rounded-md border p-3">
            <StructuredDataView data={item} />
          </div>
        ))}
      </div>
    )
  }

  if (typeof data === 'object' && data !== null) {
    return (
      <dl className="grid gap-3 sm:grid-cols-2">
        {Object.entries(data as Record<string, unknown>).map(([key, value]) => (
          <div key={key} className={typeof value === 'object' && value !== null ? 'sm:col-span-2' : ''}>
            <dt className="text-muted-foreground text-xs font-medium">{labelOf(key)}</dt>
            <dd className="mt-1 text-sm">
              {typeof value === 'object' && value !== null ? <StructuredDataView data={value} /> : <ScalarValue value={value} />}
            </dd>
          </div>
        ))}
      </dl>
    )
  }

  return <ScalarValue value={data} />
}
