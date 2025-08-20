"use client"

import React, { useMemo, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ChevronDown, Sparkles, Copy, Download, FileText, Zap, Shield, Target } from "lucide-react"

// AI Detection Gauge Component
interface AIDetectionGaugeProps {
  aiProbability: number
  verdict: string
}

const AIDetectionGauge: React.FC<AIDetectionGaugeProps> = ({ aiProbability, verdict }) => {
  // Calculate the rotation for the needle (gauge goes from -90 to 90 degrees)
  const needleRotation = -90 + (aiProbability / 100) * 180

  // Determine colors based on AI probability
  const getStatusColor = (percentage: number) => {
    if (percentage >= 80) return '#ef4444' // red-500
    if (percentage >= 60) return '#f59e0b' // amber-500  
    if (percentage >= 40) return '#eab308' // yellow-500
    if (percentage >= 20) return '#84cc16' // lime-500
    return '#22c55e' // green-500
  }

  const statusColor = getStatusColor(aiProbability)

  // Create gradient stops for the gauge
  const createGradient = () => {
    return `conic-gradient(
      from 180deg at 50% 50%,
      #22c55e 0deg,
      #84cc16 36deg,
      #eab308 72deg,
      #f59e0b 108deg,
      #ef4444 144deg,
      #ef4444 180deg
    )`
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white">
      <div className="text-lg font-semibold text-gray-700 mb-2">
        Your Text is {verdict}
      </div>
      
      {/* Gauge Container */}
      <div className="relative w-64 h-32 mb-4">
        {/* Gauge Background */}
        <div 
          className="absolute inset-0 rounded-t-full border-8 border-gray-200"
          style={{
            background: createGradient(),
            clipPath: 'polygon(0 100%, 0 0, 100% 0, 100% 100%)'
          }}
        />
        
        {/* White center overlay to create gauge effect */}

        
        {/* Needle */}
        <div 
          className="absolute bottom-0 left-1/2 origin-bottom w-1 h-24 bg-gray-800 rounded-full transform -translate-x-1/2 transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(-50%) rotate(${needleRotation}deg)` }}
        />
        
        {/* Center dot */}
        <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-gray-800 rounded-full transform -translate-x-1/2 translate-y-2" />
        
        {/* Percentage labels */}
        <div className="absolute bottom-2 left-2 text-xs font-medium text-gray-500">0%</div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-500">50%</div>
        <div className="absolute bottom-2 right-2 text-xs font-medium text-gray-500">100%</div>
      </div>
      
      {/* Result Display */}
      <div className="text-center">
        <div 
          className="inline-flex items-center justify-center w-20 h-20 rounded-full text-white text-2xl font-bold mb-2"
          style={{ backgroundColor: statusColor }}
        >
          {Math.round(aiProbability)}%
        </div>
        <div className="text-lg font-semibold" style={{ color: statusColor }}>
          AI GPT*
        </div>
      </div>
    </div>
  )
}

