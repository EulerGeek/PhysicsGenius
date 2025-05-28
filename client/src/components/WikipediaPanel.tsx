import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface WikipediaPanelProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

interface WikipediaContent {
  title: string;
  extract: string;
  url: string;
  thumbnail?: string;
}

export default function WikipediaPanel({ isOpen, onClose, initialQuery = "" }: WikipediaPanelProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [content, setContent] = useState<WikipediaContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Quantum Mechanics", "Einstein", "Newton's Laws", "General Relativity", "Particle Physics"
  ]);

  const fetchWikipediaContent = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Wikipedia API endpoint for getting page content
      const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
      
      const response = await fetch(searchUrl);
      
      if (!response.ok) {
        throw new Error('Article not found');
      }
      
      const data = await response.json();
      
      setContent({
        title: data.title,
        extract: data.extract,
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(data.title)}`,
        thumbnail: data.thumbnail?.source
      });

      // Add to recent searches if not already there
      if (!recentSearches.includes(query)) {
        setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
      }

    } catch (err) {
      setError('Could not fetch Wikipedia content. Please check your search term.');
      console.error('Wikipedia fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWikipediaContent(searchQuery);
  };

  const handleQuickSearch = (term: string) => {
    setSearchQuery(term);
    fetchWikipediaContent(term);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[90vh] bg-white dark:bg-gray-900 shadow-2xl">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              📚 Wikipedia Physics Reader
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕ Close
            </Button>
          </div>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2 mt-4">
            <Input
              type="text"
              placeholder="Search Wikipedia for physics topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "🔄" : "🔍"} Search
            </Button>
          </form>

          {/* Quick Search Buttons */}
          <div className="flex flex-wrap gap-2 mt-3">
            {recentSearches.map((term, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900"
                onClick={() => handleQuickSearch(term)}
              >
                {term}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-0 h-full">
          <ScrollArea className="h-[calc(90vh-200px)]">
            <div className="p-6">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                  <p className="text-red-700 dark:text-red-300">❌ {error}</p>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    Try searching for a different term or check your spelling.
                  </p>
                </div>
              )}

              {isLoading && (
                <div className="text-center py-8">
                  <div className="animate-spin text-4xl mb-4">🔄</div>
                  <p className="text-gray-600 dark:text-gray-400">Fetching Wikipedia content...</p>
                </div>
              )}

              {content && !isLoading && (
                <div className="space-y-4">
                  {/* Article Header */}
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <div className="flex items-start gap-4">
                      {content.thumbnail && (
                        <img
                          src={content.thumbnail}
                          alt={content.title}
                          className="w-24 h-24 object-cover rounded-lg shadow-md"
                        />
                      )}
                      <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                          {content.title}
                        </h1>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(content.url, '_blank')}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          🔗 View on Wikipedia
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                      {content.extract}
                    </p>
                  </div>

                  {/* Reading Tools */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      📖 Study Tools
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Text-to-speech functionality
                          if ('speechSynthesis' in window) {
                            window.speechSynthesis.cancel();
                            const utterance = new SpeechSynthesisUtterance(content.extract);
                            utterance.rate = 0.8;
                            window.speechSynthesis.speak(utterance);
                          }
                        }}
                        className="text-green-600 hover:text-green-700"
                      >
                        🔊 Read Aloud
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(content.extract);
                        }}
                        className="text-purple-600 hover:text-purple-700"
                      >
                        📋 Copy Text
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const printContent = `
                            <html>
                              <head><title>${content.title} - QUOMA Study Notes</title></head>
                              <body style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
                                <h1>${content.title}</h1>
                                <p style="line-height: 1.6;">${content.extract}</p>
                                <hr style="margin: 20px 0;">
                                <p style="font-size: 12px; color: #666;">
                                  Source: ${content.url}<br>
                                  Exported from QUOMA Physics Learning Platform
                                </p>
                              </body>
                            </html>
                          `;
                          const printWindow = window.open('', '_blank');
                          if (printWindow) {
                            printWindow.document.write(printContent);
                            printWindow.document.close();
                            printWindow.print();
                          }
                        }}
                        className="text-orange-600 hover:text-orange-700"
                      >
                        🖨️ Print Notes
                      </Button>
                    </div>
                  </div>

                  {/* Suggested Related Topics */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      🔗 Related Physics Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Physics", "Quantum Physics", "Classical Mechanics", "Thermodynamics", 
                        "Electromagnetic Field", "Special Relativity", "Particle Physics"
                      ].map((topic, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => handleQuickSearch(topic)}
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {!content && !isLoading && !error && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Welcome to Wikipedia Physics Reader!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Search for any physics topic to read Wikipedia content directly in QUOMA.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Features: Read aloud, copy text, print notes, and explore related topics!
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}