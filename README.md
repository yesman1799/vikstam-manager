# vikstam-manager

A modern warehouse and asset management application built with Vue 3, TypeScript, and offline-first capabilities.

## ✨ Features

- 📦 **Warehouse Management** - Track warehouses and construction sites
- 🚗 **Vehicle Management** - Monitor company vehicles and their status
- 👥 **Employee Management** - Manage employees and assigned items
- 💾 **Offline-First Database** - Works completely offline with automatic sync
- 🔄 **Real-time Updates** - Live queries with automatic UI updates
- 🌐 **Online/Offline Detection** - Visual indicator of network status
- 📱 **Responsive Design** - Works on desktop and mobile devices

## 🗄️ Offline Database

This application uses **Dexie.js** (IndexedDB wrapper) for offline-first data storage. All data is stored locally in your browser and can be accessed without an internet connection.

### Key Features:
- ✅ **Fully Free** - No usage limits or costs
- ✅ **Works Offline** - All CRUD operations work without internet
- ✅ **Auto-sync** - Pending changes sync when connection is restored
- ✅ **Live Queries** - UI updates automatically when data changes
- ✅ **TypeScript Support** - Full type safety for all database operations

### Documentation

For detailed information about the offline database implementation:
- [Database Options Comparison](./docs/OFFLINE_DATABASE.md) - Compare different offline database solutions
- [Implementation Guide](./docs/IMPLEMENTATION_GUIDE.md) - Step-by-step implementation details

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19.0+ or 22.12.0+
- npm or yarn

### Installation

```sh
npm install
```

### Development

```sh
npm run dev
```

The app will be available at `http://localhost:5173/`

### Production Build

```sh
npm run build
```

### Type Checking

```sh
npm run type-check
```

### Linting

```sh
npm run lint
```

### Code Formatting

```sh
npm run format
```

## 🏗️ Project Structure

```
src/
├── db/                      # Database layer
│   ├── index.ts            # Database initialization & schema
│   ├── seed.ts             # Initial data seeding
│   └── sync/               # Sync service
│       └── index.ts        # Background sync logic
├── stores/                  # Pinia stores
│   ├── warehouses.ts       # Warehouse store
│   ├── vehicles.ts         # Vehicle store
│   └── employees.ts        # Employee store
├── views/                   # Page components
├── composables/             # Vue composables
│   └── useOnlineStatus.ts  # Network detection
└── router/                  # Vue Router configuration
```

## 📖 Usage

### Managing Data Offline

1. **Add Data** - Use the store methods (e.g., `addWarehouse()`)
2. **Edit Data** - Use update methods (e.g., `updateVehicle()`)
3. **Delete Data** - Use delete methods (soft delete by default)
4. **Automatic Sync** - Changes sync automatically when online

### Example: Adding a Warehouse

```typescript
import { useWarehousesStore } from '@/stores/warehouses'

const store = useWarehousesStore()

await store.addWarehouse({
  name: 'New Warehouse',
  location: 'Prague',
  type: 'sklad',
  itemCount: 100,
  lastActivity: '2025-01-15'
})
```

### Viewing IndexedDB

You can inspect the offline database in your browser:

1. Open DevTools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Expand **IndexedDB** > **vikstam-manager**
4. View tables: warehouses, vehicles, employees, syncQueue

## 🔧 Technology Stack

- **Frontend Framework:** Vue 3 with Composition API
- **Language:** TypeScript
- **State Management:** Pinia
- **Database:** Dexie.js (IndexedDB)
- **Styling:** TailwindCSS
- **Icons:** Heroicons
- **Build Tool:** Vite
- **Router:** Vue Router

## 📱 Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

Requires IndexedDB support (available in all modern browsers).

## 📄 License

This project is private.

## 🤝 Contributing

This is a private project. For questions or suggestions, please contact the project maintainer.
