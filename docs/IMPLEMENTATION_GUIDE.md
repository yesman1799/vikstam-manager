# Implementation Guide: Offline Database with Dexie.js

This guide provides step-by-step instructions for implementing the offline-first database in Vikstam Manager.

---

## Prerequisites

- Node.js 20.19.0+ or 22.12.0+
- npm installed
- Basic understanding of TypeScript and Vue 3

---

## Installation

### 1. Install Dexie.js

```bash
npm install dexie
```

### 2. Install Type Definitions (already included in dexie package)

Dexie comes with TypeScript definitions, so no additional installation needed.

---

## Step-by-Step Implementation

### Step 1: Create Database Schema

Create the database definition file:

**File:** `src/db/index.ts`

```typescript
import Dexie, { Table } from 'dexie'

// Type definitions
export interface Warehouse {
  id?: number
  name: string
  location: string
  type: 'sklad' | 'stavba'
  itemCount: number
  lastActivity: string
  syncStatus?: 'synced' | 'pending' | 'conflict'
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface Vehicle {
  id?: number
  name: string
  license: string
  driver: string
  location: string
  status: 'OK' | 'Servis' | 'Nedostupné'
  available: boolean
  fuel: number
  mileage: number
  syncStatus?: 'synced' | 'pending' | 'conflict'
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface Employee {
  id?: number
  name: string
  role: 'Dělník' | 'Mistr' | 'Manažer'
  phone?: string
  project?: string
  items: number
  syncStatus?: 'synced' | 'pending' | 'conflict'
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface SyncOperation {
  id?: number
  entityType: 'warehouse' | 'vehicle' | 'employee'
  entityId: number
  operation: 'create' | 'update' | 'delete'
  data: any
  createdAt: Date
  status: 'pending' | 'syncing' | 'completed' | 'failed'
  error?: string
}

// Database class
export class VikstamDB extends Dexie {
  warehouses!: Table<Warehouse, number>
  vehicles!: Table<Vehicle, number>
  employees!: Table<Employee, number>
  syncQueue!: Table<SyncOperation, number>

  constructor() {
    super('vikstam-manager')
    
    // Schema version 1
    this.version(1).stores({
      warehouses: '++id, name, type, location, syncStatus, updatedAt, deletedAt',
      vehicles: '++id, name, license, driver, status, syncStatus, updatedAt, deletedAt',
      employees: '++id, name, role, project, syncStatus, updatedAt, deletedAt',
      syncQueue: '++id, entityType, entityId, status, createdAt'
    })
  }
}

// Export singleton instance
export const db = new VikstamDB()
```

### Step 2: Seed Initial Data

**File:** `src/db/seed.ts`

