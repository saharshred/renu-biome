# 🌱 Renu Biome - Internal Business Management Platform

**Renu Biome** is an agricultural company that manufactures and sells agricultural products. This repository contains our **internal business management platform** - a comprehensive web application that our team uses to manage all aspects of our agricultural business operations.

![Renu Biome Logo](public/renu-biome-logo-clean.png)

## 🚀 What is This Platform?

This is Renu Biome's **internal business management system** that our team uses to:

- **Manage customer relationships** with growers and agricultural businesses
- **Track inventory** of our agricultural products
- **Monitor sales performance** and business metrics
- **Manage employees** and business operations
- **Track compliance** and certifications
- **Manage product innovation** and patents
- **Handle customer appointments** and field visits

## 🏢 Company Overview

**Renu Biome** is an agricultural company that specializes in:
- **Soil health products** (Biome Care, N-Care)
- **Crop nutrition solutions** (K-Rush, Karanja Oil)
- **Organic and sustainable agricultural products**
- **Innovation in agricultural technology**

## 💻 Platform Features

### 👥 Customer Management
Our team uses this platform to manage relationships with our agricultural customers:

- **Customer Dashboard**: Track customer information, orders, and history
- **Soil Analysis Reports**: Store and manage soil testing results
- **Fertilizer Recommendations**: Generate and track product recommendations
- **Field Visit Summaries**: Document customer site visits and consultations
- **Appointment Scheduling**: Manage customer meetings and consultations
- **Legacy Programs**: Track long-term customer relationships and programs

### 🏭 Business Operations
Internal tools for managing our company operations:

- **Sales Analytics**: Track revenue, customer acquisition, and sales performance
- **Inventory Management**: Monitor product stock levels and supply chain
- **Employee Management**: Handle HR, payroll, and team organization
- **Compliance Tracking**: Manage EPA registrations, OMRI certifications, and other regulatory requirements
- **Patent Management**: Track our intellectual property and innovations
- **Budget Planning**: Financial planning and expense tracking
- **Manufacturer Relationships**: Manage partnerships with product manufacturers

### 📊 Reporting & Analytics
- **Sales Reports**: Comprehensive business performance metrics
- **Customer Analytics**: Customer behavior and satisfaction tracking
- **Inventory Reports**: Stock level monitoring and forecasting
- **Financial Reports**: Revenue, expenses, and profitability analysis

## 🛠️ Technical Stack

- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom design system
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Charts**: Chart.js and Recharts for data visualization
- **PDF Generation**: jsPDF for document creation
- **UI Components**: Radix UI primitives with custom styling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account and project

### Installation
```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run the development server
npm run dev
```

### Environment Variables
Create a `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Main dashboard routes
│   │   ├── customer/      # Customer management features
│   │   └── owner/         # Business operations features
│   ├── login/             # Authentication
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (buttons, inputs, etc.)
│   └── Sidebar.tsx       # Navigation sidebar
└── lib/                  # Utilities and configurations
    ├── api/              # API functions
    ├── supabaseClient.ts # Database client
    └── utils.ts          # Helper functions
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
- TypeScript for type safety
- Tailwind CSS for styling
- Component-based architecture
- Responsive design principles

## 📱 User Roles

### Customer Service Team
- Access to customer management features
- Can view customer orders and history
- Manage appointments and field visits

### Business Operations Team
- Full access to sales and inventory data
- Employee and compliance management
- Financial reporting and planning

### Management Team
- Complete access to all platform features
- Strategic business analytics
- Innovation and patent tracking

## 🤝 Contributing

This is an internal platform for Renu Biome team members. For questions or issues, please contact the development team.

## 📄 License

Internal use only - Renu Biome proprietary software.

---

**Built with ❤️ by the Renu Biome team**
