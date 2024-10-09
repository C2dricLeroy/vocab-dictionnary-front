export default function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-900 py-8 shadow-[8px_8px_16px_#d1d9e6,_-8px_-8px_16px_#ffffff] dark:bg-gray-800 dark:text-white dark:shadow-[inset_1px_1px_2px_#2e2e2e,_inset_-1px_-1px_2px_#3f3f3f]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">

          <div className="w-full md:w-1/3 mb-6">
            <h2 className="text-lg font-semibold mb-4">About Us</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Simply learn by cumulating knowledge.
            </p>
          </div>

          <div className="w-full md:w-1/3 mb-6">
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-2">
                <a href="#" className="hover:underline hover:text-gray-800 dark:hover:text-gray-300">Home</a>
              </li>
              <li className="mb-2">
                <a href="/about" className="hover:underline hover:text-gray-800 dark:hover:text-gray-300">About</a>
              </li>
              <li className="mb-2">
                <a href="/pricing" className="hover:underline hover:text-gray-800 dark:hover:text-gray-300">Pricing</a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="hover:underline hover:text-gray-800 dark:hover:text-gray-300">Contact</a>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/3 mb-6">
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400">Email: contact@lexilearn.eu</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-gray-800 dark:hover:text-gray-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-gray-800 dark:hover:text-gray-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-gray-800 dark:hover:text-gray-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-gray-800 dark:hover:text-gray-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700 pt-4 mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">&copy; 2024 LexiLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
