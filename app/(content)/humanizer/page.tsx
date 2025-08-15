"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Sparkles, Copy, Download, FileText, Zap, Shield, Target } from "lucide-react"

function Humanizer() {
  const [inputText, setInputText] = useState(`Put your AI-generated text here to humanize it...`)
  
  const [outputText, setOutputText] = useState("Your humanized text will appear here")
  const [isLoading, setIsLoading] = useState(false)
  const [humanized, setHumanized] = useState(false)
  const [writingLevel, setWritingLevel] = useState("Intermediate")
  const [language, setLanguage] = useState("English")
  const [wordCount, setWordCount] = useState(60)
  const [wordsRemaining, setWordsRemaining] = useState(250)
  const [copied, setCopied] = useState(false)

  const handleHumanize = async () => {
    setIsLoading(true);
    setHumanized(false);
    try {
      const response = await fetch('/api/humanize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      setOutputText(data.text);
      setHumanized(true);
    } catch (error) {
      console.error('Error humanizing text:', error);
      setOutputText("Failed to humanize text. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateWordCount = (text: string) => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0)
    setWordCount(words.length)
    setInputText(text)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            AI Text Humanizer
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Transform AI-generated content into natural, human-like text.
          </p>
        </div>
      </div>

      {/* Controls Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-6">
              <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200 px-3 py-1.5 text-sm font-medium rounded-full">
                Free Plan
              </Badge>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">{wordsRemaining} words remaining</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">Writing Level</label>
                <div className="relative">
                  <select 
                    value={writingLevel}
                    onChange={(e) => setWritingLevel(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 pr-10 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 transition-all duration-200"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Professional</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">Language</label>
                <div className="relative">
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 pr-10 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 transition-all duration-200"
                  >
                    <option>English</option>
                    <option>English (UK)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                  
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Input Section */}
            <div className="group">
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-indigo-50 text-indigo-600 border border-indigo-100">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Input Text</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="relative">
                    <textarea
                      value={inputText}
                      onChange={(e) => updateWordCount(e.target.value)}
                      placeholder="Paste your AI-generated text here to humanize it..."
                      className="w-full h-80 p-6 border border-gray-200 rounded-lg text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 transition-all duration-200 bg-white"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-white rounded-md px-2.5 py-0.5 text-xs font-medium text-gray-600 border border-gray-200">
                        AI Text
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-600">Ready to humanize</span>
                    </div>
                    <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{wordCount} / 2000 words</span>
                  </div>
                  
                  <Button 
                    onClick={handleHumanize}
                    disabled={isLoading || !inputText.trim()}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-6 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="w-5 h-5 mr-3" />
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Humanizing...
                      </>
                    ) : (
                      "✨ Humanize Text"
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="group">
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-indigo-50 text-indigo-600 border border-indigo-100">
                      <Shield className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Authentic Humanized Output</h2>
                  </div>
                  
                  {humanized && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="rounded-md hover:bg-gray-50 transition-colors"
                        onClick={handleCopy}
                      >
                        {copied ? (
                          <div className="flex items-center gap-1">
                            <div className="w-4 h-4 text-emerald-600">✓</div>
                            <span className="text-xs text-emerald-600">Copied!</span>
                          </div>
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-md hover:bg-gray-50">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <div className="w-full h-80 p-6 bg-gray-50 border border-gray-200 rounded-lg text-sm leading-relaxed overflow-y-auto transition-all duration-200">
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-gray-600 font-medium">Processing your text...</p>
                        <p className="text-gray-500 text-xs mt-2">Humanizing your text...</p>
                      </div>
                    ) : humanized ? (
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">{outputText}</p>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-200/60">
                          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-semibold px-3.5 py-1.5 rounded-full border border-emerald-200">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            Humanized rewrite
                          </div>
                          <div className="text-xs text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200">
                            AI detection may vary
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-center">
                        <div className="space-y-3">
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                            <FileText className="w-8 h-8 text-gray-600" />
                          </div>
                          <p className="text-gray-500 font-medium">Your humanized text will appear here</p>
                          <p className="text-gray-400 text-xs">Paste your content and click humanize to get started</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {humanized && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-emerald-500 text-white rounded-md px-2.5 py-0.5 text-xs font-medium shadow-sm">
                        Humanized
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {/* Input Section - First on Mobile */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-md flex items-center justify-center bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <FileText className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Input Text</h2>
              </div>
              
              <div className="space-y-5">
                <div className="relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => updateWordCount(e.target.value)}
                    placeholder="Paste your AI-generated text here to humanize it..."
                    className="w-full h-64 p-4 border border-gray-200 rounded-lg text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 transition-all duration-200 bg-white"
                  />
                  <div className="absolute top-3 right-3">
                    <div className="bg-white rounded-md px-2 py-0.5 text-xs font-medium text-gray-600 border border-gray-200">
                      AI Text
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-600">Ready to humanize</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{wordCount} / 2000 words</span>
                </div>
                
                <Button 
                  onClick={handleHumanize}
                  disabled={isLoading || !inputText.trim()}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Humanizing...
                    </>
                  ) : (
                    "✨ Humanize Text"
                  )}
                </Button>
              </div>
            </div>

            {/* Output Section - Second on Mobile */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center bg-indigo-50 text-indigo-600 border border-indigo-100">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Authentic Humanized Output</h2>
                </div>
                
                {humanized && (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="rounded-md transition-colors"
                      onClick={handleCopy}
                    >
                      {copied ? (
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 text-emerald-600">✓</div>
                        </div>
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-md">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <div className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm leading-relaxed overflow-y-auto">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mb-3 animate-pulse">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-gray-600 font-medium">Processing...</p>
                      <p className="text-gray-500 text-xs mt-1">Making it human</p>
                    </div>
                  ) : humanized ? (
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">{outputText}</p>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-200/60">
                          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                            Humanized
                          </div>
                          <div className="text-xs text-gray-600 bg-white px-2 py-1 rounded-full border border-gray-200">
                            AI detection may vary
                          </div>
                        </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-center">
                      <div className="space-y-2">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                          <FileText className="w-6 h-6 text-gray-600" />
                        </div>
                        <p className="text-gray-500 font-medium text-sm">Your humanized text will appear here</p>
                        <p className="text-gray-400 text-xs">Paste content and humanize to start</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {humanized && (
                  <div className="absolute top-3 right-3">
                    <div className="bg-emerald-500 text-white rounded-md px-2 py-0.5 text-xs font-medium shadow-sm">
                      Humanized
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <div className="mt-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md flex items-center justify-center bg-indigo-50 text-indigo-600 border border-indigo-100">
                <Sparkles className="w-3 h-3" />
              </div>
              <span className="text-gray-900 font-medium">AI Humanizer</span>
            </div>
            <div className="text-gray-500 text-sm">
              © 2025 Writoma. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Humanizer