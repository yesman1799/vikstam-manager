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
      const pendingOps = await db.syncQueue.where('status').equals('pending').toArray()

      if (pendingOps.length === 0) {
        console.log('No pending operations to sync')
        return
      }

      console.log(`Syncing ${pendingOps.length} operations...`)

      // TODO: Implement actual API sync
      // For now, just mark as completed after a delay to simulate network request
      for (const op of pendingOps) {
        await db.syncQueue.update(op.id!, { status: 'completed' })

        // Update entity sync status
        const table = db[`${op.entityType}s` as keyof typeof db] as any
        if (table && table.update) {
          await table.update(op.entityId, { syncStatus: 'synced' })
        }
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