```typescript
import { db, type Warehouse, type Vehicle, type Employee } from './index'

export async function seedDatabase() {
  // Check if already seeded
  const warehouseCount = await db.warehouses.count()
  if (warehouseCount > 0) {
    console.log('Database already seeded')
    return
  }

  console.log('Seeding database...')

  // Seed warehouses
  const warehouses: Omit<Warehouse, 'id'>[] = [
    { 
      name: 'Hlavní sklad Praha', 
      location: 'Praha 4, Michle', 
      type: 'sklad', 
      itemCount: 247, 
      lastActivity: '2025-01-15',
      syncStatus: 'synced',
      updatedAt: new Date(),
      deletedAt: null
    },
    { 
      name: 'Stavba Karlín Residence', 
      location: 'Praha 8, Karlín', 
      type: 'stavba', 
      itemCount: 89, 
      lastActivity: '2025-01-14',
      syncStatus: 'synced',
      updatedAt: new Date(),
      deletedAt: null
    },
    { 
      name: 'Sklad Brno', 
      location: 'Brno, Černovice', 
      type: 'sklad', 
      itemCount: 156, 
      lastActivity: '2025-01-13',
      syncStatus: 'synced',
      updatedAt: new Date(),
      deletedAt: null
    },
    { 
      name: 'Stavba Nový Smíchov', 
      location: 'Praha 5, Smíchov', 
      type: 'stavba', 
      itemCount: 203, 
      lastActivity: '2025-01-12',
      syncStatus: 'synced',
      updatedAt: new Date(),
      deletedAt: null
    }
  ]

  // Seed vehicles
  const vehicles: Omit<Vehicle, 'id'>[] = [
    { 
      name: 'Ford Transit', 
      license: '1A2 3456', 
      driver: 'Jan Novák', 
      location: 'Praha 4', 
      status: 'OK', 
      available: true, 
      fuel: 75, 
      mileage: 145230,
      syncStatus: 'synced',
      updatedAt: new Date(),
      deletedAt: null
    },
    { 
      name: 'Mercedes Sprinter', 
      license: '2B3 7890', 
      driver: 'Petr Svoboda', 
      location: 'Brno', 
      status: 'OK', 
      available: false, 
      fuel: 45, 
      mileage: 89450,
      syncStatus: 'synced',
      updatedAt: new Date(),
      deletedAt: null
    },
    { 
      name: 'Iveco Daily', 
      license: '3C4 1234', 
      driver: 'Marie Nováková', 
      location: 'Praha 5', 
      status: 'Servis', 
      available: false, 
      fuel: 20, 
      mileage: 203670,
      syncStatus: 'synced',
      updatedAt: new Date(),
      deletedAt: null
    }
  ]

  // Seed employees
  const employees: Omit<Employee, 'id'>[] = [
    { 
      name: 'Jan Novák', 
      role: 'Mistr', 
      phone: '+420 777 111 222', 
      project: 'Karlín Residence', 
      items: 4,
      syncStatus: 'synced',
      updatedAt: new Date(),
      deletedAt: null
    },
    { 
      name: 'Petr Svoboda', 
      role: 'Dělník', 
      phone: '+420 777 333 444', 
      project: 'Nový Smíchov', 
      items: 2,
      syncStatus: 'synced',
      updatedAt: new Date(),
      deletedAt: null
    },
    { 
      name: 'Marie Nováková', 
      role: 'Manažer', 
      phone: '+420 777 555 666', 
      project: '—', 
      items: 0,
      syncStatus: 'synced',
      updatedAt: new Date(),
      deletedAt: null
    }
  ]

  // Add to database
  await db.warehouses.bulkAdd(warehouses)
  await db.vehicles.bulkAdd(vehicles)
  await db.employees.bulkAdd(employees)

  console.log('Database seeded successfully!')
}
```

### Step 3: Create Pinia Stores

**File:** `src/stores/warehouses.ts`

```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { db, type Warehouse } from '@/db'
import { liveQuery } from 'dexie'
import { useObservable } from '@vueuse/rxjs'

export const useWarehousesStore = defineStore('warehouses', () => {
  // Use observable for live updates from IndexedDB
  const warehousesQuery = liveQuery(() => 
    db.warehouses
      .where('deletedAt')
      .equals(null as any)
      .toArray()
  )
  
  const warehouses = useObservable(warehousesQuery)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Filter by search
  function filterBySearch(search: string) {
    if (!warehouses.value) return []
    if (!search) return warehouses.value
    
    const lowerSearch = search.toLowerCase()
    return warehouses.value.filter(w => 
      w.name.toLowerCase().includes(lowerSearch) ||
      w.location.toLowerCase().includes(lowerSearch)
    )
  }

  // CRUD operations
  async function addWarehouse(warehouse: Omit<Warehouse, 'id' | 'syncStatus' | 'updatedAt' | 'deletedAt'>) {
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
      await queueSync('warehouse', id, 'create', warehouse)
      
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
    isLoading,
    error,
    filterBySearch,
    addWarehouse,
    updateWarehouse,
    deleteWarehouse
  }
})
```

**File:** `src/stores/vehicles.ts`

