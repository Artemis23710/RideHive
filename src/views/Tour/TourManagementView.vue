<template>
  <DashboardLayout user-type="admin">
    <div class="mb-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            Tour Management
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            Manage tour packages, routes, and scheduling
          </p>
        </div>
        <div class="flex space-x-3">
          <BaseButton variant="outline">
            <DownloadIcon class="h-4 w-4 mr-2" />
            Export
          </BaseButton>
          <BaseButton>
            <PlusIcon class="h-4 w-4 mr-2" />
            Create Tour
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Tour Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <BaseCard v-for="(stat, index) in tourStats" :key="index">
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

    <!-- Tour Performance Overview -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <BaseCard>
        <CardHeader>
          <h2 class="text-lg font-medium text-gray-900 dark:text-white">
            Popular Tours
          </h2>
        </CardHeader>
        <CardContent class="p-6">
          <div class="space-y-4">
            <div v-for="tour in popularTours" :key="tour.id" class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <img
                  :src="tour.imageUrl"
                  :alt="tour.name"
                  class="h-12 w-12 rounded-lg object-cover"
                />
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ tour.name }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ tour.bookings }} bookings
                  </p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-gray-900 dark:text-white">
                  ${{ tour.revenue }}
                </p>
                <div class="flex items-center">
                  <div class="flex text-yellow-400">
                    <svg class="h-3 w-3 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  </div>
                  <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">
                    {{ tour.rating }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </BaseCard>

      <BaseCard>
        <CardHeader>
          <h2 class="text-lg font-medium text-gray-900 dark:text-white">
            Upcoming Tours
          </h2>
        </CardHeader>
        <CardContent class="p-6">
          <div class="space-y-4">
            <div v-for="tour in upcomingTours" :key="tour.id" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                  <CalendarIcon class="h-4 w-4 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ tour.name }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ tour.date }} • {{ tour.participants }} participants
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <span
                  :class="`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    tour.status === 'confirmed'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`"
                >
                  {{ tour.status }}
                </span>
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
            placeholder="Search tours..."
            full-width
            :left-icon="SearchIcon"
          />
          
          <div class="relative">
            <select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option value="">All Categories</option>
              <option value="adventure">Adventure</option>
              <option value="cultural">Cultural</option>
              <option value="nature">Nature</option>
              <option value="city">City</option>
            </select>
          </div>
          
          <div class="relative">
            <select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option value="">All Duration</option>
              <option value="half-day">Half Day</option>
              <option value="full-day">Full Day</option>
              <option value="multi-day">Multi Day</option>
            </select>
          </div>
          
          <div class="relative">
            <select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <BaseButton variant="outline">
            <FilterIcon class="h-4 w-4 mr-2" />
            More Filters
          </BaseButton>
        </div>
      </CardContent>
    </BaseCard>

    <!-- Tours Grid -->
    <div class="mb-6 flex justify-between items-center">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
        All Tours ({{ tours.length }})
      </h2>
      <div class="flex items-center space-x-2">
        <BaseButton variant="outline" size="sm">
          <ListIcon class="h-4 w-4 mr-2" />
          Bulk Actions
        </BaseButton>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BaseCard v-for="tour in tours" :key="tour.id" class="overflow-hidden">
        <div class="relative">
          <img
            :src="tour.imageUrl"
            :alt="tour.name"
            class="h-48 w-full object-cover"
          />
          <div class="absolute top-3 left-3">
            <span
              :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                tour.status === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : tour.status === 'draft'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              }`"
            >
              {{ tour.status.charAt(0).toUpperCase() + tour.status.slice(1) }}
            </span>
          </div>
          <div class="absolute top-3 right-3">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black/50 text-white">
              {{ tour.category }}
            </span>
          </div>
          <div class="absolute bottom-3 right-3">
            <div class="flex items-center bg-black/50 text-white px-2 py-1 rounded-full text-xs">
              <ClockIcon class="h-3 w-3 mr-1" />
              {{ tour.duration }}
            </div>
          </div>
        </div>
        
        <CardContent class="p-4">
          <div class="mb-3">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white line-clamp-2">
              {{ tour.name }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
              {{ tour.description }}
            </p>
          </div>
          
          <div class="flex items-center justify-between mb-3 text-sm text-gray-600 dark:text-gray-400">
            <div class="flex items-center">
              <MapPinIcon class="h-4 w-4 mr-1" />
              <span>{{ tour.location }}</span>
            </div>
            <div class="flex items-center">
              <UsersIcon class="h-4 w-4 mr-1" />
              <span>{{ tour.maxParticipants }}</span>
            </div>
          </div>
          
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="flex items-center">
                <div class="flex text-yellow-400">
                  <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                </div>
                <span class="text-sm text-gray-600 dark:text-gray-400 ml-1">
                  {{ tour.rating }}
                </span>
              </div>
              <span class="text-sm text-gray-500 dark:text-gray-500">
                ({{ tour.reviews }} reviews)
              </span>
            </div>
            <div class="text-right">
              <p class="text-lg font-bold text-gray-900 dark:text-white">
                ${{ tour.price }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">per person</p>
            </div>
          </div>
          
          <div class="flex space-x-2">
            <BaseButton size="sm" variant="outline" class="flex-1">
              <EyeIcon class="h-4 w-4 mr-1" />
              View
            </BaseButton>
            <BaseButton size="sm" class="flex-1">
              <EditIcon class="h-4 w-4 mr-1" />
              Edit
            </BaseButton>
            <BaseButton size="sm" variant="outline" class="px-3">
              <MoreVerticalIcon class="h-4 w-4" />
            </BaseButton>
          </div>
        </CardContent>
      </BaseCard>
    </div>

    <!-- Load More Button -->
    <div class="mt-8 text-center">
      <BaseButton variant="outline" size="lg">
        Load More Tours
      </BaseButton>
    </div>
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
  MapIcon,
  TrendingUpIcon,
  CalendarIcon,
  UsersIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  EditIcon,
  EyeIcon,
  ListIcon,
  ClockIcon,
  MapPinIcon,
  MoreVerticalIcon
} from 'lucide-vue-next'

const searchQuery = ref('')

// Tour statistics
const tourStats = ref([
  {
    title: 'Total Tours',
    value: '48',
    change: '+6.2%',
    icon: MapIcon,
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    positive: true
  },
  {
    title: 'Active Tours',
    value: '36',
    change: '+12%',
    icon: TrendingUpIcon,
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400',
    positive: true
  },
  {
    title: 'Monthly Bookings',
    value: '324',
    change: '+18%',
    icon: CalendarIcon,
    bgColor: 'bg-teal-100 dark:bg-teal-900/30',
    iconColor: 'text-teal-600 dark:text-teal-400',
    positive: true
  },
  {
    title: 'Total Participants',
    value: '2,847',
    change: '+24%',
    icon: UsersIcon,
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    positive: true
  }
])

// Popular tours data
const popularTours = ref([
  {
    id: 1,
    name: 'Sigiriya Rock Fortress',
    bookings: 89,
    revenue: '12,450',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    name: 'Kandy Cultural Tour',
    bookings: 76,
    revenue: '9,890',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    name: 'Galle Fort Heritage Walk',
    bookings: 68,
    revenue: '8,520',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1571167781876-93c0c2fe6dfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 4,
    name: 'Ella Train Journey',
    bookings: 54,
    revenue: '7,200',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
])

// Upcoming tours data
const upcomingTours = ref([
  {
    id: 1,
    name: 'Yala Safari Adventure',
    date: 'Oct 15, 2024',
    participants: 12,
    status: 'confirmed'
  },
  {
    id: 2,
    name: 'Nuwara Eliya Tea Plantation',
    date: 'Oct 18, 2024',
    participants: 8,
    status: 'pending'
  },
  {
    id: 3,
    name: 'Anuradhapura Ancient City',
    date: 'Oct 20, 2024',
    participants: 15,
    status: 'confirmed'
  },
  {
    id: 4,
    name: 'Mirissa Whale Watching',
    date: 'Oct 22, 2024',
    participants: 20,
    status: 'confirmed'
  }
])

// Sample tours data
const tours = ref([
  {
    id: 1,
    name: 'Sigiriya Rock Fortress & Dambulla Cave Temple',
    description: 'Explore ancient Sri Lankan history with visits to the iconic Sigiriya Rock Fortress and sacred Dambulla Cave Temple.',
    category: 'Cultural',
    duration: 'Full Day',
    location: 'Sigiriya',
    price: 85,
    rating: 4.8,
    reviews: 234,
    maxParticipants: 25,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Yala National Park Safari',
    description: 'Experience wildlife at its best with leopards, elephants, and exotic birds in Sri Lanka\'s most famous national park.',
    category: 'Adventure',
    duration: 'Full Day',
    location: 'Yala',
    price: 120,
    rating: 4.7,
    reviews: 189,
    maxParticipants: 16,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1549366021-9f761d040ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Kandy Cultural Experience',
    description: 'Immerse yourself in Sri Lankan culture with temple visits, traditional dance shows, and local craft workshops.',
    category: 'Cultural',
    duration: 'Full Day',
    location: 'Kandy',
    price: 75,
    rating: 4.6,
    reviews: 156,
    maxParticipants: 30,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Nuwara Eliya Tea Plantation Tour',
    description: 'Discover the art of tea making in the scenic hill country with factory visits and tastings.',
    category: 'Nature',
    duration: 'Half Day',
    location: 'Nuwara Eliya',
    price: 55,
    rating: 4.5,
    reviews: 98,
    maxParticipants: 20,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    name: 'Galle Fort Heritage Walk',
    description: 'Walk through centuries of history in this UNESCO World Heritage site with colonial architecture and ocean views.',
    category: 'Cultural',
    duration: 'Half Day',
    location: 'Galle',
    price: 45,
    rating: 4.4,
    reviews: 145,
    maxParticipants: 25,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1571167781876-93c0c2fe6dfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    name: 'Ella Train Journey & Nine Arch Bridge',
    description: 'Experience one of the world\'s most scenic train rides through tea plantations and mountain landscapes.',
    category: 'Adventure',
    duration: 'Full Day',
    location: 'Ella',
    price: 95,
    rating: 4.9,
    reviews: 267,
    maxParticipants: 40,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 7,
    name: 'Mirissa Whale Watching',
    description: 'Witness magnificent blue whales, sperm whales, and dolphins in their natural habitat off the southern coast.',
    category: 'Nature',
    duration: 'Half Day',
    location: 'Mirissa',
    price: 65,
    rating: 4.3,
    reviews: 112,
    maxParticipants: 35,
    status: 'draft',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 8,
    name: 'Anuradhapura Ancient City',
    description: 'Explore the ancient capital with sacred temples, massive stupas, and well-preserved ruins dating back 2,500 years.',
    category: 'Cultural',
    duration: 'Full Day',
    location: 'Anuradhapura',
    price: 80,
    rating: 4.7,
    reviews: 89,
    maxParticipants: 25,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1571758009777-40bd9d68fd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 9,
    name: 'Colombo City Discovery',
    description: 'Discover the vibrant capital city with its mix of colonial architecture, modern developments, and cultural sites.',
    category: 'City',
    duration: 'Half Day',
    location: 'Colombo',
    price: 40,
    rating: 4.2,
    reviews: 76,
    maxParticipants: 30,
    status: 'inactive',
    imageUrl: 'https://images.unsplash.com/photo-1571758009777-40bd9d68fd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
])
</script>