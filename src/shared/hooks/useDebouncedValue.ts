import { useEffect, useState } from 'react'

/**
 * Tunda nilai sampai pengetikan berhenti.
 *
 * Dipakai kotak pencarian daftar: tanpa ini setiap ketikan memicu satu
 * permintaan, dan sebagian tabel di aplikasi ini besar — `diagnosis_codes`
 * berisi 40.807 baris, `patients` 5.031. Mengetik "diabetes" akan menembakkan
 * delapan kueri berturut-turut yang tujuh di antaranya sudah usang sebelum
 * jawabannya tiba.
 */
export function useDebouncedValue<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(timer)
  }, [value, delayMs])

  return debounced
}
