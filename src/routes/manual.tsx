/* oxlint-disable react/only-export-components -- route-level lazy component is intentional */
import { lazy } from 'react'
import type { ReactElement } from 'react'

const GroupListPage = lazy(() => import('@/features/Grup/pages/ListPage').then((module) => ({ default: module.GroupListPage })))

export interface AppRoute {
  path: string
  module: string
  element: ReactElement
}

export const manualRoutes: AppRoute[] = [
  { path: '/modul/grup', module: 'Grup', element: <GroupListPage /> },
]
