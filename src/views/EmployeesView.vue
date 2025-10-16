<script setup lang="ts">
type Employee = { id:number; name:string; role:'Dělník'|'Mistr'|'Manažer'; phone?:string; project?:string; items:number }
const employees: Employee[] = [
  { id:1, name:'Jan Novák', role:'Mistr',   phone:'+420 777 111 222', project:'Karlín Residence', items:4 },
  { id:2, name:'Petr Svoboda', role:'Dělník', phone:'+420 777 333 444', project:'Nový Smíchov',    items:2 },
  { id:3, name:'Marie Nováková', role:'Manažer', phone:'+420 777 555 666', project:'—',           items:0 },
]
const roleBadge = (r: Employee['role']) =>
  r === 'Manažer' ? 'bg-purple-100 text-purple-800'
: r === 'Mistr'   ? 'bg-blue-100 text-blue-800'
                  : 'bg-emerald-100 text-emerald-800'
</script>

<template>
  <div class="bg-white rounded-xl border overflow-x-auto">
    <table class="min-w-full text-sm">
      <thead class="bg-gray-50 text-gray-600">
        <tr>
          <th class="px-4 py-3 text-left">Jméno</th>
          <th class="px-4 py-3 text-left">Role</th>
          <th class="px-4 py-3 text-left">Projekt</th>
          <th class="px-4 py-3 text-left">Telefon</th>
          <th class="px-4 py-3 text-right">Položky</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="e in employees" :key="e.id" class="border-t">
          <td class="px-4 py-3 font-medium text-gray-900">{{ e.name }}</td>
          <td class="px-4 py-3">
            <span class="px-2 py-1 rounded-full text-xs font-medium" :class="roleBadge(e.role)">
              {{ e.role }}
            </span>
          </td>
          <td class="px-4 py-3">{{ e.project }}</td>
          <td class="px-4 py-3">{{ e.phone }}</td>
          <td class="px-4 py-3 text-right font-medium">{{ e.items }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
