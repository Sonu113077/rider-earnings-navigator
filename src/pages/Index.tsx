
import { Link } from 'react-router-dom';
import { ChevronRight, BarChart3, Users, Bell, Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary/20">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        
        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32 lg:py-40 text-center">
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight animate-fade-in">
              Rider Earnings Management
              <span className="block text-primary mt-2">Simplified</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground animate-fade-in [animation-delay:200ms]">
              Streamline your rider earnings management with our comprehensive platform. Manage users, track earnings, and generate reports with ease.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in [animation-delay:400ms]">
              <Link to="/register" className="btn-primary w-full sm:w-auto px-8">
                Get Started
                <ChevronRight size={16} className="ml-1" />
              </Link>
              <Link to="/login" className="btn-secondary w-full sm:w-auto px-8">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-secondary/50 dark:bg-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Powerful Features
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BarChart3,
                title: "Earnings Analytics",
                description: "Track and analyze rider earnings with intuitive charts and reports."
              },
              {
                icon: Users,
                title: "User Management",
                description: "Efficiently manage riders and administrators from a central dashboard."
              },
              {
                icon: Bell,
                title: "Real-time Updates",
                description: "Get instant notifications about earnings and system updates."
              },
              {
                icon: Shield,
                title: "Secure Access",
                description: "Multi-level authentication and role-based access control."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 Rider Earnings Management. All rights reserved.
            </div>
            <a 
              href="mailto:helloworld.113077@gmail.com"
              className="text-sm text-primary hover:underline"
            >
              Contact Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
