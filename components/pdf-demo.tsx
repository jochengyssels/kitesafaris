'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Image, Palette } from 'lucide-react';
import { generateVisualPDF, generateFullPageVisualPDF } from '@/lib/visual-pdf-generator';

export default function PDFDemo() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateContentPDF = async () => {
    setIsGenerating(true);
    try {
      await generateVisualPDF('demo-content', {
        filename: 'kitesafaris-demo-content.pdf',
        quality: 0.98,
        scale: 2,
        format: 'A4',
        includeLogo: true,
        logoPosition: 'top-right',
        showPageNumbers: true,
        showTimestamp: true
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateFullPagePDF = async () => {
    setIsGenerating(true);
    try {
      await generateFullPageVisualPDF({
        filename: 'kitesafaris-full-page.pdf',
        quality: 0.98,
        scale: 2,
        format: 'A4',
        includeLogo: true,
        logoPosition: 'top-right',
        showPageNumbers: true,
        showTimestamp: true
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Visual PDF Generation Demo
          </h1>
          <p className="text-xl text-gray-600">
            Experience high-fidelity PDF generation that captures the complete visual appearance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Content Area PDF</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Generate a PDF from a specific content area with perfect visual fidelity.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerateContentPDF}
              disabled={isGenerating}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              {isGenerating ? 'Generating...' : 'Generate Content PDF'}
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <Image className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Full Page PDF</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Capture the entire page with all visual elements, layouts, and styling.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerateFullPagePDF}
              disabled={isGenerating}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              {isGenerating ? 'Generating...' : 'Generate Full Page PDF'}
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          id="demo-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-lg pdf-capture"
        >
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-8 h-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Sample Content</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Gradient Background</h3>
              <p className="text-blue-100">
                This content includes gradients, custom colors, and visual effects that will be preserved in the PDF.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Another Gradient</h3>
              <p className="text-green-100">
                Multiple gradient backgrounds and complex styling will be captured with high fidelity.
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Features Preserved:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Complete visual layout and positioning
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                All colors, gradients, and backgrounds
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Typography and font rendering
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Images and visual elements
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Interactive elements in current state
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
