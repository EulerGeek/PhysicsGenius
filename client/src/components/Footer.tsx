import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import WikipediaPanel from "./WikipediaPanel";

export default function Footer() {
  const [footerSearchQuery, setFooterSearchQuery] = useState("");
  const [showWikipediaPanel, setShowWikipediaPanel] = useState(false);

  const handleFooterWikipediaSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (footerSearchQuery.trim()) {
      setShowWikipediaPanel(true);
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Wikipedia Search Section */}
        <div className="mb-8 text-center">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
            🔍 Explore Physics on Wikipedia
          </h3>
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleFooterWikipediaSearch} className="relative group">
              <Input
                type="text"
                placeholder="Discover physics knowledge: Einstein, Quantum Theory, Black Holes..."
                value={footerSearchQuery}
                onChange={(e) => setFooterSearchQuery(e.target.value)}
                className="w-full pl-14 pr-24 py-4 text-center border-2 border-gray-300 dark:border-gray-500 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 bg-white transition-all duration-200 group-hover:border-blue-300 dark:group-hover:border-blue-400 shadow-lg dark:shadow-gray-900/20 text-sm font-medium"
              />
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <span className="text-blue-600 dark:text-blue-400 text-xl">📚</span>
              </div>
              <Button
                type="submit"
                size="sm"
                className="absolute inset-y-0 right-2 my-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl flex items-center justify-center"
              >
                <span className="text-xl">🔍</span>
              </Button>
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Instantly access Wikipedia articles about physics concepts, famous scientists, and discoveries
            </p>
          </div>
        </div>

        {/* Quick Physics Links */}
        <div className="mb-6 text-center">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <button 
              onClick={() => {
                setFooterSearchQuery("Albert Einstein");
                setShowWikipediaPanel(true);
              }}
              className="px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
            >
              Einstein 🧠
            </button>
            <button 
              onClick={() => {
                setFooterSearchQuery("Quantum mechanics");
                setShowWikipediaPanel(true);
              }}
              className="px-5 py-3 bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 dark:hover:from-purple-700 dark:hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
            >
              Quantum Physics ⚛️
            </button>
            <button 
              onClick={() => {
                setFooterSearchQuery("General relativity");
                setShowWikipediaPanel(true);
              }}
              className="px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white rounded-xl hover:from-green-600 hover:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
            >
              Relativity 🌌
            </button>
            <button 
              onClick={() => {
                setFooterSearchQuery("Newton's laws of motion");
                setShowWikipediaPanel(true);
              }}
              className="px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
            >
              Newton's Laws 🍎
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-atom text-white text-sm"></i>
            </div>
            <div>
              <div className="font-bold text-neutral-900 dark:text-white">QUOMA</div>
              <div className="text-xs text-neutral-500 dark:text-gray-400">Making physics fun and intuitive</div>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm text-neutral-600 dark:text-gray-400">
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Terms</a>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-xs text-neutral-500 dark:text-gray-400">
          © 2024 QUOMA. Free physics education for everyone. 🚀 Explore the universe of knowledge!
        </div>
      </div>

      <WikipediaPanel
        isOpen={showWikipediaPanel}
        onClose={() => setShowWikipediaPanel(false)}
        initialQuery={footerSearchQuery}
      />
    </footer>
  );
}
