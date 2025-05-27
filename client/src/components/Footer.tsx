export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-atom text-white text-sm"></i>
            </div>
            <div>
              <div className="font-bold text-neutral-900">QUOMA</div>
              <div className="text-xs text-neutral-500">Making physics fun and intuitive</div>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm text-neutral-600">
            <a href="#" className="hover:text-neutral-900 transition-colors">About</a>
            <a href="#" className="hover:text-neutral-900 transition-colors">Contact</a>
            <a href="#" className="hover:text-neutral-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-neutral-900 transition-colors">Terms</a>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 text-center text-xs text-neutral-500">
          © 2024 QUOMA. Free physics education for everyone.
        </div>
      </div>
    </footer>
  );
}
