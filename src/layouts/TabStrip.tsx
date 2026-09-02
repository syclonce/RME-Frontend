import { useRef, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTabs } from '@/contexts/TabsContext'

export function TabStrip() {
  const { tabs, activeTabId, activateTab, closeTab, reorderTab } = useTabs()
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [dragOverId, setDragOverId] = useState<string | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const panRef = useRef<{ startX: number; startScrollLeft: number } | null>(null)
  const [isPanning, setIsPanning] = useState(false)

  if (tabs.length === 0) return null

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    if (!scrollRef.current) return
    panRef.current = { startX: e.clientX, startScrollLeft: scrollRef.current.scrollLeft }
    setIsPanning(true)
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!panRef.current || !scrollRef.current) return
    const delta = e.clientX - panRef.current.startX
    scrollRef.current.scrollLeft = panRef.current.startScrollLeft - delta
  }

  function stopPanning() {
    panRef.current = null
    setIsPanning(false)
  }

  return (
    <div
      ref={scrollRef}
      className={cn(
        'no-scrollbar flex min-w-0 flex-1 items-center gap-1 overflow-x-auto',
        isPanning ? 'cursor-grabbing' : 'cursor-grab',
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopPanning}
      onMouseLeave={stopPanning}
    >
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tab"
          aria-selected={tab.id === activeTabId}
          draggable={!tab.pinned}
          onClick={() => activateTab(tab.id)}
          onDragStart={() => setDraggedId(tab.id)}
          onDragEnd={() => {
            setDraggedId(null)
            setDragOverId(null)
          }}
          onDragOver={(e) => {
            if (tab.pinned) return
            e.preventDefault()
            if (draggedId && draggedId !== tab.id) setDragOverId(tab.id)
          }}
          onDragLeave={() => setDragOverId((prev) => (prev === tab.id ? null : prev))}
          onDrop={(e) => {
            if (tab.pinned) return
            e.preventDefault()
            if (draggedId && draggedId !== tab.id) reorderTab(draggedId, tab.id)
            setDraggedId(null)
            setDragOverId(null)
          }}
          className={cn(
            'group flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-md border px-2.5 text-sm',
            tab.id === activeTabId
              ? 'bg-sidebar-accent text-sidebar-accent-foreground border-border'
              : 'text-muted-foreground hover:bg-sidebar-accent/50 border-transparent',
            draggedId === tab.id && 'opacity-50',
            dragOverId === tab.id && 'border-primary',
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
