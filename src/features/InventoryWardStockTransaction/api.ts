import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InventoryWardStockTransaction } from './types'

export const InventoryWardStockTransactionEndpoint = '/ward-stock-transactions'

export function useInventoryWardStockTransactionResource() {
  return useCrudResource<InventoryWardStockTransaction>(InventoryWardStockTransactionEndpoint)
}
