'use client'
import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Leaf, Users, Info, Gamepad2 } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, CartesianGrid, LineChart, Line
} from 'recharts'

const features = [
  {
    title: 'Track Your Carbon Footprint',
    description: 'View and manage your carbon footprint in real time.',
    icon: Leaf,
    href: '/household',
    bgColor: '#e6f4ea'
  },
  {
    title: 'Community Service Programs',
    description: 'Join community projects and contribute to a greener future.',
    icon: Users,
    href: '/community-programs',
    bgColor: '#e7f0fd'
  },
  {
    title: 'Contribute Tips & Info',
    description: 'Help others by sharing tips to reduce emissions.',
    icon: Info,
    href: '/contribute',
    bgColor: '#fff8e1'
  },
  {
    title: 'Trivia Quiz',
    description: 'Test your sustainaibility knowledge.',
    icon: Gamepad2,
    href: '/game',
    bgColor: '#f3e8fd'
  },
]

// Hardcoded Data
const barData = [
  { category: 'Electricity', kgCO2: 120 },
  { category: 'Gas', kgCO2: 90 },
  { category: 'Oil', kgCO2: 60 },
  { category: 'Vehicles', kgCO2: 140 },
]

const pieData = [
  { name: 'Electricity', value: 120 },
  { name: 'Gas', value: 90 },
  { name: 'Oil', value: 60 },
  { name: 'Vehicles', value: 140 },
]

const lineData = [
  { month: 'Jan', emissions: 150 },
  { month: 'Feb', emissions: 130 },
  { month: 'Mar', emissions: 170 },
  { month: 'Apr', emissions: 160 },
  { month: 'May', emissions: 120 },
  { month: 'Jun', emissions: 140 },
]

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444']

export default function CarbonWiseDashboard() {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #ecfdf5, #d1fae5)' }}>
      {/* Header */}
      <header style={{ background: 'white', padding: '1rem 2rem', borderBottom: '1px solid #d1fae5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ background: 'linear-gradient(to right, #10b981, #14b8a6)', padding: '0.5rem', borderRadius: '10px', marginRight: '0.75rem' }}>
            <Leaf color="white" size={24} />
          </div>
          <h1 style={{ fontSize: '1.75rem', color: '#1f2937' }}>CarbonWise</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: '#374151' }}>{session?.user?.name ? `Hi, ${session.user.name}` : 'Welcome'}</span>
          <button
            onClick={() => signOut()}
            style={{ backgroundColor: '#ef4444', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Feature Cards */}
      <main style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => router.push(feature.href)}
              style={{
                backgroundColor: feature.bgColor,
                padding: '1.5rem',
                borderRadius: '20px',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease',
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <feature.icon size={20} style={{ marginRight: '0.75rem' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>{feature.title}</h3>
              </div>
              <p style={{ color: '#374151', fontSize: '0.95rem' }}>{feature.description}</p>
            </div>
          ))}
        </div>
        {/* Note Above Charts */}
<div style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#6b7280', fontStyle: 'italic', fontSize: '0.95rem' }}>
  📊 Graphs below are based on average Indian household consumption data for demonstration.
</div>


        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          {/* Bar Chart */}
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}>
            <h2 style={{ marginBottom: '1rem', color: '#1f2937' }}>Carbon Emissions by Category (kg CO₂)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="kgCO2" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}>
            <h2 style={{ marginBottom: '1rem', color: '#1f2937' }}>Emission Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)', marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', color: '#1f2937' }}>Monthly Carbon Emissions Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="emissions" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  )
}
