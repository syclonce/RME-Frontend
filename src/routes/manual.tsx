import type { ReactElement } from 'react'
import { GroupListPage } from '@/features/Grup/pages/ListPage'

export interface AppRoute {
  path: string
  module: string
  element: ReactElement
}

export const manualRoutes: AppRoute[] = [
  { path: '/modul/grup', module: 'Grup', element: <GroupListPage /> },
]
