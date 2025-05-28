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
          <div className="max-w-lg mx-auto">
            <form onSubmit={handleFooterWikipediaSearch} className="relative">
              <Input
                type="text"
                placeholder="Search physics topics, scientists, theories..."
                value={footerSearchQuery}
                onChange={(e) => setFooterSearchQuery(e.target.value)}
                className="w-full pl-10 pr-20 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-center"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400 text-lg">📚</span>
              </div>
              <Button
                type="submit"
                size="sm"
                className="absolute inset-y-0 right-0 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg"
              >
                Search 🔍
              </Button>
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Instantly access Wikipedia articles about physics concepts, famous scientists, and discoveries
            </p>
          </div>
        </div>

        {/* Quick Physics Links */}
        <div className="mb-6 text-center">
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <button 
              onClick={() => {
                setFooterSearchQuery("Albert Einstein");
                setShowWikipediaPanel(true);
              }}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              Einstein 🧠
            </button>
            <button 
              onClick={() => {
                setFooterSearchQuery("Quantum mechanics");
                setShowWikipediaPanel(true);
              }}
              className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
            >
              Quantum Physics ⚛️
            </button>
            <button 
              onClick={() => {
                setFooterSearchQuery("General relativity");
                setShowWikipediaPanel(true);
              }}
              className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
            >
              Relativity 🌌
            </button>
            <button 
              onClick={() => {
                setFooterSearchQuery("Newton's laws of motion");
                setShowWikipediaPanel(true);
              }}
              className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
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
