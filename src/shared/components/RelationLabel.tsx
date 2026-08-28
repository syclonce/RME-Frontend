import { useOptions } from '@/shared/hooks/useOptions'

/**
 * Resolves a foreign-key id to its human label INSIDE a table cell — the
 * generated list pages previously just printed the raw id (or "-" for null),
 * which is unreadable for staff (e.g. gender_id=2 instead of "Perempuan").
 * Forms already had this via RelationSelect; list tables did not.
 */
export function RelationLabel({ endpoint, id }: { endpoint: string; id: number | null | undefined }) {
  const { data: options, isLoading } = useOptions(id != null ? endpoint : null)

  if (id == null) return <span className="text-muted-foreground">—</span>
  if (isLoading) return <span className="text-muted-foreground">…</span>

  const label = options?.find((o) => o.id === id)?.label
  return <span>{label ?? `#${id}`}</span>
}
