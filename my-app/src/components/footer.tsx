export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">

            <div className="w-full md:w-1/3 mb-6">
              <h2 className="text-lg font-semibold mb-4">About Us</h2>
              <p className="text-gray-400">
                We are a company dedicated to providing the best products and services.
              </p>
            </div>
            
            <div className="w-full md:w-1/3 mb-6">
              <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
              <ul className="text-gray-400">
                <li className="mb-2">
                  <a href="#" className="hover:underline">Home</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">About</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">Services</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">Contact</a>
                </li>
              </ul>
            </div>
            
            <div className="w-full md:w-1/3 mb-6">
              <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-400">Email: info@company.com</p>
              <p className="text-gray-400">Phone: +123 456 7890</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="hover:text-gray-300">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="hover:text-gray-300">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="hover:text-gray-300">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="hover:text-gray-300">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-4 mt-4 text-center">
            <p className="text-gray-400">&copy; 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
  