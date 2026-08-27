export interface SettingEntry {
  value: string | number | boolean | Record<string, unknown> | null
  type: 'string' | 'int' | 'bool' | 'json'
  description: string | null
}

export type SettingsMap = Record<string, SettingEntry>
