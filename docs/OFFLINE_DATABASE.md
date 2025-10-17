# Offline-First Database Implementation Guide

## Overview

This document provides comprehensive guidance for implementing offline-first database functionality in the Vikstam Manager application, enabling data management when offline with automatic synchronization when online.

---

## Database Options Comparison

### 1. **Dexie.js** (Recommended ⭐)

**What it is:** A wrapper library for IndexedDB with a clean, promise-based API.

**Pros:**
- ✅ Free and open-source (Apache 2.0)
- ✅ Excellent TypeScript support
- ✅ Simple, intuitive API
- ✅ Built-in live queries for reactive updates
- ✅ Powerful indexing and querying
- ✅ Automatic schema versioning and migrations
- ✅ Works in all modern browsers
- ✅ Small bundle size (~20KB gzipped)
- ✅ Extensive documentation and community

**Cons:**
- ❌ Browser-only (won't work in Node.js/SSR)
- ❌ Requires manual sync implementation

**Free tier:** Fully free, unlimited

**Best for:** Progressive Web Apps (PWAs), offline-first web applications

**Implementation complexity:** Low

```typescript
// Example
import Dexie from 'dexie';

const db = new Dexie('vikstam-manager');
db.version(1).stores({
  warehouses: '++id, name, type, location',
  vehicles: '++id, name, license, driver',
  employees: '++id, name, role, project'
});
```

---

### 2. **PouchDB**

**What it is:** A JavaScript database inspired by CouchDB that syncs with remote CouchDB or Cloudant.

**Pros:**
- ✅ Free and open-source (Apache 2.0)
- ✅ Built-in synchronization with CouchDB/Cloudant
- ✅ Works offline and online seamlessly
- ✅ Cross-platform (browser, Node.js, mobile)
- ✅ Conflict resolution built-in
- ✅ Multi-master replication

**Cons:**
- ❌ Larger bundle size (~150KB)
- ❌ Requires CouchDB server for sync (backend dependency)
- ❌ Less intuitive API than Dexie
- ❌ TypeScript support not as strong

**Free tier:** 
- PouchDB: Fully free
- CouchDB: Free to self-host
- IBM Cloudant: Free tier (1GB storage, 20 requests/sec)

**Best for:** Apps requiring built-in sync with CouchDB backend

**Implementation complexity:** Medium

---

### 3. **RxDB**

**What it is:** A reactive, NoSQL database for JavaScript applications with multi-tab support and replication.

**Pros:**
- ✅ Open-source (Apache 2.0)
- ✅ Real-time reactive queries (RxJS)
- ✅ Multi-tab synchronization
- ✅ Schema validation with JSON Schema
- ✅ Excellent TypeScript support
- ✅ Multiple storage adapters (IndexedDB, LokiJS, etc.)
- ✅ Built-in replication protocols

**Cons:**
- ❌ Steeper learning curve (RxJS required)
- ❌ Larger bundle size
- ❌ Some premium features require paid license

**Free tier:** 
- Community Edition: Fully free for most features
- Premium: Paid for enterprise features (encryption, query optimizer)

**Best for:** Complex apps with real-time requirements and multi-tab sync

**Implementation complexity:** High

---

### 4. **LocalForage**

**What it is:** A simple library that uses IndexedDB with localStorage fallback.

**Pros:**
- ✅ Free and open-source (Apache 2.0)
- ✅ Very simple API (like localStorage)
- ✅ Automatic fallback to WebSQL/localStorage
- ✅ Small bundle size (~8KB)
- ✅ TypeScript support

**Cons:**
- ❌ No querying capabilities
- ❌ No indexing
- ❌ Key-value store only (not relational)
- ❌ No sync features
- ❌ Limited for complex data structures

**Free tier:** Fully free, unlimited

**Best for:** Simple key-value storage needs

**Implementation complexity:** Very Low

---

### 5. **WatermelonDB**

**What it is:** A reactive database framework built for React/React Native apps.

**Pros:**
- ✅ Open-source (MIT)
- ✅ Optimized for large datasets
- ✅ Lazy loading
- ✅ Multi-platform (web, React Native)
- ✅ Built-in sync adapter
- ✅ Reactive queries

**Cons:**
- ❌ Primarily for React/React Native
- ❌ Requires backend sync implementation
- ❌ Larger learning curve
- ❌ Less documentation than alternatives

**Free tier:** Fully free

**Best for:** React/React Native apps with large datasets

**Implementation complexity:** Medium-High

---

### 6. **Firebase Firestore** (Cloud-based)

**What it is:** Google's cloud-hosted NoSQL database with offline support.

**Pros:**
- ✅ Automatic offline persistence
- ✅ Real-time synchronization
- ✅ Excellent TypeScript support
- ✅ Built-in authentication
- ✅ Managed infrastructure
- ✅ Strong ecosystem

**Cons:**
- ❌ Requires internet for initial setup
- ❌ Vendor lock-in (Google)
- ❌ Free tier has limits
- ❌ Can get expensive at scale
- ❌ Less control over data

**Free tier:** 
- 1GB storage
- 50K reads/day
- 20K writes/day
- 20K deletes/day

**Best for:** Apps needing cloud backend with minimal setup

**Implementation complexity:** Low-Medium

---

### 7. **Supabase with Local Storage** (Cloud-based)

**What it is:** Open-source Firebase alternative with PostgreSQL backend and offline support.

**Pros:**
- ✅ PostgreSQL (relational)
- ✅ Open-source
- ✅ Real-time subscriptions
- ✅ Built-in authentication
- ✅ Free tier generous
- ✅ Can self-host

**Cons:**
- ❌ Offline support not as mature
- ❌ Requires backend setup
- ❌ Larger initial setup

**Free tier:** 
- 500MB database
- 1GB file storage
- 50MB file uploads
- 2GB bandwidth

**Best for:** Apps needing PostgreSQL and auth with cloud sync

**Implementation complexity:** Medium

---

## Recommended Solution for Vikstam Manager

### **Choice: Dexie.js + Custom Sync Layer**

**Rationale:**
1. **Free and unlimited** - No usage limits or costs
2. **Simple integration** - Minimal code changes required
3. **TypeScript-first** - Perfect for this Vue 3 + TypeScript project
4. **Offline-first** - Works completely offline
5. **Flexible sync** - Can sync with any backend API (REST, GraphQL, etc.)
6. **No vendor lock-in** - Own your data and architecture
7. **Small footprint** - Won't bloat the application

---

## Implementation Architecture

### Data Flow

```
┌─────────────────┐
│  Vue Components │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Pinia Stores   │ ◄──── Reactive state management
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Database Layer │ ◄──── CRUD operations
│    (Dexie.js)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    IndexedDB    │ ◄──── Browser storage (offline)
└─────────────────┘
         │
         ▼ (when online)
┌─────────────────┐
│   Sync Service  │ ◄──── Background sync
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Backend API    │ ◄──── Server synchronization
└─────────────────┘
```

### File Structure

```
src/
├── db/
│   ├── index.ts              # Database initialization
│   ├── schema.ts             # Database schema definition
│   ├── models/
│   │   ├── warehouse.ts      # Warehouse model & operations
│   │   ├── vehicle.ts        # Vehicle model & operations
│   │   └── employee.ts       # Employee model & operations
│   └── sync/
│       ├── index.ts          # Sync orchestrator
│       ├── queue.ts          # Offline operation queue
│       └── network.ts        # Network status detection
├── stores/
│   ├── warehouses.ts         # Warehouse Pinia store (uses DB)
│   ├── vehicles.ts           # Vehicle Pinia store (uses DB)
│   ├── employees.ts          # Employee Pinia store (uses DB)
│   └── sync.ts               # Sync status Pinia store
└── composables/
    ├── useOnlineStatus.ts    # Network detection composable
    └── useSyncStatus.ts      # Sync status composable
```

---

## Implementation Steps

### Phase 1: Database Setup
1. Install Dexie.js
2. Create database schema
3. Initialize database
4. Seed with initial data

### Phase 2: Data Layer
1. Create model classes with CRUD operations
2. Implement TypeScript interfaces
3. Add error handling

### Phase 3: Pinia Integration
1. Migrate stores to use database
2. Add reactive queries
3. Update components to use stores

### Phase 4: Sync Layer
1. Implement network detection
2. Create sync queue for offline operations
3. Add conflict resolution
4. Implement background sync

### Phase 5: UI Enhancements
1. Add offline/online indicators
2. Show sync status
3. Add sync controls

---

## Alternative Quick Solutions

### If Backend Already Exists

**Use Firebase Firestore or Supabase** if you already have or plan to have a cloud backend. They handle sync automatically.

### For Simplest Setup

**Use LocalForage** for basic storage without complex querying needs.

### For Real-time Collaboration

**Use RxDB** if you need multi-user, real-time updates across devices.

---

## Code Examples

### Dexie.js Basic Setup

```typescript
// src/db/index.ts
import Dexie, { Table } from 'dexie';

export interface Warehouse {
  id?: number;
  name: string;
  location: string;
  type: 'sklad' | 'stavba';
  itemCount: number;
  lastActivity: string;
  syncStatus?: 'synced' | 'pending' | 'conflict';
  updatedAt: Date;
}

export class VikstamDB extends Dexie {
  warehouses!: Table<Warehouse>;
  vehicles!: Table<Vehicle>;
  employees!: Table<Employee>;

  constructor() {
    super('vikstam-manager');
    this.version(1).stores({
      warehouses: '++id, name, type, location, syncStatus, updatedAt',
      vehicles: '++id, name, license, driver, syncStatus, updatedAt',
      employees: '++id, name, role, project, syncStatus, updatedAt'
    });
  }
}

export const db = new VikstamDB();
```

### Pinia Store Example

```typescript
// src/stores/warehouses.ts
import { defineStore } from 'pinia';
import { db } from '@/db';
import { liveQuery } from 'dexie';
import { useObservable } from '@vueuse/rxjs';

export const useWarehousesStore = defineStore('warehouses', () => {
  // Live query - automatically updates when DB changes
  const warehouses = useObservable(
    liveQuery(() => db.warehouses.toArray())
  );

  async function addWarehouse(warehouse: Omit<Warehouse, 'id'>) {
    const id = await db.warehouses.add({
      ...warehouse,
      syncStatus: 'pending',
      updatedAt: new Date()
    });
    
    // Trigger sync if online
    await syncService.syncWarehouses();
    
    return id;
  }

  async function updateWarehouse(id: number, changes: Partial<Warehouse>) {
    await db.warehouses.update(id, {
      ...changes,
      syncStatus: 'pending',
      updatedAt: new Date()
    });
    
    await syncService.syncWarehouses();
  }

  async function deleteWarehouse(id: number) {
    await db.warehouses.delete(id);
    await syncService.syncWarehouses();
  }

  return { warehouses, addWarehouse, updateWarehouse, deleteWarehouse };
});
```

### Network Detection

```typescript
// src/composables/useOnlineStatus.ts
import { ref, onMounted, onUnmounted } from 'vue';

export function useOnlineStatus() {
  const isOnline = ref(navigator.onLine);

  const updateOnlineStatus = () => {
    isOnline.value = navigator.onLine;
  };

  onMounted(() => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  });

  onUnmounted(() => {
    window.removeEventListener('online', updateOnlineStatus);
    window.removeEventListener('offline', updateOnlineStatus);
  });

  return { isOnline };
}
```

---

## Next Steps

Choose one of the following paths:

1. **Full Implementation** - Implement Dexie.js with custom sync (most flexible)
2. **Managed Backend** - Use Firebase/Supabase (fastest to production)
3. **Minimal Setup** - Use LocalForage for simple offline storage

The documentation in this repository will guide you through the full Dexie.js implementation.

---

## Resources

- [Dexie.js Documentation](https://dexie.org/)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Service Workers for Sync](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Background Sync API](https://developer.mozilla.org/en-US/docs/Web/API/Background_Sync_API)

---

*Last updated: 2025-10-17*
