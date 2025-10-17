import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { db, type Warehouse } from '@/db'
import { liveQuery } from 'dexie'

export const useWarehousesStore = defineStore('warehouses', () => {
  const warehouses = ref<Warehouse[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Subscribe to live query - filter out deleted items
  const subscription = liveQuery(() =>
    db.warehouses.filter((w) => !w.deletedAt).toArray()
  ).subscribe({
    next: (result) => {
      warehouses.value = result
    },
    error: (err) => {
      error.value = err.message
    }
  })

  // Computed for easier access
  const warehousesList = computed(() => warehouses.value || [])

  // Filter by search
  function filterBySearch(search: string) {
    if (!warehouses.value) return []
    if (!search) return warehouses.value

    const lowerSearch = search.toLowerCase()
    return warehouses.value.filter(
      (w) => w.name.toLowerCase().includes(lowerSearch) || w.location.toLowerCase().includes(lowerSearch)
    )
  }

  // CRUD operations
  async function addWarehouse(
    warehouse: Omit<Warehouse, 'id' | 'syncStatus' | 'updatedAt' | 'deletedAt'>
  ) {
    try {
      isLoading.value = true
      error.value = null

      const id = await db.warehouses.add({
        ...warehouse,
        syncStatus: 'pending',
        updatedAt: new Date(),
        deletedAt: null
      })

      // Queue for sync
      await queueSync('warehouse', id as number, 'create', warehouse)

      return id
    } catch (e) {
      error.value = (e as Error).message
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function updateWarehouse(id: number, changes: Partial<Warehouse>) {
    try {
      isLoading.value = true
      error.value = null

      await db.warehouses.update(id, {
        ...changes,
        syncStatus: 'pending',
        updatedAt: new Date()
      })

      await queueSync('warehouse', id, 'update', changes)
    } catch (e) {
      error.value = (e as Error).message
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function deleteWarehouse(id: number) {
    try {
      isLoading.value = true
      error.value = null

      // Soft delete
      await db.warehouses.update(id, {
        syncStatus: 'pending',
        updatedAt: new Date(),
        deletedAt: new Date()
      })

      await queueSync('warehouse', id, 'delete', {})
    } catch (e) {
      error.value = (e as Error).message
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function queueSync(
    entityType: string,
    entityId: number,
    operation: 'create' | 'update' | 'delete',
    data: any
  ) {
    await db.syncQueue.add({
      entityType: entityType as any,
      entityId,
      operation,
      data,
      createdAt: new Date(),
      status: 'pending'
    })
  }

  return {
    warehouses,
    warehousesList,
    isLoading,
    error,
    filterBySearch,
    addWarehouse,
    updateWarehouse,
    deleteWarehouse
  }
})