```typescript
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db, type Vehicle } from '@/db'
import { liveQuery } from 'dexie'
import { useObservable } from '@vueuse/rxjs'

export const useVehiclesStore = defineStore('vehicles', () => {
  const vehiclesQuery = liveQuery(() => 
    db.vehicles
      .where('deletedAt')
      .equals(null as any)
      .toArray()
  )
  
  const vehicles = useObservable(vehiclesQuery)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  function filterBySearch(search: string) {
    if (!vehicles.value) return []
    if (!search) return vehicles.value
    
    const lowerSearch = search.toLowerCase()
    return vehicles.value.filter(v => 
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
      
      await queueSync('vehicle', id, 'create', vehicle)
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
    isLoading,
    error,
    filterBySearch,
    addVehicle,
    updateVehicle,
    deleteVehicle
  }
})
```

**File:** `src/stores/employees.ts`

```typescript
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db, type Employee } from '@/db'
import { liveQuery } from 'dexie'
import { useObservable } from '@vueuse/rxjs'

export const useEmployeesStore = defineStore('employees', () => {
  const employeesQuery = liveQuery(() => 
    db.employees
      .where('deletedAt')
      .equals(null as any)
      .toArray()
  )
  
  const employees = useObservable(employeesQuery)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  function filterBySearch(search: string) {
    if (!employees.value) return []
    if (!search) return employees.value
    
    const lowerSearch = search.toLowerCase()
    return employees.value.filter(e => 
      e.name.toLowerCase().includes(lowerSearch) ||
      e.role.toLowerCase().includes(lowerSearch) ||
      (e.project && e.project.toLowerCase().includes(lowerSearch))
    )
  }

  async function addEmployee(employee: Omit<Employee, 'id' | 'syncStatus' | 'updatedAt' | 'deletedAt'>) {
    try {
      isLoading.value = true
      error.value = null
      
      const id = await db.employees.add({
        ...employee,
        syncStatus: 'pending',
        updatedAt: new Date(),
        deletedAt: null
      })
      
      await queueSync('employee', id, 'create', employee)
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
    isLoading,
    error,
    filterBySearch,
    addEmployee,
    updateEmployee,
    deleteEmployee
  }
})
```

### Step 4: Network Status Detection

**File:** `src/composables/useOnlineStatus.ts`

```typescript
import { ref, onMounted, onUnmounted } from 'vue'

export function useOnlineStatus() {
  const isOnline = ref(navigator.onLine)

  const updateOnlineStatus = () => {
    isOnline.value = navigator.onLine
    console.log('Network status changed:', isOnline.value ? 'online' : 'offline')
  }

  onMounted(() => {
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
  })

  onUnmounted(() => {
    window.removeEventListener('online', updateOnlineStatus)
    window.removeEventListener('offline', updateOnlineStatus)
  })

  return { isOnline }
}
```

### Step 5: Sync Service (Placeholder)

**File:** `src/db/sync/index.ts`

```typescript
import { db } from '../index'

export class SyncService {
  private syncInterval: number | null = null
  private readonly SYNC_INTERVAL_MS = 30000 // 30 seconds

  async startPeriodicSync() {
    if (this.syncInterval) return
    
    console.log('Starting periodic sync...')
    this.syncInterval = window.setInterval(() => {
      this.syncPendingOperations()
    }, this.SYNC_INTERVAL_MS)
    
    // Immediate sync
    await this.syncPendingOperations()
  }

  stopPeriodicSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval)
      this.syncInterval = null
      console.log('Stopped periodic sync')
    }
  }

  async syncPendingOperations() {
    if (!navigator.onLine) {
      console.log('Offline - skipping sync')
      return
    }

    try {
      const pendingOps = await db.syncQueue
        .where('status')
        .equals('pending')
        .toArray()

      if (pendingOps.length === 0) {
        console.log('No pending operations to sync')
        return
      }

      console.log(`Syncing ${pendingOps.length} operations...`)

      // TODO: Implement actual API sync
      // For now, just mark as completed
      for (const op of pendingOps) {
        await db.syncQueue.update(op.id!, { status: 'completed' })
        
        // Update entity sync status
        const table = db[`${op.entityType}s` as keyof typeof db] as any
        await table.update(op.entityId, { syncStatus: 'synced' })
      }

      console.log('Sync completed successfully')
    } catch (error) {
      console.error('Sync failed:', error)
    }
  }

  async forceSyncNow() {
    console.log('Force sync triggered')
    await this.syncPendingOperations()
  }
}

export const syncService = new SyncService()
```

