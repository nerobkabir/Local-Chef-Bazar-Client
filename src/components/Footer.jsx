import { Link } from "react-router-dom";
import { ChefHat, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter,Clock,Heart} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, label: "Facebook", href: "#" },
    { icon: <Instagram className="w-5 h-5" />, label: "Instagram", href: "#" },
    { icon: <Youtube className="w-5 h-5" />, label: "YouTube", href: "#" },
    { icon: <Twitter className="w-5 h-5" />, label: "Twitter", href: "#" },
  ];

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Meals", path: "/meals" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "About Us", path: "#" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <ChefHat className="w-7 h-7 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  LocalChefBazaar
                </span>
                <span className="text-xs text-gray-400">
                  Homemade with Love
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience authentic homemade foods every day. Fresh, quality meals 
              prepared with love by local home chefs in your area.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-600 rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 transition-all duration-300 rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-600 rounded-full" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 group hover:text-orange-400 transition-colors">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-medium text-white text-sm mb-1">Phone</p>
                  <a href="tel:+8801234567890" className="text-sm">
                    +880 1234 567890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 group hover:text-orange-400 transition-colors">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-medium text-white text-sm mb-1">Email</p>
                  <a href="mailto:support@localchefbazaar.com" className="text-sm">
                    support@localchefbazaar.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 group hover:text-orange-400 transition-colors">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-medium text-white text-sm mb-1">Address</p>
                  <p className="text-sm">
                    Bashundhara, Dhaka,<br />Bangladesh
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-600 rounded-full" />
              Working Hours
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-gray-400">
                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-500" />
                <div className="text-sm">
                  <div className="flex justify-between items-center mb-2 text-white font-medium">
                    <span>Monday - Friday</span>
                  </div>
                  <p className="text-gray-400">9:00 AM - 10:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-gray-400 pl-8">
                <div className="text-sm">
                  <div className="flex justify-between items-center mb-2 text-white font-medium">
                    <span>Saturday</span>
                  </div>
                  <p className="text-gray-400">10:00 AM - 8:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-gray-400 pl-8">
                <div className="text-sm">
                  <div className="flex justify-between items-center mb-2 text-white font-medium">
                    <span>Sunday</span>
                  </div>
                  <p className="text-red-400 font-medium">Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl p-6 md:p-8 border border-orange-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Stay Updated!
                </h3>
                <p className="text-gray-400 text-sm">
                  Subscribe to get special offers and updates
                </p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400 flex items-center gap-2">
              © {currentYear} LocalChefBazaar. Made with
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              All Rights Reserved.
            </p>
            <div className="flex gap-6 text-gray-400">
              <a href="#" className="hover:text-orange-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;