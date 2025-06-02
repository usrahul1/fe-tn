"use client";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Car,
  BarChart3,
  Shield,
  Settings,
  Star,
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 opacity-90" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-car.jpg')" }}
        />
        <div className="relative container mx-auto px-4 py-32 sm:py-48 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Vehicle Maintenance{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-10">
            Track, manage, and optimize your vehicle maintenance with our
            comprehensive dashboard. Keep your vehicles in top condition and
            save on maintenance costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              onClick={handleGetStarted}
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Our dashboard provides everything you need to manage your vehicle
              maintenance efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Car className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Vehicle Tracking
              </h3>
              <p className="text-slate-300">
                Keep track of all your vehicles in one place. Monitor mileage,
                fuel levels, and maintenance schedules.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Maintenance Analytics
              </h3>
              <p className="text-slate-300">
                Visualize maintenance costs and trends. Identify patterns and
                optimize your maintenance schedule.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Service Reminders
              </h3>
              <p className="text-slate-300">
                Never miss a service appointment. Get timely reminders for oil
                changes, tire rotations, and more.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Maintenance History
              </h3>
              <p className="text-slate-300">
                Keep a detailed record of all maintenance activities. Track
                repairs, costs, and service providers.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Performance Metrics
              </h3>
              <p className="text-slate-300">
                Monitor your vehicle's performance metrics. Track fuel
                efficiency, battery health, and more.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <ArrowRight className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Easy Navigation
              </h3>
              <p className="text-slate-300">
                Intuitive interface for seamless navigation. Access all features
                with just a few clicks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Join thousands of vehicle owners who are already using our dashboard
            to manage their maintenance.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            onClick={handleGetStarted}
          >
            Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-white">
                Vehicle Maintenance Dashboard
              </h3>
              <p className="text-slate-400 mt-2">© 2023 All Rights Reserved</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-400 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
