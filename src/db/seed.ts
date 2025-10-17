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
