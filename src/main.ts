import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { seedDatabase } from './db/seed'
import { syncService } from './db/sync'

// ✅ Import Tailwind styles
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
