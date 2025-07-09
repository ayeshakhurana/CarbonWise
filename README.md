# 🌱 CarbonWise - Sustainable Living Platform

A comprehensive web application that helps users track their carbon footprint, learn about sustainability, and build eco-friendly habits through interactive tools and AI assistance.

## ✨ Features

### 🏠 **Carbon Footprint Calculator**
- Multi-step form with intuitive UI
- Track home energy, vehicles, flights, food, and waste
- Real-time calculations with detailed breakdowns
- Personalized tips for reducing emissions
- Data persistence with Supabase integration

### 🤖 **AI-Powered EcoBot Assistant**
- Interactive chatbot for sustainability questions
- Modern chat interface with typing indicators
- Real-time responses and eco-friendly tips
- Accessible from any page via floating bot icon

### 🎮 **EcoTrivia Challenge**
- 8 engaging sustainability questions
- Time-based scoring system with bonuses
- Streak multipliers and level progression
- Beautiful animations and visual feedback
- Educational explanations for each answer

### 📊 **Interactive Dashboard**
- Real-time carbon footprint visualization
- Charts and graphs powered by Recharts
- Feature cards for easy navigation
- Responsive design for all devices


## 🚀 Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **React 18** - UI library with hooks and context
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icon library
- **Recharts** - Graphs Generation

### **Backend & Database**
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Relational database
- **Row Level Security** - Data protection

### **Authentication**
- **NextAuth.js** - Authentication solution
- **Session management** - Secure user sessions

### **Data Visualization**
- **Recharts** - React charting library
- **Interactive charts** - Bar, pie, and line charts

### **UI/UX**
- **Responsive design** - Interactive dashboard.
- **Smooth animations** - CSS transitions and keyframes
- **Glass-morphism** - Modern design effects
- **Accessibility** - WCAG compliant

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- NextAuth provider (Google, GitHub, etc.)

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/yourusername/carbonwise.git
cd carbonwise
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Run the Development Server
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

\`\`\`
carbonwise/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   ├── chatbot/                  # Chatbot page
│   ├── dashboard/                # Main dashboard
│   ├── game/                     # Trivia game
│   ├── household/                # Carbon calculator
│   ├── components/               # Shared components
│   ├── lib/                      # Utility functions
│   │   └── supabaseClient.js     # Supabase configuration
│   ├── globals.css               # Global styles
│   ├── layout.js                 # Root layout
│   └── page.js                   # Home page
├── components/                   # UI components                
├── public/                       # Static assets
├── .env                          # Environment variables
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind configuration
├── package.json                  # Dependencies
└── README.md                     # This file
\`\`\`

## 🎨 Key Components

### **Carbon Calculator** (\`/household\`)
- 8-step wizard interface
- Form validation and error handling
- Real-time calculations
- Data visualization
- Supabase integration

### **EcoBot Chatbot** (\`/chatbot\`)
- Modern chat interface
- Typing indicators and animations
- Message history
- Responsive design

### **Trivia Game** (\`/game\`)
- Interactive quiz system
- Timer-based gameplay
- Score calculation
- Educational content

### **Dashboard** (\`/dashboard\`)
- Data visualization
- Feature navigation
- Robotic chatbot icon
- Responsive charts

## 🔧 Configuration

### **Supabase Setup**
1. Create a new Supabase project
2. Copy your project URL and anon key
3. Set up the database schema (see installation)
4. Configure Row Level Security policies

### **NextAuth Setup**
1. Configure your OAuth providers
2. Set up callback URLs
3. Add environment variables
4. Customize sign-in pages (optional)

### **Chatbot Integration**
1. Set up your chatbot backend service
2. Configure API endpoints
3. Update environment variables
4. Test the integration


## 🐛 Troubleshooting

### **Common Issues**

**Database Connection Error**
- Check Supabase URL and API key
- Verify environment variables
- Check network connectivity

**Authentication Issues**
- Verify OAuth provider setup
- Check callback URLs
- Validate environment variables

**Build Errors**
- Clear \`.next\` folder and rebuild
- Check TypeScript errors
- Verify all dependencies are installed

**Chatbot Not Working**
- Check API endpoint configuration
- Verify backend service is running
- Check CORS settings

## 📊 Performance

### **Optimization Features**
- **Next.js App Router** for optimal performance
- **Image optimization** with Next.js Image component
- **Code splitting** for faster page loads
- **Caching strategies** for API responses
- **Responsive images** for different screen sizes

### **Monitoring**
- **Error tracking** with console logging
- **Performance metrics** via Next.js analytics
- **User experience** monitoring

## 🔒 Security

### **Data Protection**
- **Row Level Security** in Supabase
- **Environment variable** protection
- **Input validation** and sanitization
- **HTTPS enforcement** in production

### **Authentication**
- **Secure session management**
- **OAuth provider integration**


## 🌍 Sustainability Impact

### **Educational Value**
- **Carbon footprint awareness**
- **Sustainability tips and tricks**
- **Interactive learning** through gamification
- **Real-world impact** calculations


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: ayeshaxkhurana@gmail.com

---

**Made with 💚 for a sustainable future**

*CarbonWise - Empowering individuals to make environmentally conscious decisions through technology and education.*
