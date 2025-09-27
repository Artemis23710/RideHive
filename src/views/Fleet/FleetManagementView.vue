<template>
  <DashboardLayout user-type="admin">
    <div class="mb-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            Fleet Management
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            Manage your vehicle fleet, maintenance, and availability
          </p>
        </div>
        <div class="flex space-x-3">
          <BaseButton variant="outline">
            <DownloadIcon class="h-4 w-4 mr-2" />
            Export
          </BaseButton>
          <BaseButton>
            <PlusIcon class="h-4 w-4 mr-2" />
            Add Vehicle
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Fleet Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <BaseCard v-for="(stat, index) in fleetStats" :key="index">
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div class="p-3 rounded-lg" :class="stat.bgColor">
              <component
                :is="stat.icon"
                class="h-6 w-6"
                :class="stat.iconColor"
              />
            </div>
            <span
              :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                stat.positive
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              }`"
            >
              {{ stat.change }}
            </span>
          </div>
          <div class="mt-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ stat.title }}
            </h3>
            <p class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
              {{ stat.value }}
            </p>
          </div>
        </CardContent>
      </BaseCard>
    </div>

    <!-- Fleet Status Overview -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <BaseCard class="lg:col-span-2">
        <CardHeader>
          <h2 class="text-lg font-medium text-gray-900 dark:text-white">
            Fleet Status Distribution
          </h2>
        </CardHeader>
        <CardContent class="p-6">
          <div class="space-y-4">
            <div v-for="status in fleetStatusData" :key="status.name" class="flex items-center justify-between">
              <div class="flex items-center">
                <div :class="`w-3 h-3 rounded-full mr-3 ${status.color}`"></div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {{ status.name }}
                </span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    :class="`h-2 rounded-full ${status.bgColor}`"
                    :style="{ width: `${status.percentage}%` }"
                  ></div>
                </div>
                <span class="text-sm font-semibold text-gray-900 dark:text-white w-8">
                  {{ status.count }}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </BaseCard>

      <BaseCard>
        <CardHeader>
          <h2 class="text-lg font-medium text-gray-900 dark:text-white">
            Maintenance Alerts
          </h2>
        </CardHeader>
        <CardContent class="p-6">
          <div class="space-y-4">
            <div v-for="alert in maintenanceAlerts" :key="alert.id" class="flex items-start space-x-3">
              <div :class="`p-1 rounded-full ${alert.severity === 'high' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`">
                <AlertTriangleIcon class="h-3 w-3" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ alert.vehicle }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ alert.message }}
                </p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {{ alert.dueDate }}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </BaseCard>
    </div>

    <!-- Filters and Search -->
    <BaseCard class="mb-6">
      <CardContent class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <BaseInput
            v-model="searchQuery"
            placeholder="Search vehicles..."
            full-width
            :left-icon="SearchIcon"
          />
          
          <div class="relative">
            <select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option value="">All Types</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="luxury">Luxury</option>
              <option value="electric">Electric</option>
            </select>
          </div>
          
          <div class="relative">
            <select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option value="">All Status</option>
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="maintenance">Maintenance</option>
              <option value="out-of-service">Out of Service</option>
            </select>
          </div>
          
          <div class="relative">
            <select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option value="">All Locations</option>
              <option value="main">Main Depot</option>
              <option value="north">North Branch</option>
              <option value="south">South Branch</option>
            </select>
          </div>
          
          <BaseButton variant="outline">
            <FilterIcon class="h-4 w-4 mr-2" />
            More Filters
          </BaseButton>
        </div>
      </CardContent>
    </BaseCard>

    <!-- Vehicles Grid/Table Toggle -->
    <div class="mb-6 flex justify-between items-center">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
        Fleet Vehicles ({{ vehicles.length }})
      </h2>
      <div class="flex items-center space-x-2">
        <BaseButton
          variant="outline"
          size="sm"
          :class="viewMode === 'grid' ? 'bg-teal-50 dark:bg-teal-900/20' : ''"
          @click="viewMode = 'grid'"
        >
          <GridIcon class="h-4 w-4" />
        </BaseButton>
        <BaseButton
          variant="outline"
          size="sm"
          :class="viewMode === 'table' ? 'bg-teal-50 dark:bg-teal-900/20' : ''"
          @click="viewMode = 'table'"
        >
          <ListIcon class="h-4 w-4" />
        </BaseButton>
      </div>
    </div>

    <!-- Grid View -->
    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <BaseCard v-for="vehicle in vehicles" :key="vehicle.id" class="overflow-hidden">
        <div class="relative">
          <img
            :src="vehicle.imageUrl"
            :alt="vehicle.make + ' ' + vehicle.model"
            class="h-48 w-full object-cover"
          />
          <div class="absolute top-3 right-3">
            <span
              :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                vehicle.status === 'available'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : vehicle.status === 'booked'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                  : vehicle.status === 'maintenance'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              }`"
            >
              {{ vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1) }}
            </span>
          </div>
        </div>
        
        <CardContent class="p-4">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                {{ vehicle.make }} {{ vehicle.model }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ vehicle.year }} • {{ vehicle.type }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-lg font-bold text-gray-900 dark:text-white">
                ${{ vehicle.dailyRate }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">per day</p>
            </div>
          </div>
          
          <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span>{{ vehicle.licensePlate }}</span>
            <span>{{ vehicle.mileage.toLocaleString() }} miles</span>
          </div>
          
          <div class="flex space-x-2">
            <BaseButton size="sm" variant="outline" full-width>
              <EyeIcon class="h-4 w-4 mr-1" />
              View
            </BaseButton>
            <BaseButton size="sm" full-width>
              <EditIcon class="h-4 w-4 mr-1" />
              Edit
            </BaseButton>
          </div>
        </CardContent>
      </BaseCard>
    </div>

    <!-- Table View -->
    <BaseCard v-else>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <input type="checkbox" class="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Vehicle
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Daily Rate
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Mileage
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Last Service
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="vehicle in vehicles" :key="vehicle.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" class="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img
                      class="h-10 w-10 rounded object-cover"
                      :src="vehicle.imageUrl"
                      :alt="vehicle.make + ' ' + vehicle.model"
                    />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ vehicle.make }} {{ vehicle.model }} ({{ vehicle.year }})
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ vehicle.licensePlate }} • {{ vehicle.type }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    vehicle.status === 'available'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : vehicle.status === 'booked'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      : vehicle.status === 'maintenance'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`"
                >
                  <div
                    :class="`w-1.5 h-1.5 rounded-full mr-1 ${
                      vehicle.status === 'available'
                        ? 'bg-green-400'
                        : vehicle.status === 'booked'
                        ? 'bg-blue-400'
                        : vehicle.status === 'maintenance'
                        ? 'bg-yellow-400'
                        : 'bg-red-400'
                    }`"
                  ></div>
                  {{ vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                ${{ vehicle.dailyRate }}/day
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ vehicle.mileage.toLocaleString() }} mi
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ vehicle.lastService }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex space-x-2">
                  <button class="text-teal-600 hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300">
                    <EditIcon class="h-4 w-4" />
                  </button>
                  <button class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                    <EyeIcon class="h-4 w-4" />
                  </button>
                  <button class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                    <WrenchIcon class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardContent from '@/components/ui/CardContent.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import {
  CarIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  WrenchIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  EditIcon,
  EyeIcon,
  GridIcon,
  ListIcon
} from 'lucide-vue-next'

const searchQuery = ref('')
const viewMode = ref('grid')

// Fleet statistics
const fleetStats = ref([
  {
    title: 'Total Vehicles',
    value: '124',
    change: '+8.2%',
    icon: CarIcon,
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    positive: true
  },
  {
    title: 'Available',
    value: '87',
    change: '+12%',
    icon: TrendingUpIcon,
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400',
    positive: true
  },
  {
    title: 'In Service',
    value: '32',
    change: '-5%',
    icon: WrenchIcon,
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    positive: false
  },
  {
    title: 'Maintenance Due',
    value: '5',
    change: '+2',
    icon: AlertTriangleIcon,
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-600 dark:text-red-400',
    positive: false
  }
])

// Fleet status distribution
const fleetStatusData = ref([
  {
    name: 'Available',
    count: 87,
    percentage: 70,
    color: 'bg-green-400',
    bgColor: 'bg-green-400'
  },
  {
    name: 'Booked',
    count: 32,
    percentage: 26,
    color: 'bg-blue-400',
    bgColor: 'bg-blue-400'
  },
  {
    name: 'Maintenance',
    count: 5,
    percentage: 4,
    color: 'bg-yellow-400',
    bgColor: 'bg-yellow-400'
  }
])

// Maintenance alerts
const maintenanceAlerts = ref([
  {
    id: 1,
    vehicle: 'Tesla Model 3 - ABC123',
    message: 'Oil change due',
    dueDate: 'Due in 3 days',
    severity: 'medium'
  },
  {
    id: 2,
    vehicle: 'BMW X5 - XYZ789',
    message: 'Brake inspection overdue',
    dueDate: 'Overdue by 2 days',
    severity: 'high'
  },
  {
    id: 3,
    vehicle: 'Toyota Camry - DEF456',
    message: 'Tire rotation scheduled',
    dueDate: 'Due in 1 week',
    severity: 'low'
  }
])

// Sample vehicles data
const vehicles = ref([
  {
    id: 1,
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    type: 'Electric',
    licensePlate: 'ABC123',
    status: 'available',
    dailyRate: 120,
    mileage: 15420,
    lastService: '2024-09-15',
    imageUrl: 'https://images.unsplash.com/photo-1562053828-91a51c74eb19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    make: 'BMW',
    model: 'X5',
    year: 2022,
    type: 'SUV',
    licensePlate: 'XYZ789',
    status: 'booked',
    dailyRate: 150,
    mileage: 28750,
    lastService: '2024-08-20',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e8f2e928464?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    make: 'Mercedes',
    model: 'E-Class',
    year: 2023,
    type: 'Luxury',
    licensePlate: 'DEF456',
    status: 'available',
    dailyRate: 140,
    mileage: 12890,
    lastService: '2024-09-10',
    imageUrl: 'https://images.unsplash.com/photo-1549275301-41008ba12aca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    make: 'Toyota',
    model: 'Camry',
    year: 2021,
    type: 'Sedan',
    licensePlate: 'GHI789',
    status: 'maintenance',
    dailyRate: 85,
    mileage: 45120,
    lastService: '2024-07-25',
    imageUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    make: 'Jeep',
    model: 'Wrangler',
    year: 2022,
    type: 'SUV',
    licensePlate: 'JKL012',
    status: 'available',
    dailyRate: 110,
    mileage: 22350,
    lastService: '2024-09-01',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    make: 'Audi',
    model: 'A4',
    year: 2023,
    type: 'Sedan',
    licensePlate: 'MNO345',
    status: 'out-of-service',
    dailyRate: 130,
    mileage: 8950,
    lastService: '2024-06-15',
    imageUrl: 'https://images.unsplash.com/photo-1606016806182-6b3ac85066b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
])
</script>