import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTabs } from '@/contexts/TabsContext'

export function TabStrip() {
  const { tabs, activeTabId, activateTab, closeTab } = useTabs()

  if (tabs.length === 0) return null

  return (
    <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tab"
          aria-selected={tab.id === activeTabId}
          onClick={() => activateTab(tab.id)}
          className={cn(
            'group flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-md border px-2.5 text-sm',
            tab.id === activeTabId
              ? 'bg-sidebar-accent text-sidebar-accent-foreground border-border'
              : 'text-muted-foreground hover:bg-sidebar-accent/50 border-transparent',
          )}
        >
          <span className="max-w-40 truncate">{tab.label}</span>
          {!tab.pinned && (
            <button
              type="button"
              aria-label={`Tutup tab ${tab.label}`}
              onClick={(e) => {
                e.stopPropagation()
                closeTab(tab.id)
              }}
              className="rounded-sm p-0.5 opacity-0 group-hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
