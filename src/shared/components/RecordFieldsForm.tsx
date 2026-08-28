import { Fragment } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { RelationSelect } from '@/shared/components/RelationSelect'

export interface CrudField {
  key: string
  label: string
  type?: 'text' | 'number' | 'date' | 'textarea' | 'checkbox' | 'relation' | 'custom' | 'select'
  relationEndpoint?: string
  /** type: 'select' only — static enum options (not a server-backed relation). */
  options?: { value: string; label: string }[]
  required?: boolean
  /** Groups fields under a subheading inside the dialog — mirrors the Card-section pattern used on full-page forms. */
  section?: string
  /** For type: 'custom' — renders its own widget (e.g. a cascading region picker) instead of a generic input. */
  render?: (value: unknown, onChange: (v: unknown) => void) => React.ReactNode
  /** Greys out + disables the field when true — e.g. identity fields once a patient is marked "tidak dikenal". */
  disabledWhen?: (form: Record<string, unknown>) => boolean
  /**
   * checkbox only — extra side effect run alongside the normal value update,
   * so toggling one flag can also adjust OTHER fields (e.g. checking "tidak
   * dikenal" auto-fills `name` instead of leaving it blank-but-required).
   */
  onToggle?: (checked: boolean, form: Record<string, unknown>, setForm: (updater: (prev: Record<string, unknown>) => Record<string, unknown>) => void) => void
}

/**
 * Section-grouped field grid — the guts of the Tambah/Ubah dialog body.
 * Extracted out of CrudDialogPage (2026-08-29) so the workflow-shape pages
 * (WorkflowListPage — modules with custom status verbs or append-only, not
 * plain CRUD) can render the SAME field widgets (RelationSelect, checkbox,
 * select, custom render) for their add dialog and action-payload dialogs,
 * without duplicating this markup or drifting from CrudDialogPage's look.
 */
export function RecordFieldsForm({
  fields,
  form,
  setForm,
  readOnly = false,
}: {
  fields: CrudField[]
  form: Record<string, unknown>
  setForm: (updater: (prev: Record<string, unknown>) => Record<string, unknown>) => void
  /** Renders values as plain text instead of inputs — read-only detail view for append-only modules. */
  readOnly?: boolean
}) {
  const sectionGroups = groupFieldsBySection(fields)

  return (
    <>
      {sectionGroups.map(([section, sectionFields]) => (
        <Fragment key={section ?? '__default'}>
          {section && <h3 className="text-sm font-semibold text-foreground">{section}</h3>}
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            {sectionFields.map((f) => {
              const disabled = readOnly || (f.disabledWhen?.(form) ?? false)
              const rawValue = form[f.key]
              if (readOnly) {
                const display =
                  f.type === 'checkbox'
                    ? rawValue
                      ? 'Ya'
                      : 'Tidak'
                    : f.type === 'select'
                      ? (f.options?.find((o) => o.value === rawValue)?.label ?? String(rawValue ?? '—'))
                      : String(rawValue ?? '—')
                return (
                  <div key={f.key} className="flex flex-col gap-1">
                    <Label className="text-muted-foreground text-xs">{f.label}</Label>
                    <p className="text-sm">{display || '—'}</p>
                  </div>
                )
              }
              return (
                <div
                  key={f.key}
                  className={`flex flex-col gap-1.5 ${f.type === 'textarea' || f.type === 'custom' ? 'sm:col-span-2' : ''}`}
                >
                  {f.type !== 'checkbox' && <Label htmlFor={f.key}>{f.label}</Label>}
                  {f.type === 'checkbox' ? (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={f.key}
                        checked={Boolean(rawValue)}
                        onCheckedChange={(v) => {
                          const checked = Boolean(v)
                          setForm((prev) => ({ ...prev, [f.key]: checked }))
                          f.onToggle?.(checked, form, setForm)
                        }}
                      />
                      <Label htmlFor={f.key}>{f.label}</Label>
                    </div>
                  ) : f.type === 'textarea' ? (
                    <Textarea
                      id={f.key}
                      disabled={disabled}
                      value={(rawValue as string) ?? ''}
                      onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    />
                  ) : f.type === 'relation' && f.relationEndpoint ? (
                    <RelationSelect
                      endpoint={f.relationEndpoint}
                      value={(rawValue as number) ?? null}
                      onChange={(v) => setForm((prev) => ({ ...prev, [f.key]: v }))}
                      disabled={disabled}
                    />
                  ) : f.type === 'custom' && f.render ? (
                    f.render(rawValue, (v) => setForm((prev) => ({ ...prev, [f.key]: v })))
                  ) : f.type === 'select' ? (
                    <Select
                      value={(rawValue as string) ?? ''}
                      onValueChange={(v) => setForm((prev) => ({ ...prev, [f.key]: v }))}
                      disabled={disabled}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih..." />
                      </SelectTrigger>
                      <SelectContent>
                        {f.options?.map((o) => (
                          <SelectItem key={o.value} value={o.value}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={f.key}
                      type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
                      value={(rawValue as string | number) ?? ''}
                      required={f.required && !disabled}
                      disabled={disabled}
                      onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </Fragment>
      ))}
    </>
  )
}

/** Groups fields by their (optional) `section`, same grouping rule RecordFieldsForm uses — exposed so callers (e.g. WorkflowListPage) can decide dialog width (isWide) without duplicating the grouping logic. */
export function groupFieldsBySection(fields: CrudField[]): [string | undefined, CrudField[]][] {
  const sectionGroups: [string | undefined, CrudField[]][] = []
  for (const f of fields) {
    const last = sectionGroups[sectionGroups.length - 1]
    if (last && last[0] === f.section) last[1].push(f)
    else sectionGroups.push([f.section, [f]])
  }
  return sectionGroups
}
