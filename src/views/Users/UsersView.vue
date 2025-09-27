<template>
  <DashboardLayout user-type="admin">
    <div class="mb-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            User Management
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            Manage users, roles, and permissions
          </p>
        </div>
        <div class="flex space-x-3">
          <BaseButton variant="outline">
            <DownloadIcon class="h-4 w-4 mr-2" />
            Export
          </BaseButton>
          <BaseButton>
            <PlusIcon class="h-4 w-4 mr-2" />
            Add User
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <BaseCard v-for="(stat, index) in userStats" :key="index">
        <CardContent class="p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-lg" :class="stat.bgColor">
              <component
                :is="stat.icon"
                class="h-6 w-6"
                :class="stat.iconColor"
              />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                {{ stat.title }}
              </p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                {{ stat.value }}
              </p>
            </div>
          </div>
        </CardContent>
      </BaseCard>
    </div>

    <!-- Filters and Search -->
    <BaseCard class="mb-6">
      <CardContent class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <BaseInput
            v-model="searchQuery"
            placeholder="Search users..."
            full-width
            :left-icon="SearchIcon"
          />
          
          <div class="relative">
            <select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
              <option value="driver">Driver</option>
            </select>
          </div>
          
          <div class="relative">
            <select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          
          <BaseButton variant="outline">
            <FilterIcon class="h-4 w-4 mr-2" />
            Filters
          </BaseButton>
        </div>
      </CardContent>
    </BaseCard>

    <!-- Users Table -->
    <BaseCard>
      <CardHeader class="flex justify-between items-center">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">
          Users ({{ users.length }})
        </h2>
        <div class="flex items-center space-x-2">
          <BaseButton variant="outline" size="sm">
            <GridIcon class="h-4 w-4" />
          </BaseButton>
          <BaseButton variant="outline" size="sm">
            <ListIcon class="h-4 w-4" />
          </BaseButton>
        </div>
      </CardHeader>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <input type="checkbox" class="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                User
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Last Active
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Bookings
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" class="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img
                      class="h-10 w-10 rounded-full"
                      :src="user.avatar"
                      :alt="user.name"
                    />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ user.name }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ user.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.role === 'admin'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                      : user.role === 'driver'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                  }`"
                >
                  {{ user.role.charAt(0).toUpperCase() + user.role.slice(1) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : user.status === 'inactive'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`"
                >
                  <div
                    :class="`w-1.5 h-1.5 rounded-full mr-1 ${
                      user.status === 'active'
                        ? 'bg-green-400'
                        : user.status === 'inactive'
                        ? 'bg-yellow-400'
                        : 'bg-red-400'
                    }`"
                  ></div>
                  {{ user.status.charAt(0).toUpperCase() + user.status.slice(1) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ user.lastActive }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ user.totalBookings }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex space-x-2">
                  <button class="text-teal-600 hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300">
                    <EditIcon class="h-4 w-4" />
                  </button>
                  <button class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                    <EyeIcon class="h-4 w-4" />
                  </button>
                  <button class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                    <TrashIcon class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
        <div class="flex-1 flex justify-between sm:hidden">
          <BaseButton variant="outline" size="sm">Previous</BaseButton>
          <BaseButton variant="outline" size="sm">Next</BaseButton>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Showing <span class="font-medium">1</span> to <span class="font-medium">10</span> of{' '}
              <span class="font-medium">97</span> results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <BaseButton variant="outline" size="sm">Previous</BaseButton>
              <BaseButton variant="outline" size="sm" class="mx-1">1</BaseButton>
              <BaseButton size="sm" class="mx-1">2</BaseButton>
              <BaseButton variant="outline" size="sm" class="mx-1">3</BaseButton>
              <BaseButton variant="outline" size="sm">Next</BaseButton>
            </nav>
          </div>
        </div>
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
  UsersIcon,
  UserIcon,
  ShieldCheckIcon,
  ClockIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  EditIcon,
  EyeIcon,
  TrashIcon,
  GridIcon,
  ListIcon
} from 'lucide-vue-next'

const searchQuery = ref('')

// Sample user stats
const userStats = ref([
  {
    title: 'Total Users',
    value: '1,234',
    icon: UsersIcon,
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    title: 'Active Users',
    value: '1,180',
    icon: UserIcon,
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400'
  },
  {
    title: 'Admins',
    value: '12',
    icon: ShieldCheckIcon,
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400'
  },
  {
    title: 'New This Month',
    value: '148',
    icon: ClockIcon,
    bgColor: 'bg-teal-100 dark:bg-teal-900/30',
    iconColor: 'text-teal-600 dark:text-teal-400'
  }
])

// Sample users data
const users = ref([
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    role: 'customer',
    status: 'active',
    lastActive: '2 hours ago',
    totalBookings: 12,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'admin',
    status: 'active',
    lastActive: '1 day ago',
    totalBookings: 0,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'driver',
    status: 'active',
    lastActive: '5 minutes ago',
    totalBookings: 45,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'customer',
    status: 'inactive',
    lastActive: '1 week ago',
    totalBookings: 3,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'david@example.com',
    role: 'customer',
    status: 'suspended',
    lastActive: '2 weeks ago',
    totalBookings: 8,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
])
</script>