import { useState, useRef, useEffect } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useSearchOptions } from '@/shared/hooks/useSearchOptions'

interface AsyncComboboxProps {
  endpoint: string
  value: number | null
  onChange: (value: number | null) => void
  disabled?: boolean
}

export function AsyncCombobox({ endpoint, value, onChange, disabled }: AsyncComboboxProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { data: options, isLoading } = useSearchOptions(endpoint, search)
  const searchRef = useRef<string>(search)

  // Reset search when popover closes
  useEffect(() => {
    if (!open) {
      // Delay reset so the closing animation finishes
      const timer = setTimeout(() => setSearch(''), 150)
      return () => clearTimeout(timer)
    }
  }, [open])

  const selected = options?.find((o) => o.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between font-normal"
        >
          {selected ? selected.label : isLoading ? 'Memuat...' : 'Pilih...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Cari..."
            value={search}
            onValueChange={(v) => {
              setSearch(v)
              searchRef.current = v
            }}
          />
          <CommandList>
            <CommandEmpty>
              {isLoading ? 'Memuat...' : 'Data tidak ditemukan'}
            </CommandEmpty>
            <CommandGroup>
              {options?.map((opt) => (
                <CommandItem
                  key={opt.id}
                  value={String(opt.id)}
                  onSelect={() => {
                    const next = opt.id === value ? null : opt.id
                    onChange(next)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === opt.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
