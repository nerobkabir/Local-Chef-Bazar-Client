const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-5">
      <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Contact Details */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
          <p className="mb-2">📞 Phone: +880 1234 567890</p>
          <p className="mb-2">📧 Email: support@localchefbazaar.com</p>
          <p className="mb-2">📍 Address: Bashundhara, Dhaka, Bangladesh</p>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Follow Us</h2>
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-orange-500">Facebook</a>
            <a href="#" className="hover:text-orange-500">Instagram</a>
            <a href="#" className="hover:text-orange-500">YouTube</a>
            <a href="#" className="hover:text-orange-500">Twitter</a>
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Working Hours</h2>
          <p className="mb-1">Monday - Friday: 9:00 AM - 10:00 PM</p>
          <p className="mb-1">Saturday: 10:00 AM - 8:00 PM</p>
          <p className="mb-1">Sunday: Closed</p>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-700 text-center py-2 text-gray-400">
        © {new Date().getFullYear()} LocalChefBazaar — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
