'use client';
import React, { useState } from 'react';

const programsData = [
  {
    name: 'Ek Ped Maa ke Naam – 2.0 Mega Tree Drive',
    description: '37 crore saplings being planted across Uttar Pradesh today to enhance green cover and provide carbon credits to farmers.',
    location: 'Uttar Pradesh',
    date: '2025‑07‑09',
    link: 'https://timesofindia.indiatimes.com/city/lucknow/up-govt-to-plant-record-37cr-saplings-in-a-single-day-today/articleshow/122327565.cms',
  },
  {
    name: 'Van Mahotsav Sapling Drive – Ludhiana',
    description: 'Over 3,000 native saplings planted in Mattewara forest during Van Mahotsav, with workshops & community monitoring.',
    location: 'Punjab',
    date: '2025‑07‑08',
    link: 'https://timesofindia.indiatimes.com/city/ludhiana/over-3000-saplings-planted-in-mattewara-during-van-mahotsav/articleshow/122325912.cms',
  },
  {
    name: 'Delhi Student Climate Action (MY Bharat)',
    description: 'Awareness & school outreach on air pollution and emission reduction across 130 cities through eco-clubs.',
    location: 'Delhi',
    date: '2025‑06‑30',
    link: 'https://timesofindia.indiatimes.com/city/delhi/on-green-mission-students-become-changemakers-to-tackle-air-pollution/articleshow/121656777.cms',
  },
  {
    name: 'Thiruvananthapuram Zero-Carbon City Initiative',
    description: 'Proposal for solar rooftops and e‑vehicle subsidies launched to reduce city’s emissions & improve AQI.',
    location: 'Kerala',
    date: '2025‑06‑18',
    link: 'https://timesofindia.indiatimes.com/city/thiruvananthapuram/corporation-pushes-for-solar-rooftop-and-e-vehicle-subsidies-to-achieve-zero-carbon-emission/articleshow/121252425.cms',
  },
  {
    name: 'Rajasthan Desert Reforestation Project',
    description: 'Targeting reforestation of drylands with over 1 million saplings across 4 districts.',
    location: 'Rajasthan',
    date: '2025‑06‑01',
    link: 'https://example.com/rajasthan-reforestation',
  },
  {
    name: 'Chennai Coastal Cleanup 2025',
    description: 'Over 5,000 volunteers cleaning Marina Beach with plastic recycling drives.',
    location: 'Tamil Nadu',
    date: '2025‑07‑04',
    link: 'https://example.com/chennai-coastal-cleanup',
  },
  {
    name: 'Mission LiFE – Lifestyle for Environment',
    description: 'A nationwide movement encouraging sustainable lifestyles through individual actions like saving energy, water, and reducing waste.',
    location: 'Pan India',
    date: '2025‑06‑05',
    link: 'https://pib.gov.in/PressReleasePage.aspx?PRID=1806520'
  },
  {
    name: 'Pune Bicycle Plan',
    description: 'Promotion of cycling through over 100 km of dedicated bicycle tracks and public awareness campaigns.',
    location: 'Maharashtra',
    date: '2025‑05‑15',
    link: 'https://smartnet.niua.org/punebikeplan'
  },
  {
    name: 'Eco Clubs Program by MoEFCC',
    description: 'Over 1 lakh schools and colleges promoting eco-consciousness through tree planting, composting, and nature walks.',
    location: 'Pan India',
    date: '2025‑04‑22',
    link: 'https://moef.gov.in/en/division/environment-education-eco-clubs/'
  },
  {
    name: 'Plastic-Free Sikkim Initiative',
    description: 'State-wide ban and clean-up efforts against single-use plastic, driven by youth volunteers and local NGOs.',
    location: 'Sikkim',
    date: '2025‑03‑12',
    link: 'https://sikkim.gov.in/plastic-free-sikkim'
  },
  {
    name: 'Lake Restoration Drive – Bengaluru',
    description: 'Community participation in cleaning, de-weeding, and maintaining city lakes like Kaikondrahalli & Puttenahalli.',
    location: 'Karnataka',
    date: '2025‑06‑21',
    link: 'https://bengaluru.citizenmatters.in/tag/lake-restoration'
  },
  {
    name: 'Swachhata Hi Seva Abhiyan',
    description: 'A massive volunteer-led cleanliness and awareness campaign held annually across Indian cities and villages.',
    location: 'Pan India',
    date: '2025‑10‑02',
    link: 'https://swachhbharatmission.gov.in'
  },
  {
    name: 'Tree Plantation Week – Nagaland',
    description: 'Tribal councils and youth groups lead tree planting in forest-degraded zones during monsoon.',
    location: 'Nagaland',
    date: '2025‑07‑01',
    link: 'https://nagaland.gov.in/tree-plantation-week'
  }
];

export default function CommunityProgramsPage() {
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const filteredPrograms = programsData.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesState = selectedState ? p.location === selectedState : true;
    return matchesSearch && matchesState;
  });

  const allStates = [...new Set(programsData.map(p => p.location))];

  return (
    <>
      {/* Include Google Font */}
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" rel="stylesheet" />

      <div style={{ fontFamily: "'Poppins', sans-serif", background: '#f0fdf4', minHeight: '100vh' }}>
        {/* Hero Header */}
        <div style={{
          background: 'linear-gradient(135deg, #22c55e, #16a34a)',
          color: 'white',
          padding: '4rem 2rem',
          textAlign: 'center',
          borderBottomLeftRadius: '40px',
          borderBottomRightRadius: '40px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        }}>
          <h1 style={{ fontSize: '3.2rem', marginBottom: '0.5rem', fontWeight: '700' }}>🌿 Carbon Community Programs</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '740px', margin: '0 auto 1rem' }}>
            Discover verified initiatives across Indian states fighting climate change.
          </p>
          <p style={{ fontSize: '1rem', maxWidth: '700px', margin: '0 auto', fontStyle: 'italic', opacity: 0.95 }}>
            These programs empower local communities to reduce emissions through tree drives, cleanups, plastic bans, green energy projects and youth engagement.
            Join or get inspired to start your own!
          </p>
        </div>

        {/* Filters */}
        <div style={{ maxWidth: '960px', margin: 'auto', padding: '3rem 2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <input
              type="text"
              placeholder="🔍 Search by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: '2px solid #16a34a',
                fontSize: '1rem',
                width: '280px',
                outline: 'none',
              }}
            />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: '2px solid #16a34a',
                fontSize: '1rem',
                width: '200px',
                backgroundColor: 'white',
                cursor: 'pointer',
              }}
            >
              <option value="">🌐 All States</option>
              {allStates.map((state, idx) => (
                <option key={idx} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* Program Cards */}
          <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((program, index) => (
                <div
                  key={index}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                    borderLeft: '6px solid #22c55e',
                    transition: 'transform 0.3s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#15803d' }}>{program.name}</h2>
                  <p style={{ marginBottom: '0.5rem', color: '#444' }}>{program.description}</p>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>
                    📍 {program.location} &nbsp; • &nbsp; 📅 {program.date}
                  </p>
                  <a
                    href={program.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      marginTop: '0.75rem',
                      color: '#15803d',
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                    }}
                  >
                    View More →
                  </a>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#777' }}>
                No programs found.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
