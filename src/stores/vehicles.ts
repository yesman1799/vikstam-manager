import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { db, type Vehicle } from '@/db'
import { liveQuery } from 'dexie'

export const useVehiclesStore = defineStore('vehicles', () => {
  const vehicles = ref<Vehicle[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Subscribe to live query
  const subscription = liveQuery(() =>
    db.vehicles.where('deletedAt').equals(null as any).toArray()
  ).subscribe({
    next: (result) => {
      vehicles.value = result
    },
    error: (err) => {
      error.value = err.message
    }
  })

  const vehiclesList = computed(() => vehicles.value || [])

  function filterBySearch(search: string) {
    if (!vehicles.value) return []
    if (!search) return vehicles.value

    const lowerSearch = search.toLowerCase()
    return vehicles.value.filter(
      (v) =>
        v.name.toLowerCase().includes(lowerSearch) ||
        v.license.toLowerCase().includes(lowerSearch) ||
        v.driver.toLowerCase().includes(lowerSearch)
    )
  }

  async function addVehicle(vehicle: Omit<Vehicle, 'id' | 'syncStatus' | 'updatedAt' | 'deletedAt'>) {
    try {
      isLoading.value = true
      error.value = null

      const id = await db.vehicles.add({
        ...vehicle,
        syncStatus: 'pending',
        updatedAt: new Date(),
        deletedAt: null
      })

      await queueSync('vehicle', id as number, 'create', vehicle)
      return id
    } catch (e) {
      error.value = (e as Error).message
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function updateVehicle(id: number, changes: Partial<Vehicle>) {
    try {
      isLoading.value = true
      error.value = null

      await db.vehicles.update(id, {
        ...changes,
        syncStatus: 'pending',
        updatedAt: new Date()
      })

      await queueSync('vehicle', id, 'update', changes)
    } catch (e) {
      error.value = (e as Error).message
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function deleteVehicle(id: number) {
    try {
      isLoading.value = true
      error.value = null

      await db.vehicles.update(id, {
        syncStatus: 'pending',
        updatedAt: new Date(),
        deletedAt: new Date()
      })

      await queueSync('vehicle', id, 'delete', {})
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
    vehicles,
    vehiclesList,
    isLoading,
    error,
    filterBySearch,
    addVehicle,
    updateVehicle,
    deleteVehicle
  }
})
