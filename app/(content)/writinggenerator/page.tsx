"use client";
import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

const ConfigureSettings = () => {
  const [prompt, setPrompt] = useState('dogs');
  const [essayType, setEssayType] = useState('General');
  const [writingLevel, setWritingLevel] = useState('Intermediate');
  const [paragraphs, setParagraphs] = useState('2');
  const [language, setLanguage] = useState('English (US)');
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);

  const essayTypes = ['General', 'Argumentative', 'Narrative', 'Descriptive', 'Expository'];
  const writingLevels = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];
  const paragraphOptions = ['1', '2', '3', '4', '5', '6+'];
  const languages = ['English (US)', 'English (UK)', 'Spanish', 'French', 'German'];

  const handleGenerate = async () => {
    setLoading(true);
    setGeneratedText('');
    const detailedPrompt = `
      Essay Type: ${essayType}
      Writing Level: ${writingLevel}
      Number of Paragraphs: ${paragraphs}
      Language: ${language}
      Prompt: ${prompt}
      ---
      Generate an essay based on the above requirements. It should be written in the style of an SEO writer.
    `;
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: detailedPrompt }),
    });
    const data = await response.json();
    setGeneratedText(data.text);
    setLoading(false);
  };

  const handleGoBack = () => {
    setGeneratedText('');
  };

  const CustomSelect = ({ value, onChange, options, placeholder }: { value: string, onChange: (value: string) => void, options: string[], placeholder: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          type="button"
          className="w-full px-3 py-2 text-left bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-gray-900">{value || placeholder}</span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-md last:rounded-b-md"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-96">
          <Sparkles className="h-12 w-12 text-blue-500 animate-spin" />
          <p className="mt-4 text-lg text-gray-600">Generating your essay...</p>
        </div>
      ) : generatedText ? (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Your Generated Essay</h2>
          <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
            <p className="text-gray-800 whitespace-pre-wrap">{generatedText}</p>
          </div>
          <button
            onClick={handleGoBack}
            className="mt-6 w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
          >
            Go Back & Start Again
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Configure your settings</h1>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-900">
                  Describe your prompt or outline
                </label>
                <span className="text-sm text-gray-500">
                  {prompt.split(' ').length} / 200 words
                </span>
              </div>
              <textarea
                id="prompt"
                rows={6}
                className="w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt or outline..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Essay Type
                </label>
                <CustomSelect
                  value={essayType}
                  onChange={setEssayType}
                  options={essayTypes}
                  placeholder="Select essay type"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Writing Level
                </label>
                <CustomSelect
                  value={writingLevel}
                  onChange={setWritingLevel}
                  options={writingLevels}
                  placeholder="Select writing level"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Number of Paragraphs
                </label>
                <CustomSelect
                  value={paragraphs}
                  onChange={setParagraphs}
                  options={paragraphOptions}
                  placeholder="Select paragraphs"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Language
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🇺🇸</span>
                      <span className="text-gray-900">{language}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
                onClick={handleGenerate}
              >
                <Sparkles className="h-4 w-4" />
                <span>Generate Paragraph</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ConfigureSettings;
