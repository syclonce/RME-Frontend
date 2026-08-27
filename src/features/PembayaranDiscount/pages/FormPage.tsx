import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDiscountResource } from '../api'
import type { DiscountFormValues } from '../types'

export function DiscountFormPage() {
  const { create } = useDiscountResource()
  const [values, setValues] = useState<DiscountFormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
      }}
    >
      <h1 className="text-lg font-semibold">Tambah Discount</h1>
      <div className="grid gap-1.5">
        <Label htmlFor="code">Code *</Label>
        <Input id="code" type="text" value={values.code ?? ''} onChange={(e) => setValues({ ...values, code: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" type="text" value={values.name ?? ''} onChange={(e) => setValues({ ...values, name: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="discount_type">Discount Type *</Label>
        <Input id="discount_type" type="text" value={values.discount_type ?? ''} onChange={(e) => setValues({ ...values, discount_type: e.target.value })} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="value">Value *</Label>
        <Input id="value" type="number" value={values.value ?? ''} onChange={(e) => setValues({ ...values, value: e.target.value === '' ? null : Number(e.target.value) })} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="is_active" checked={!!values.is_active} onCheckedChange={(v) => setValues({ ...values, is_active: !!v })} />
        <Label htmlFor="is_active">Is Active</Label>
      </div>
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
