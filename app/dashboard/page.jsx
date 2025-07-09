'use client'
import React, { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Leaf, Users, Info, Gamepad2 } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

const features = [
  {
    title: 'Track Your Carbon Footprint',
    description: 'View and manage your carbon footprint in real time.',
    icon: Leaf,
    href: '/household',
    color: 'bg-green-100 text-green-700',
  },
  {
    title: 'Community Service Programs',
    description: 'Join community projects and contribute to a greener future.',
    icon: Users,
    href: '/community',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    title: 'Contribute Tips & Info',
    description: 'Help others by sharing tips to reduce emissions.',
    icon: Info,
    href: '/contribute',
    color: 'bg-yellow-100 text-yellow-700',
  },
  {
    title: 'Play Climate Game',
    description: 'Learn while having fun with an eco-friendly game.',
    icon: Gamepad2,
    href: '/game',
    color: 'bg-purple-100 text-purple-700',
  },
]

export default function CarbonWiseDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [records, setRecords] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('carbon form')
        .select('*')
        .order('created_at', { ascending: false })
  
      if (error) {
        console.error('❌ Supabase fetch error:', error.message || error)
      } else {
        console.log('✅ Fetched data from Supabase:', data)
        setRecords(data)
      }
    }
  
    fetchData()
  }, [])
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-md border-b border-emerald-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo + Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-xl">
              <Leaf className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">CarbonWise</h1>
          </div>

          {/* User Greeting + Sign Out */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium text-md">
              {session?.user?.name ? `Hi, ${session.user.name}` : 'Welcome'}
            </span>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Feature Section */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => router.push(feature.href)}
              className={`cursor-pointer rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] transform transition-all duration-300 ${feature.color}`}
            >
              <div className="flex items-center mb-4">
                <feature.icon className="w-6 h-6 mr-3" />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-sm text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Optional: Display record count from Supabase */}
        {records.length > 0 && (
          <div className="mt-10 text-gray-600 text-sm text-center">
            Showing {records.length} carbon footprint records stored.
          </div>
        )}
      </main>
    </div>
  )
}
