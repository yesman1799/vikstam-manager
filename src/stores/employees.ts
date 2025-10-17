import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { db, type Employee } from '@/db'
import { liveQuery } from 'dexie'

export const useEmployeesStore = defineStore('employees', () => {
  const employees = ref<Employee[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Subscribe to live query - filter out deleted items
  const subscription = liveQuery(() =>
    db.employees.filter((e) => !e.deletedAt).toArray()
  ).subscribe({
    next: (result) => {
      employees.value = result
    },
    error: (err) => {
      error.value = err.message
    }
  })

  const employeesList = computed(() => employees.value || [])

  function filterBySearch(search: string) {
    if (!employees.value) return []
    if (!search) return employees.value

    const lowerSearch = search.toLowerCase()
    return employees.value.filter(
      (e) =>
        e.name.toLowerCase().includes(lowerSearch) ||
        e.role.toLowerCase().includes(lowerSearch) ||
        (e.project && e.project.toLowerCase().includes(lowerSearch))
    )
  }

  async function addEmployee(
    employee: Omit<Employee, 'id' | 'syncStatus' | 'updatedAt' | 'deletedAt'>
  ) {
    try {
      isLoading.value = true
      error.value = null

      const id = await db.employees.add({
        ...employee,
        syncStatus: 'pending',
        updatedAt: new Date(),
        deletedAt: null
      })

      await queueSync('employee', id as number, 'create', employee)
      return id
    } catch (e) {
      error.value = (e as Error).message
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function updateEmployee(id: number, changes: Partial<Employee>) {
    try {
      isLoading.value = true
      error.value = null

      await db.employees.update(id, {
        ...changes,
        syncStatus: 'pending',
        updatedAt: new Date()
      })

      await queueSync('employee', id, 'update', changes)
    } catch (e) {
      error.value = (e as Error).message
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function deleteEmployee(id: number) {
    try {
      isLoading.value = true
      error.value = null

      await db.employees.update(id, {
        syncStatus: 'pending',
        updatedAt: new Date(),
        deletedAt: new Date()
      })

      await queueSync('employee', id, 'delete', {})
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
    employees,
    employeesList,
    isLoading,
    error,
    filterBySearch,
    addEmployee,
    updateEmployee,
    deleteEmployee
  }
})
