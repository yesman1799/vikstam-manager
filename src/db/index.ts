import Dexie, { type Table } from 'dexie'

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
