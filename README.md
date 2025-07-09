# 🌱 CarbonWise - Sustainable Living Platform

A comprehensive web application that helps users track their carbon footprint, learn about sustainability, and build eco-friendly habits through interactive tools and AI assistance.

![CarbonWise Banner](https://via.placeholder.com/800x200/10b981/ffffff?text=CarbonWise+-+Your+Sustainability+Companion)

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

### 🏆 **Gamification Elements**
- Achievement system for eco-friendly actions
- Progress tracking and streak counters
- Visual rewards and celebrations
- Motivational tips and challenges

## 🚀 Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **React 18** - UI library with hooks and context
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icon library

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
- **Responsive design** - Mobile-first approach
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

### 3. Environment Setup
Create a \`.env.local\` file in the root directory:

\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# OAuth Providers (example with Google)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Chatbot API (if using external service)
CHATBOT_API_URL=http://localhost:8000
\`\`\`

### 4. Database Setup
Run the following SQL in your Supabase SQL editor:

\`\`\`sql
-- Create carbon_data table
CREATE TABLE carbon_data (
  id BIGSERIAL PRIMARY KEY,
  user_email TEXT NOT NULL,
  total_footprint DECIMAL(10,2) NOT NULL,
  per_person DECIMAL(10,2) NOT NULL,
  breakdown JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE carbon_data ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
CREATE POLICY "Users can view own data" ON carbon_data
  FOR SELECT USING (auth.email() = user_email);

CREATE POLICY "Users can insert own data" ON carbon_data
  FOR INSERT WITH CHECK (auth.email() = user_email);
\`\`\`

### 5. Run the Development Server
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
│   │   └── supabaseClient.ts     # Supabase configuration
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # UI components
│   └── ui/                       # shadcn/ui components
├── public/                       # Static assets
├── .env.local                    # Environment variables
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

## 🚀 Deployment

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### **Other Platforms**
- **Netlify**: Configure build settings
- **Railway**: Add environment variables
- **DigitalOcean**: Use App Platform

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Commit your changes**
   \`\`\`bash
   git commit -m 'Add amazing feature'
   \`\`\`
4. **Push to the branch**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
5. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly

## 📝 API Documentation

### **Carbon Calculation API**
\`\`\`typescript
// Emission factors used in calculations
const EMISSION_FACTORS = {
  electricity: 0.233,    // kg CO₂ per kWh
  gas: 0.184,           // kg CO₂ per kWh
  oil: 2.52,            // kg CO₂ per litre
  vehicle: {
    petrol: 2.31,       // kg CO₂ per litre
    diesel: 2.68
  },
  shortHaulFlight: 250, // kg CO₂ per flight
  longHaulFlight: 1100, // kg CO₂ per flight
  food: 2.5,           // kg CO₂ per day
  waste: 1.5,          // kg CO₂ per day
  publicTransport: 0.105 // kg CO₂ per km
}
\`\`\`

### **Database Schema**
\`\`\`sql
carbon_data (
  id: BIGSERIAL PRIMARY KEY,
  user_email: TEXT NOT NULL,
  total_footprint: DECIMAL(10,2),
  per_person: DECIMAL(10,2),
  breakdown: JSONB,
  created_at: TIMESTAMP WITH TIME ZONE
)
\`\`\`

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
- **CSRF protection**
- **Rate limiting** (recommended)

## 📱 Mobile Support

- **Responsive design** for all screen sizes
- **Touch-friendly** interface elements
- **Mobile-optimized** animations
- **Progressive Web App** features (optional)

## 🌍 Sustainability Impact

### **Educational Value**
- **Carbon footprint awareness**
- **Sustainability tips and tricks**
- **Interactive learning** through gamification
- **Real-world impact** calculations

### **Behavioral Change**
- **Progress tracking** over time
- **Goal setting** and achievement
- **Community features** (planned)
- **Social sharing** capabilities

## 📈 Roadmap

### **Upcoming Features**
- [ ] **Community challenges** and leaderboards
- [ ] **Carbon offset marketplace** integration
- [ ] **Mobile app** development
- [ ] **Advanced analytics** and insights
- [ ] **Social sharing** features
- [ ] **Multi-language** support
- [ ] **Dark mode** theme
- [ ] **Offline functionality**

### **Long-term Goals**
- [ ] **AI-powered recommendations**
- [ ] **IoT device integration**
- [ ] **Corporate sustainability** tools
- [ ] **API for third-party** integrations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js team** for the amazing framework
- **Supabase** for the backend infrastructure
- **Tailwind CSS** for the utility-first styling
- **Lucide** for the beautiful icons
- **Recharts** for data visualization
- **Open source community** for inspiration and support

## 📞 Support

- **Documentation**: [Project Wiki](https://github.com/yourusername/carbonwise/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/carbonwise/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/carbonwise/discussions)
- **Email**: support@carbonwise.app

---

**Made with 💚 for a sustainable future**

*CarbonWise - Empowering individuals to make environmentally conscious decisions through technology and education.*