function AiDetector() {
  type DetectionResult = {
    verdict: string
    aiProbability: number
    confidence: number
    reasons: string[]
    summary: string
    advice: string
    raw?: string
  }
  const [inputText, setInputText] = useState(``)
  
  const [outputText, setOutputText] = useState("Detection result will appear here")
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [humanized, setHumanized] = useState(false)
  const [language, setLanguage] = useState("English")
  const [wordCount, setWordCount] = useState(60)
  const [copied, setCopied] = useState(false)

  const handleDetect = async () => {
    setIsLoading(true);
    setHumanized(false);
    try {
      const response = await fetch('/api/aidetect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();

      if (data?.error) {
        throw new Error(data.error);
      }

      const detection: DetectionResult = {
        verdict: data?.verdict ?? 'Unknown',
        aiProbability: Number(data?.aiProbability ?? 0),
        confidence: Number(data?.confidence ?? 0),
        reasons: Array.isArray(data?.reasons) ? data.reasons : [],
        summary: data?.summary ?? '',
        advice: data?.advice ?? '',
        raw: data?.raw,
      }

      setResult(detection);

      const copyText = `Verdict: ${detection.verdict}\nAI Probability: ${detection.aiProbability}%\nConfidence: ${detection.confidence}%\nReasons: ${detection.reasons.join('; ')}\nSummary: ${detection.summary}\nAdvice: ${detection.advice}`
      setOutputText(copyText);
      setHumanized(true);
    } catch (error) {
      console.error('Error detecting AI:', error);
      setOutputText("Failed to detect AI. Please try again.");
      setResult(null);
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

  const verdictStyles = useMemo(() => {
    const aiPct = result?.aiProbability ?? 0
    if (aiPct >= 70) {
      return {
        badge: "bg-rose-100 text-rose-700 border-rose-200",
        bar: "bg-rose-500",
      }
    }
    if (aiPct >= 40) {
      return {
        badge: "bg-amber-100 text-amber-700 border-amber-200",
        bar: "bg-amber-500",
      }
    }
    return {
      badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
      bar: "bg-emerald-500",
    }
  }, [result])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            AI Text Detector
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Analyze text to detect AI-generated content.
          </p>
        </div>
      </div>

      {/* Controls Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Ready</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
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
                      placeholder="Paste your text here to analyze for AI usage..."
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
                      <span className="text-sm font-medium text-gray-600">Ready to detect</span>
                    </div>
                    <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{wordCount} words</span>
                  </div>
                  
                  <Button 
                    onClick={handleDetect}
                    disabled={isLoading || !inputText.trim()}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-6 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="w-5 h-5 mr-3" />
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Detecting...
                      </>
                    ) : (
                      "Detect AI"
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="group">
              <div className="bg-white rounded-xl border border-gray-200 p-0 shadow-sm">
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-indigo-50 text-indigo-600 border border-indigo-100">
                          <Shield className="w-5 h-5" />
                        </div>
                        <CardTitle>Detection Result</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center h-64 text-center">
                        <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-gray-600 font-medium">Analyzing your text...</p>
                        <p className="text-gray-500 text-xs mt-2">Detecting AI usage...</p>
                      </div>
                    ) : humanized && result ? (
                      <>
                        {/* AI Detection Gauge */}
                        <AIDetectionGauge 
                          aiProbability={result.aiProbability} 
                          verdict={result.verdict}
                        />
                        
                        {/* Additional Details */}
                        <div className="space-y-6 mt-6">
                          {result.summary && (
                            <div>
                              <div className="text-sm font-semibold text-gray-900 mb-1">Summary</div>
                              <p className="text-sm text-gray-700 leading-relaxed">{result.summary}</p>
                            </div>
                          )}

                          {result.reasons?.length > 0 && (
                            <div>
                              <div className="text-sm font-semibold text-gray-900 mb-2">Reasons</div>
                              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                {result.reasons.map((r, idx) => (
                                  <li key={idx}>{r}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {result.advice && (
                            <div className="rounded-lg border border-gray-200 p-4 bg-gray-50">
                              <div className="text-sm font-semibold text-gray-900 mb-1">Advice</div>
                              <p className="text-sm text-gray-700 leading-relaxed">{result.advice}</p>
                            </div>
                          )}

                          <Separator className="my-2" />
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
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-64 text-center">
                        <div className="space-y-3">
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                            <FileText className="w-8 h-8 text-gray-600" />
                          </div>
                          <p className="text-gray-500 font-medium">Detection result will appear here</p>
                          <p className="text-gray-400 text-xs">Paste your content and click detect to get started</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
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
                    placeholder="Paste your text here to analyze for AI usage..."
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
                    <span className="text-sm font-medium text-gray-600">Ready to detect</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{wordCount} / 2000 words</span>
                </div>
                
                <Button 
                  onClick={handleDetect}
                  disabled={isLoading || !inputText.trim()}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Detecting...
                    </>
                  ) : (
                    "Detect AI"
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
                  <h2 className="text-lg font-bold text-gray-900">Detection Result</h2>
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
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mb-3 animate-pulse">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-gray-600 font-medium">Analyzing...</p>
                    <p className="text-gray-500 text-xs mt-1">Detecting AI usage</p>
                  </div>
                ) : humanized && result ? (
                  <div className="space-y-4">
                    <AIDetectionGauge 
                      aiProbability={result.aiProbability} 
                      verdict={result.verdict}
                    />
                    
                    {result.summary && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm font-semibold text-gray-900 mb-1">Summary</div>
                        <p className="text-sm text-gray-700 leading-relaxed">{result.summary}</p>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200/60">
                      <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        Detection Complete
                      </div>
                      <div className="text-xs text-gray-600 bg-white px-2 py-1 rounded-full border border-gray-200">
                        Completed
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-center">
                    <div className="space-y-2">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                        <FileText className="w-6 h-6 text-gray-600" />
                      </div>
                      <p className="text-gray-500 font-medium text-sm">Detection result will appear here</p>
                      <p className="text-gray-400 text-xs">Paste content and detect to start</p>
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
              <span className="text-gray-900 font-medium">AI Detector</span>
            </div>
            <div className="text-gray-500 text-sm">
              © 2024 AI Detector. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AiDetector