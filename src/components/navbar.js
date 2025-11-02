'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  FileText,
  Video,
  Image,
  BookOpen,
  Wrench,
  Bot, Code, Smartphone, Layout, HelpCircle
} from 'lucide-react';

import { motion } from 'framer-motion';


export default function Navbar({ animate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const { email, isAuthenticated, logout, role } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', hasDropdown: true, path: '/services?tab=web' },
    { name: 'Contact', path: '/contact' },
  ];
 
  const serviceItems = [
    { name: 'Web Development', path: '/services?tab=web', icon: <Code size={16} /> },
    { name: 'App Development', path: '/services?tab=app', icon: <Smartphone size={16} /> },
    { name: 'Wordpress', path: '/services?tab=wordpress', icon: <Layout size={16} /> },
    { name: 'Shopify', path: '/services?tab=shopify', icon: <HelpCircle size={16} /> },
  ];
  const isActive = (path) =>
    pathname === path ||
    (path === '/services' && pathname.startsWith('/services')) 
  
  return (

    <nav className="w-full py-2 fixed bg-black z-50">
    <div className="px-4 sm:px-6 lg:px-10">
      <div className="backdrop-blur-md justify-between bg-white/10 border border-white/20 rounded-full px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.25rem,0.8vw,0.5rem)] flex items-center shadow-lg">
        
        {/* Left: Logo */}
        <div
          className="text-white text-md transition"
          style={{ fontFamily: "EthnocentricItalic" }}
        >
          <Link href="/">De Silent Order</Link>
        </div>

        {/* Center Nav */}
        <div className="hidden md:flex items-center justify-center flex-1 gap-4">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.name}
                style={{ fontFamily: "Anta-Regular" }}
                className="relative group"
              >
                <Link
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center text-md px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.25rem,0.8vw,0.5rem)] rounded-2xl transition duration-200 ${
                    isActive("/services")
                      ? "bg-white text-black"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </Link>
                <div className="absolute left-0 w-56 bg-[#1a1a1a] text-white rounded-xl shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-200 z-50">
                  {serviceItems.map((service) => (
                    <Link
                      key={service.name}
                      href={service.path}
                      passHref
                      className="flex items-center gap-2 px-5 py-3 text-sm  transition duration-300 hover:bg-white/20 hover:text-blue-200"
                    >
                      {service.icon}
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) :(
              <Link
                key={item.name}
                href={item.path}
                style={{ fontFamily: "Anta-Regular" }}
                onClick={() => setIsOpen(false)}
                className={`block text-md px-[clamp(2rem,2vw,1.5rem)] py-[clamp(0.25rem,0.8vw,0.5rem)] rounded-2xl transition duration-200 ${
                  isActive(item.path)
                    ? "bg-white text-black"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* Right: Login/Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center gap-2 px-6 py-1.5 rounded-2xl border border-white hover:bg-white/10 transition">
                <User className="w-5 h-5 text-white" />
              </button>
              <div className="absolute right-0 mt-2 w-76 bg-white rounded-2xl shadow-lg ring-1 ring-black/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
                <div className="px-4 py-3 border-b text-sm text-gray-600">
                  Signed in as <br />
                  <span className="font-semibold text-gray-900">{email}</span>
                </div>
                {/* <Link
                  href={
                    role === "admin"
                      ? "/admin_dashboard/profile"
                      : "/student_dashboard/profile"
                  }
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                >
                  {role === "admin" ? "Admin Dashboard" : "Dashboard"}
                </Link> */}
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-red-50 hover:text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-1.5 border border-white text-white rounded-2xl hover:bg-white/10 transition text-md "
            >
              Login / Sign Up
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          className="md:hidden mt-2 w-full max-w-md mx-auto backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-6 py-4 shadow-lg space-y-3 overflow-hidden"
          style={{ wordBreak: "break-word" }}
        >
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div key={item.name}>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={`w-full flex items-center justify-between text-md px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.25rem,0.8vw,0.5rem)] rounded-2xl transition duration-200 ${
                    isActive("/services")
                      ? "bg-white text-black"
                      : "text-white hover:text-black hover:bg-white"
                  }`}
                >
                  {item.name}
                  <ChevronDown
                    size={18}
                    className={`transform transition-transform duration-200 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {servicesOpen && (
                  <div className="mt-2 space-y-1 pl-5 border-l border-white/20">
                    {serviceItems.map((service) => (
                      <Link
                        key={service.name}
                        href={service.path}
                        className={`block px-2 py-1 text-sm transition duration-200 ${
                          pathname === service.path
                            ? "text-purple-500 font-semibold"
                            : "text-white hover:text-blue-300"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )  : (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`block text-md px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.25rem,0.8vw,0.5rem)] rounded-2xl transition duration-200 ${
                  isActive(item.path)
                    ? "bg-white text-black"
                    : "text-white hover:text-black hover:bg-white"
                }`}
              >
                {item.name}
              </Link>
            )
          )}

          {/* Profile / Login on Mobile */}
          <div className="pt-4 border-t border-white/20">
            {isAuthenticated ? (
              <>
                <div className="text-sm text-white mb-2">
                  Signed in as <br />
                  <span className="font-semibold break-all">{email}</span>
                </div>
                {/* <Link
                  href={
                    role === "admin"
                      ? "/admin_dashboard/profile"
                      : "/student_dashboard/profile"
                  }
                  className="block text-white text-sm hover:text-black hover:bg-white py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {role === "admin" ? "Admin Dashboard" : "Student Dashboard"}
                </Link> */}
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left text-sm text-red-400 hover:text-red-600 py-1"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block text-white text-md  hover:text-black hover:bg-white py-2"
                onClick={() => setIsOpen(false)}
              >
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
</nav>



  );
}