### Step 6: Initialize Database in main.ts

Update `src/main.ts`:

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { seedDatabase } from './db/seed'
import { syncService } from './db/sync'

import './styles.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize database
seedDatabase()
  .then(() => {
    console.log('Database ready')
    // Start sync service
    syncService.startPeriodicSync()
  })
  .catch((error) => {
    console.error('Database initialization failed:', error)
  })

app.mount('#app')
```

### Step 7: Update Components to Use Stores

Update `src/views/WarehousesView.vue`:

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useWarehousesStore } from '@/stores/warehouses'

const props = defineProps<{ search?: string }>()
const store = useWarehousesStore()

const filteredWarehouses = computed(() => 
  store.filterBySearch(props.search || '')
)
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-if="store.isLoading" class="col-span-full text-center py-8 text-gray-500">
      Loading...
    </div>
    <div v-else-if="store.error" class="col-span-full text-center py-8 text-red-500">
      Error: {{ store.error }}
    </div>
    <div v-else-if="!filteredWarehouses || filteredWarehouses.length === 0" 
         class="col-span-full text-center py-8 text-gray-500">
      No warehouses found
    </div>
    <div v-else v-for="w in filteredWarehouses" :key="w.id" class="bg-white rounded-xl border p-6 card-hover">
      <div class="flex items-start justify-between mb-4">
        <h3 class="text-lg font-semibold">{{ w.name }}</h3>
        <span class="px-2 py-1 text-xs rounded-full"
          :class="w.type === 'sklad' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'">
          {{ w.type === 'sklad' ? 'Sklad' : 'Stavba' }}
        </span>
      </div>
      <div class="space-y-2 text-sm text-gray-600">
        <div>📍 {{ w.location }}</div>
        <div>📦 {{ w.itemCount }} položek</div>
        <div>🕒 {{ new Date(w.lastActivity).toLocaleDateString('cs-CZ') }}</div>
        <div v-if="w.syncStatus === 'pending'" class="text-xs text-amber-600">
          ⏱️ Pending sync
        </div>
      </div>
    </div>
  </div>
</template>
```

Similar updates for `VehiclesView.vue` and `EmployeesView.vue`.

---

## Testing

### Test Offline Functionality

1. Open the app in browser
2. Open DevTools > Application > Service Workers
3. Check "Offline" checkbox
4. Try adding/editing data
5. Check DevTools > Application > IndexedDB > vikstam-manager
6. Verify data is stored locally
7. Uncheck "Offline" to go online
8. Verify sync occurs

---

## Next Features to Add

1. **Backend API Integration** - Connect to actual REST/GraphQL API
2. **Conflict Resolution** - Handle conflicts when syncing
3. **Service Worker** - Use Background Sync API for automatic sync
4. **UI Indicators** - Show sync status in header
5. **Error Handling** - Better error messages and retry logic
6. **Data Export** - Export database to JSON for backup

---

## Troubleshooting

### Database not initializing

- Check browser console for errors
- Verify IndexedDB is enabled in browser
- Clear browser data and try again

### Sync not working

- Check network tab in DevTools
- Verify backend API is running
- Check sync queue in IndexedDB

### Data not updating in UI

- Ensure components are using Pinia stores
- Check if liveQuery is properly set up
- Verify `useObservable` from @vueuse/rxjs is installed

---

## References

- [Dexie.js Documentation](https://dexie.org/)
- [Vue 3 Documentation](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
