"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, Car, Plane, Utensils, Bus, Check, Leaf, Globe, Users, Zap, Calculator, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient'
import { useSession } from 'next-auth/react'


const CarbonForm = () => {
    const { data: session, status } = useSession(); 
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    country: '',
    category: 'person',
    household_size: 1,
    home_energy: { electricity_kwh: '', gas_kwh: '', oil_litres: '' },
    vehicles: [],
    flights: [],
    food: { days: 365 },
    waste: { days: 365 },
    public_transport: []
  });
  const [vehicle, setVehicle] = useState({ fuel: '', annual_km: '', l_per_100km: '' });
  const [transportKm, setTransportKm] = useState('');
  const [shortHaul, setShortHaul] = useState(0);
  const [longHaul, setLongHaul] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const steps = [
    { number: 1, title: 'General Info', icon: Users, color: '#3b82f6' },
    { number: 2, title: 'Home Energy', icon: Home, color: '#10b981' },
    { number: 3, title: 'Vehicles', icon: Car, color: '#ef4444' },
    { number: 4, title: 'Flights', icon: Plane, color: '#8b5cf6' },
    { number: 5, title: 'Food & Waste', icon: Utensils, color: '#f59e0b' },
    { number: 6, title: 'Transport', icon: Bus, color: '#6366f1' },
    { number: 7, title: 'Review', icon: Check, color: '#6b7280' },
    { number: 8, title: 'Results', icon: Calculator, color: '#059669' }
  ];

  const handleSubmit = () => {
    setLoading(true);
  
    // Emission Factors (kg CO₂ per unit - monthly adjusted where needed)
    const EF = {
      electricity: 0.233, // kg CO₂ per kWh
      gas: 0.184,          // kg CO₂ per kWh
      oil: 2.52,           // kg CO₂ per litre
      vehicle: {
        petrol: 2.31,      // kg CO₂ per litre
        diesel: 2.68
      },
      shortHaulFlight: 250,  // kg CO₂ per short flight (per flight)
      longHaulFlight: 1100,  // kg CO₂ per long flight (per flight)
      food: 2.5,            // kg CO₂ per day
      waste: 1.5,           // kg CO₂ per day
      public_transport: 0.105 // kg CO₂ per km
    };
  
    setTimeout(() => {
      // 1. Home energy (monthly usage)
      const electricity = form.home_energy.electricity_kwh * EF.electricity;
      const gas = form.home_energy.gas_kwh * EF.gas;
      const oil = form.home_energy.oil_litres * EF.oil;
      const home_energy = +(electricity + gas + oil).toFixed(2);
  
      // 2. Vehicles (monthly km driven)
      let vehicles = 0;
      form.vehicles.forEach(v => {
        const litres = (v.annual_km / 100) * v.l_per_100km; // annual km → now treat as monthly
        vehicles += litres * EF.vehicle[v.fuel];
      });
      vehicles = +vehicles.toFixed(2);
  
      // 3. Flights (still per month for input count of flights)
      const flights = +(shortHaul * EF.shortHaulFlight + longHaul * EF.longHaulFlight).toFixed(2);
  
      // 4. Food (number of days in the month)
      const food = +(form.food.days * EF.food).toFixed(2);
  
      // 5. Waste
      const waste = +(form.waste.days * EF.waste).toFixed(2);
  
      // 6. Public Transport (monthly km)
      let public_transport = 0;
      form.public_transport.forEach(t => {
        public_transport += t.annual_km * EF.public_transport; // annual_km should now be monthly_km
      });
      public_transport = +public_transport.toFixed(2);
  
      const total = +(home_energy + vehicles + flights + food + waste + public_transport).toFixed(2);
      const per_person = +(total / form.household_size).toFixed(2);
  
      const breakdown = { home_energy, vehicles, flights, food, waste, public_transport };
  
      setResult({
        total_footprint_kg: total,
        per_person_kg: per_person,
        breakdown
      });
  
      setLoading(false);
      setStep(8);
    }, 1000);
  };
  
  const insertDataToSupabase = async () => {
    const { data: userData } = session || {}; // If you're using NextAuth
    const { error } = await supabase.from('carbon_data').insert([
      {
        user_email: userData?.user?.email || '',
        total_footprint: total,
        per_person: per_person,
        breakdown: JSON.stringify(breakdown)
      }
    ])
    if (error) console.error("Error inserting data:", error)
  };
  insertDataToSupabase()
  

  const addVehicle = () => {
    if (vehicle.fuel && vehicle.annual_km && vehicle.l_per_100km) {
      setForm({ ...form, vehicles: [...form.vehicles, { ...vehicle }] });
      setVehicle({ fuel: '', annual_km: '', l_per_100km: '' });
    }
  };

  const addTransport = () => {
    if (transportKm) {
      setForm({ ...form, public_transport: [...form.public_transport, { annual_km: Number(transportKm) }] });
      setTransportKm('');
    }
  };

  const next = () => setStep(prev => prev + 1);
  const prev = () => setStep(prev => prev - 1);

  const generateTips = () => {
    if (!result || !result.breakdown) return [];
  
    const tips = [];
    const b = result.breakdown;
  
    if (b.home_energy > 2000) tips.push("🔌 Reduce electricity or gas usage at home by switching to energy-efficient appliances.");
    if (b.vehicles > 2000) tips.push("🚗 Consider carpooling, using EVs, or reducing car travel distance.");
    if (b.flights > 2000) tips.push("✈️ Limit air travel or offset flight emissions with certified programs.");
    if (b.food > 600) tips.push("🥕 Eat more plant-based meals and reduce meat consumption.");
    if (b.waste > 500) tips.push("♻️ Recycle, compost, and reduce single-use plastics.");
    if (b.public_transport < 50) tips.push("🚌 Increase your use of buses, trains, or bicycles where possible.");
  
    return tips.length ? tips : ["🌍 Great job! You're already minimizing your emissions in most areas."];
  };


  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffffff 0%, #008080 100%)',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(45deg, #10b981, #3b82f6)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }}>
              <Leaf size={28} color="white" />
            </div>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '800',
              background: 'linear-gradient(45deg, #10b981, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              CarbonWise
            </h1>
            <Globe size={32} color="#10b981" style={{ animation: 'pulse 2s infinite' }} />
          </div>
          <p style={{ color: '#0a0a0a', fontSize: '1.2rem', margin: 0 }}>
            Calculate your carbon footprint & build a sustainable future
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
            {steps.map((s, index) => (
              <div key={s.number} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: step >= s.number ? s.color : '#0a0a0a',
                  transition: 'all 0.3s ease',
                  transform: step === s.number ? 'scale(1.1)' : 'scale(1)',
                  boxShadow: step === s.number ? `0 0 20px ${s.color}40` : 'none'
                }}>
                  <s.icon size={20} color="white" />
                </div>
                {index < steps.length - 1 && (
                  <div style={{
                    width: '40px',
                    height: '4px',
                    margin: '0 10px',
                    backgroundColor: step > s.number ? '#10b981' : '#cbd5e1',
                    borderRadius: '2px',
                    transition: 'all 0.3s ease'
                  }} />
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', color: '#e2e8f0' }}>
            <span style={{ fontSize: '14px' }}>Step {step} of 8: </span>
            <span style={{ fontWeight: '600' }}>{steps.find(s => s.number === step)?.title}</span>
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '24px',
          padding: '40px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
        }}>
          {/* Step 1: General Info */}
          {step === 1 && (
            <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease-in' }}>
              <Users size={64} color="#3b82f6" style={{ marginBottom: '20px' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '10px' }}>
                Tell us about yourself
              </h2>
              <p style={{ color: '#6b7280', marginBottom: '40px' }}>
                This helps us personalize your carbon footprint calculation
              </p>
              <div style={{ display: 'grid', gap: '25px', textAlign: 'left' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Country
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your country"
                    value={form.country}
                    onChange={e => setForm({ ...form, country: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '15px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                      ':focus': { borderColor: '#3b82f6', outline: 'none' }
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '15px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '16px',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="person">Individual</option>
                    <option value="family">Family</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Household Size
                  </label>
                  <input
                    type="number"
                    placeholder="Number of people"
                    value={form.household_size}
                    onChange={e => setForm({ ...form, household_size: Number(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '15px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '16px'
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Home Energy */}
{step === 2 && (
  <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease-in' }}>
    <Zap size={64} color="#10b981" style={{ marginBottom: '20px' }} />
    <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '10px' }}>
      Home Energy Usage
    </h2>
    <p style={{ color: '#6b7280', marginBottom: '40px' }}>
      Enter your <strong>monthly</strong> energy consumption
    </p>
    <div style={{ display: 'grid', gap: '25px', textAlign: 'left' }}>
      <div>
        <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
          Electricity (kWh/month)
        </label>
        <input
          type="number"
          placeholder="e.g., 300"
          value={form.home_energy.electricity_kwh}
          onChange={e => setForm({ ...form, home_energy: { ...form.home_energy, electricity_kwh: Number(e.target.value) } })}
          style={{
            width: '100%',
            padding: '15px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '16px'
          }}
        />
      </div>
      <div>
        <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
          Gas (kWh/month)
        </label>
        <input
          type="number"
          placeholder="e.g., 250"
          value={form.home_energy.gas_kwh}
          onChange={e => setForm({ ...form, home_energy: { ...form.home_energy, gas_kwh: Number(e.target.value) } })}
          style={{
            width: '100%',
            padding: '15px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '16px'
          }}
        />
      </div>
      <div>
        <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
          Oil (litres/month)
        </label>
        <input
          type="number"
          placeholder="e.g., 30"
          value={form.home_energy.oil_litres}
          onChange={e => setForm({ ...form, home_energy: { ...form.home_energy, oil_litres: Number(e.target.value) } })}
          style={{
            width: '100%',
            padding: '15px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '16px'
          }}
        />
      </div>
    </div>
  </div>
)}


          {/* Step 3: Vehicles */}
{step === 3 && (
  <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease-in' }}>
    <Car size={64} color="#ef4444" style={{ marginBottom: '20px' }} />
    <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '10px' }}>
      Vehicle Usage
    </h2>
    <p style={{ color: '#6b7280', marginBottom: '40px' }}>
      Add information about your <strong>monthly</strong> vehicle usage
    </p>
    <div style={{ display: 'grid', gap: '25px', textAlign: 'left' }}>
      <div>
        <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
          Fuel Type
        </label>
        <select
          value={vehicle.fuel}
          onChange={e => setVehicle({ ...vehicle, fuel: e.target.value })}
          style={{
            width: '100%',
            padding: '15px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '16px',
            backgroundColor: 'white'
          }}
        >
          <option value="">Select Fuel Type</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
        </select>
      </div>
      <div>
        <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
          Distance Driven (km/month)
        </label>
        <input
          type="number"
          placeholder="e.g., 1200"
          value={vehicle.annual_km}
          onChange={e => setVehicle({ ...vehicle, annual_km: Number(e.target.value) })}
          style={{
            width: '100%',
            padding: '15px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '16px'
          }}
        />
      </div>
      <div>
        <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
          Fuel Consumption (L/100km)
        </label>
        <input
          type="number"
          placeholder="e.g., 7.5"
          value={vehicle.l_per_100km}
          onChange={e => setVehicle({ ...vehicle, l_per_100km: Number(e.target.value) })}
          style={{
            width: '100%',
            padding: '15px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '16px'
          }}
        />
      </div>
      <button
        onClick={addVehicle}
        style={{
          width: '100%',
          padding: '15px',
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        Add Vehicle
      </button>

      {form.vehicles.length > 0 && (
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ fontWeight: '600', marginBottom: '10px' }}>Added Vehicles:</h3>
          {form.vehicles.map((v, i) => (
            <div key={i} style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>
              {v.fuel} - {v.annual_km} km/month - {v.l_per_100km} L/100km
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)}


          {/* Step 4: Flights */}
{step === 4 && (
  <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease-in' }}>
    <Plane size={64} color="#8b5cf6" style={{ marginBottom: '20px' }} />
    <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '10px' }}>
      Air Travel
    </h2>
    <p style={{ color: '#6b7280', marginBottom: '40px' }}>
      How many flights do you take per <strong>month</strong>?
    </p>
    <div style={{ display: 'grid', gap: '25px', textAlign: 'left' }}>
      <div>
        <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
          Short-haul Flights (under 3 hours)
        </label>
        <input
          type="number"
          placeholder="e.g., 1"
          value={shortHaul}
          onChange={e => setShortHaul(Number(e.target.value))}
          style={{
            width: '100%',
            padding: '15px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '16px'
          }}
        />
      </div>
      <div>
        <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
          Long-haul Flights (over 3 hours)
        </label>
        <input
          type="number"
          placeholder="e.g., 0.5"
          value={longHaul}
          onChange={e => setLongHaul(Number(e.target.value))}
          style={{
            width: '100%',
            padding: '15px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '16px'
          }}
        />
      </div>
    </div>
  </div>
)}


          {/* Step 5: Food & Waste */}
{step === 5 && (
  <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease-in' }}>
    <Utensils size={64} color="#f59e0b" style={{ marginBottom: '20px' }} />
    <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '10px' }}>
      Food & Waste
    </h2>
    <p style={{ color: '#6b7280', marginBottom: '40px' }}>
      Track your consumption and waste patterns <strong>monthly</strong>
    </p>
    <div style={{ display: 'grid', gap: '25px', textAlign: 'left' }}>
      <div>
        <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
          Days of Food Consumption (per month)
        </label>
        <input
          type="number"
          placeholder="e.g., 30"
          value={form.food.days}
          onChange={e => setForm({ ...form, food: { days: Number(e.target.value) } })}
          style={{
            width: '100%',
            padding: '15px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '16px'
          }}
        />
      </div>
      <div>
        <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
          Days of Waste Generation (per month)
        </label>
        <input
          type="number"
          placeholder="e.g., 30"
          value={form.waste.days}
          onChange={e => setForm({ ...form, waste: { days: Number(e.target.value) } })}
          style={{
            width: '100%',
            padding: '15px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '16px'
          }}
        />
      </div>
    </div>
  </div>
)}


          {/* Step 6: Public Transport */}
{step === 6 && (
  <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease-in' }}>
    <Bus size={64} color="#6366f1" style={{ marginBottom: '20px' }} />
    <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '10px' }}>
      Public Transport
    </h2>
    <p style={{ color: '#6b7280', marginBottom: '40px' }}>
      Add your <strong>monthly</strong> public transportation usage
    </p>
    <div style={{ display: 'grid', gap: '25px', textAlign: 'left' }}>
      <div>
        <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
          Distance Travelled (km/month)
        </label>
        <input
          type="number"
          placeholder="e.g., 150"
          value={transportKm}
          onChange={e => setTransportKm(e.target.value)}
          style={{
            width: '100%',
            padding: '15px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '16px'
          }}
        />
      </div>
      <button
        onClick={addTransport}
        style={{
          width: '100%',
          padding: '15px',
          backgroundColor: '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        Add Public Transport
      </button>
      {form.public_transport.length > 0 && (
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ fontWeight: '600', marginBottom: '10px' }}>Added Transport:</h3>
          {form.public_transport.map((t, i) => (
            <div key={i} style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>
              {t.annual_km} km/month
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)}


          {/* Step 7: Review */}
          {step === 7 && (
            <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease-in' }}>
              <Check size={64} color="#6b7280" style={{ marginBottom: '20px' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '10px' }}>
                Review Your Data
              </h2>
              <p style={{ color: '#6b7280', marginBottom: '40px' }}>
                Please review your information before calculating
              </p>
              <div style={{
                backgroundColor: '#f8fafc',
                padding: '30px',
                borderRadius: '16px',
                textAlign: 'left',
                marginBottom: '30px'
              }}>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div><strong>Country:</strong> {form.country}</div>
                  <div><strong>Category:</strong> {form.category}</div>
                  <div><strong>Household Size:</strong> {form.household_size}</div>
                  <div><strong>Vehicles:</strong> {form.vehicles.length}</div>
                  <div><strong>Short-haul Flights:</strong> {shortHaul}</div>
                  <div><strong>Long-haul Flights:</strong> {longHaul}</div>
                  <div><strong>Public Transport:</strong> {form.public_transport.length} entries</div>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '20px',
                  background: loading ? '#9ca3af' : 'linear-gradient(45deg, #10b981, #3b82f6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                {loading ? 'Calculating...' : 'Calculate My Carbon Footprint'}
              </button>
            </div>
          )}

          {/* Step 8: Results */}
          {step === 8 && result && (
            <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease-in' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(45deg, #10b981, #3b82f6)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
              }}>
                <Calculator size={40} color="white" />
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '10px' }}>
                Your Carbon Footprint
              </h2>
              <p style={{ color: '#6b7280', marginBottom: '40px' }}>
                Here's your environmental impact breakdown
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  padding: '30px',
                  borderRadius: '16px',
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
                }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '5px' }}>
                    {result.total_footprint_kg.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>kg CO₂ Total</div>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  color: 'white',
                  padding: '30px',
                  borderRadius: '16px',
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
                }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '5px' }}>
                    {Math.round(result.per_person_kg).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>kg CO₂ Per Person</div>
                </div>
              </div>

              <div style={{
                backgroundColor: 'white',
                border: '2px solid #f3f4f6',
                borderRadius: '16px',
                padding: '30px',
                marginBottom: '30px'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px' }}>
                  Breakdown by Category
                </h3>
                <div style={{ display: 'grid', gap: '15px' }}>
                  {Object.entries(result.breakdown).map(([key, value]) => (
                    <div key={key} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '15px 0',
                      borderBottom: '1px solid #f3f4f6'
                    }}>
                      <span style={{ fontWeight: '600', textTransform: 'capitalize' }}>
                        {key.replace('_', ' ')}
                      </span>
                      <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#10b981' }}>
                        {value} kg CO₂
                      </span>
                    </div>
                  ))}
                </div>
              </div>

             <div style={{
                backgroundColor: '#fef3c7',
                border: '1px solid #fbbf24',
                borderLeft: '4px solid #f59e0b',
                borderRadius: '12px',
                padding: '25px'
              }}>
                <h3  style={{ fontSize: '1.2rem', fontWeight: '700', color: '#92400e', marginBottom: '15px' }}>
                  💡 Tips to Reduce Your Footprint
                </h3>
                <div style={{ color: '#78350f', fontSize: '14px', lineHeight: '1.6' }}>
                  <div style={{ marginBottom: '8px' }}>• Switch to renewable energy sources</div>
                  <div style={{ marginBottom: '8px' }}>• Use public transport or electric vehicles</div>
                  <div style={{ marginBottom: '8px' }}>• Reduce air travel when possible</div>
                  <div style={{ marginBottom: '8px' }}>• Choose local and seasonal foods</div>
                  <div>• Implement recycling and composting</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          {step < 8 && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '40px',
              paddingTop: '30px',
              borderTop: '2px solid #f3f4f6'
            }}>
              {step > 1 ? (
                <button
                  onClick={prev}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    backgroundColor: '#f8fafc',
                    color: '#374151',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <ChevronLeft size={16} />
                  Back
                </button>
              ) : <div />}

              {step < 7 && (
                <button
                  onClick={next}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    background: 'linear-gradient(45deg, #10b981, #3b82f6)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    marginLeft: 'auto'
                  }}
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        input:focus, select:focus {
          border-color: #3b82f6 !important;
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        button:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default CarbonForm;