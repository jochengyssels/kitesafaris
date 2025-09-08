import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface VisualPDFOptions {
  filename?: string;
  quality?: number;
  scale?: number;
  format?: 'A4' | 'A3' | 'Letter' | 'Legal';
  orientation?: 'portrait' | 'landscape';
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  includeLogo?: boolean;
  logoPath?: string;
  logoPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  logoSize?: number;
  showPageNumbers?: boolean;
  showTimestamp?: boolean;
}

export class VisualPDFGenerator {
  private options: VisualPDFOptions;

  constructor(options: VisualPDFOptions = {}) {
    this.options = {
      filename: `kitesafaris-content-${new Date().toISOString().split('T')[0]}.pdf`,
      quality: 0.98,
      scale: 2, // High DPI for crisp images
      format: 'A4',
      orientation: 'portrait',
      margin: { top: 20, right: 20, bottom: 20, left: 20 },
      includeLogo: true,
      logoPath: '/kitesafaris-zebra-logo.png',
      logoPosition: 'top-right',
      logoSize: 40,
      showPageNumbers: true,
      showTimestamp: true,
      ...options
    };
  }

  private async addLogoToPDF(pdf: jsPDF, pageNumber: number = 1): Promise<void> {
    if (!this.options.includeLogo) return;

    try {
      const logoImg = new Image();
      logoImg.crossOrigin = 'anonymous';
      
      return new Promise<void>((resolve) => {
        const timeout = setTimeout(() => {
          console.warn('Logo loading timeout');
          resolve();
        }, 5000);

        logoImg.onload = () => {
          clearTimeout(timeout);
          try {
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const logoSize = this.options.logoSize!;
            const margin = this.options.margin!;
            
            let x: number, y: number;
            
            switch (this.options.logoPosition) {
              case 'top-left':
                x = margin.left;
                y = margin.top;
                break;
              case 'top-right':
                x = pageWidth - logoSize - margin.right;
                y = margin.top;
                break;
              case 'bottom-left':
                x = margin.left;
                y = pageHeight - logoSize - margin.bottom;
                break;
              case 'bottom-right':
                x = pageWidth - logoSize - margin.right;
                y = pageHeight - logoSize - margin.bottom;
                break;
              default:
                x = pageWidth - logoSize - margin.right;
                y = margin.top;
            }

            const aspectRatio = logoImg.height / logoImg.width;
            const logoHeight = logoSize * aspectRatio;

            pdf.addImage(logoImg, 'PNG', x, y, logoSize, logoHeight);
            resolve();
          } catch (error) {
            console.warn('Error adding logo to PDF:', error);
            resolve();
          }
        };
        
        logoImg.onerror = () => {
          clearTimeout(timeout);
          console.warn('Could not load logo image from:', this.options.logoPath);
          resolve();
        };
        
        logoImg.src = this.options.logoPath!;
      });
    } catch (error) {
      console.warn('Error adding logo:', error);
    }
  }

  private addPageFooter(pdf: jsPDF, pageNumber: number, totalPages: number): void {
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = this.options.margin!;

    // Page number
    if (this.options.showPageNumbers) {
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(128, 128, 128);
      pdf.text(`Page ${pageNumber} of ${totalPages}`, pageWidth / 2, pageHeight - margin.bottom / 2, { align: 'center' });
    }

    // Timestamp
    if (this.options.showTimestamp && pageNumber === 1) {
      const timestamp = new Date().toLocaleString();
      pdf.setFontSize(8);
      pdf.setTextColor(160, 160, 160);
      pdf.text(`Generated on ${timestamp}`, margin.left, pageHeight - margin.bottom / 2);
    }

    // Company branding
    pdf.setFontSize(8);
    pdf.setTextColor(100, 150, 200);
    pdf.text('Kitesafaris - Ultimate Kiteboarding Adventures', pageWidth - margin.right, pageHeight - margin.bottom / 2, { align: 'right' });
  }

  private async captureElement(element: HTMLElement): Promise<HTMLCanvasElement> {
    // Add print-friendly class temporarily
    element.classList.add('pdf-capture');
    
    // Fix oklch color compatibility by temporarily converting to rgb
    const fixColorCompatibility = () => {
      const style = document.createElement('style');
      style.id = 'pdf-color-fix';
      style.textContent = `
        /* Global oklch color override - must be first */
        * {
          color: rgb(var(--fallback-color, 0 0 0)) !important;
          background-color: rgb(var(--fallback-bg, 255 255 255)) !important;
          border-color: rgb(var(--fallback-border, 0 0 0)) !important;
        }
        
        /* Convert oklch colors to rgb for html2canvas compatibility */
        .pdf-capture * {
          color: inherit !important;
          background-color: inherit !important;
          border-color: inherit !important;
        }
        
        /* Override problematic oklch colors with fallback rgb values */
        .pdf-capture .bg-gradient-to-r,
        .pdf-capture .bg-gradient-to-br,
        .pdf-capture .bg-gradient-to-t {
          background: linear-gradient(to right, #1e40af, #0891b2) !important;
        }
        
        .pdf-capture .from-navy-900 {
          background-color: #0f172a !important;
        }
        
        .pdf-capture .via-blue-900 {
          background-color: #1e3a8a !important;
        }
        
        .pdf-capture .to-cyan-800 {
          background-color: #155e75 !important;
        }
        
        .pdf-capture .from-blue-600 {
          background-color: #2563eb !important;
        }
        
        .pdf-capture .to-cyan-600 {
          background-color: #0891b2 !important;
        }
        
        .pdf-capture .text-white {
          color: #ffffff !important;
        }
        
        .pdf-capture .text-gray-900 {
          color: #111827 !important;
        }
        
        .pdf-capture .text-gray-600 {
          color: #4b5563 !important;
        }
        
        .pdf-capture .text-cyan-100 {
          color: #cffafe !important;
        }
        
        .pdf-capture .border-white {
          border-color: #ffffff !important;
        }
        
        .pdf-capture .bg-white {
          background-color: #ffffff !important;
        }
        
        .pdf-capture .bg-slate-50 {
          background-color: #f8fafc !important;
        }
        
        .pdf-capture .bg-blue-50 {
          background-color: #eff6ff !important;
        }
        
        .pdf-capture .bg-cyan-50 {
          background-color: #ecfeff !important;
        }
        
        /* Additional color overrides for common Tailwind classes */
        .pdf-capture .text-gray-800 { color: #1f2937 !important; }
        .pdf-capture .text-gray-700 { color: #374151 !important; }
        .pdf-capture .text-gray-500 { color: #6b7280 !important; }
        .pdf-capture .text-gray-400 { color: #9ca3af !important; }
        .pdf-capture .text-gray-300 { color: #d1d5db !important; }
        .pdf-capture .text-gray-200 { color: #e5e7eb !important; }
        .pdf-capture .text-gray-100 { color: #f3f4f6 !important; }
        
        .pdf-capture .bg-gray-900 { background-color: #111827 !important; }
        .pdf-capture .bg-gray-800 { background-color: #1f2937 !important; }
        .pdf-capture .bg-gray-700 { background-color: #374151 !important; }
        .pdf-capture .bg-gray-600 { background-color: #4b5563 !important; }
        .pdf-capture .bg-gray-500 { background-color: #6b7280 !important; }
        .pdf-capture .bg-gray-400 { background-color: #9ca3af !important; }
        .pdf-capture .bg-gray-300 { background-color: #d1d5db !important; }
        .pdf-capture .bg-gray-200 { background-color: #e5e7eb !important; }
        .pdf-capture .bg-gray-100 { background-color: #f3f4f6 !important; }
        
        .pdf-capture .bg-blue-900 { background-color: #1e3a8a !important; }
        .pdf-capture .bg-blue-800 { background-color: #1e40af !important; }
        .pdf-capture .bg-blue-700 { background-color: #1d4ed8 !important; }
        .pdf-capture .bg-blue-500 { background-color: #3b82f6 !important; }
        .pdf-capture .bg-blue-400 { background-color: #60a5fa !important; }
        .pdf-capture .bg-blue-300 { background-color: #93c5fd !important; }
        .pdf-capture .bg-blue-200 { background-color: #bfdbfe !important; }
        .pdf-capture .bg-blue-100 { background-color: #dbeafe !important; }
        
        .pdf-capture .bg-cyan-900 { background-color: #164e63 !important; }
        .pdf-capture .bg-cyan-800 { background-color: #155e75 !important; }
        .pdf-capture .bg-cyan-700 { background-color: #0e7490 !important; }
        .pdf-capture .bg-cyan-500 { background-color: #06b6d4 !important; }
        .pdf-capture .bg-cyan-400 { background-color: #22d3ee !important; }
        .pdf-capture .bg-cyan-300 { background-color: #67e8f9 !important; }
        .pdf-capture .bg-cyan-200 { background-color: #a5f3fc !important; }
        .pdf-capture .bg-cyan-100 { background-color: #cffafe !important; }
        
        .pdf-capture .bg-slate-900 { background-color: #0f172a !important; }
        .pdf-capture .bg-slate-800 { background-color: #1e293b !important; }
        .pdf-capture .bg-slate-700 { background-color: #334155 !important; }
        .pdf-capture .bg-slate-600 { background-color: #475569 !important; }
        .pdf-capture .bg-slate-500 { background-color: #64748b !important; }
        .pdf-capture .bg-slate-400 { background-color: #94a3b8 !important; }
        .pdf-capture .bg-slate-300 { background-color: #cbd5e1 !important; }
        .pdf-capture .bg-slate-200 { background-color: #e2e8f0 !important; }
        .pdf-capture .bg-slate-100 { background-color: #f1f5f9 !important; }
        
        /* Force all elements to use RGB colors */
        .pdf-capture * {
          color: inherit !important;
          background-color: inherit !important;
          border-color: inherit !important;
          box-shadow: none !important;
        }
      `;
      document.head.appendChild(style);
      return style;
    };

    const removeColorFix = (style: HTMLStyleElement) => {
      if (style && style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };

    // Apply color fix
    const colorFixStyle = fixColorCompatibility();
    
    // Add global CSS custom properties to override oklch
    const addGlobalColorOverrides = () => {
      const rootStyle = document.createElement('style');
      rootStyle.id = 'pdf-global-color-override';
      rootStyle.textContent = `
        :root {
          --fallback-color: 0 0 0;
          --fallback-bg: 255 255 255;
          --fallback-border: 0 0 0;
        }
        
        /* Force all elements to use RGB values */
        * {
          color: rgb(var(--fallback-color)) !important;
          background-color: rgb(var(--fallback-bg)) !important;
          border-color: rgb(var(--fallback-border)) !important;
        }
        
        /* Specific overrides for common elements */
        body, html {
          background-color: rgb(255 255 255) !important;
          color: rgb(0 0 0) !important;
        }
      `;
      document.head.appendChild(rootStyle);
      return rootStyle;
    };

    const removeGlobalColorOverrides = (style: HTMLStyleElement) => {
      if (style && style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };

    // Apply global color overrides
    const globalColorStyle = addGlobalColorOverrides();
    
    try {
      const canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff', // Use white background instead of null
        scale: this.options.scale,
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        scrollX: 0,
        scrollY: 0,
        // Ensure all visual elements are captured
        foreignObjectRendering: true,
        removeContainer: false,
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          // Ensure all styles are preserved in the cloned document
          const clonedElement = clonedDoc.querySelector('.pdf-capture') as HTMLElement;
          if (clonedElement) {
            // Force print-friendly styles
            clonedElement.style.webkitPrintColorAdjust = 'exact';
            clonedElement.style.colorAdjust = 'exact';
            clonedElement.style.printColorAdjust = 'exact';
          }
          
          // Add the color fix to the cloned document as well
          const clonedStyle = clonedDoc.createElement('style');
          clonedStyle.textContent = colorFixStyle.textContent;
          clonedDoc.head.appendChild(clonedStyle);
        }
      });

      // Remove the temporary class and color fix
      element.classList.remove('pdf-capture');
      removeColorFix(colorFixStyle);
      removeGlobalColorOverrides(globalColorStyle);
      
      return canvas;
    } catch (error) {
      // Clean up on error
      element.classList.remove('pdf-capture');
      removeColorFix(colorFixStyle);
      removeGlobalColorOverrides(globalColorStyle);
      throw error;
    }
  }

  private calculatePageDimensions(): { width: number; height: number } {
    const margin = this.options.margin!;
    let pageWidth: number, pageHeight: number;

    switch (this.options.format) {
      case 'A3':
        pageWidth = 297;
        pageHeight = 420;
        break;
      case 'Letter':
        pageWidth = 216;
        pageHeight = 279;
        break;
      case 'Legal':
        pageWidth = 216;
        pageHeight = 356;
        break;
      case 'A4':
      default:
        pageWidth = 210;
        pageHeight = 297;
        break;
    }

    if (this.options.orientation === 'landscape') {
      [pageWidth, pageHeight] = [pageHeight, pageWidth];
    }

    return {
      width: pageWidth - margin.left - margin.right,
      height: pageHeight - margin.top - margin.bottom
    };
  }

  async generateVisualPDF(elementId: string, options: Partial<VisualPDFOptions> = {}): Promise<void> {
    // Merge options
    this.options = { ...this.options, ...options };

    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    try {
      // Show loading state
      this.showLoadingState();

      // Capture the element as canvas
      const canvas = await this.captureElement(element);
      const imgData = canvas.toDataURL('image/png', this.options.quality);

      // Calculate dimensions
      const pageDims = this.calculatePageDimensions();
      const imgWidth = pageDims.width;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF
      const pdf = new jsPDF({
        orientation: this.options.orientation,
        unit: 'mm',
        format: this.options.format
      });

      // Calculate how many pages we need
      const pageHeight = pageDims.height;
      const totalPages = Math.ceil(imgHeight / pageHeight);

      let position = 0;
      let pageNumber = 1;

      // Add first page
      pdf.addImage(imgData, 'PNG', this.options.margin!.left, this.options.margin!.top, imgWidth, imgHeight);
      
      // Add logo and footer to first page
      await this.addLogoToPDF(pdf, pageNumber);
      this.addPageFooter(pdf, pageNumber, totalPages);

      // Add additional pages if needed
      while (position + pageHeight < imgHeight) {
        position += pageHeight;
        pageNumber++;
        
        pdf.addPage();
        
        // Add the next portion of the image
        const sourceY = position * (canvas.height / imgHeight);
        const sourceHeight = Math.min(pageHeight * (canvas.height / imgHeight), canvas.height - sourceY);
        
        // Create a temporary canvas for this page slice
        const pageCanvas = document.createElement('canvas');
        const pageCtx = pageCanvas.getContext('2d')!;
        pageCanvas.width = canvas.width;
        pageCanvas.height = sourceHeight;
        
        pageCtx.drawImage(canvas, 0, sourceY, canvas.width, sourceHeight, 0, 0, canvas.width, sourceHeight);
        const pageImgData = pageCanvas.toDataURL('image/png', this.options.quality);
        
        pdf.addImage(pageImgData, 'PNG', this.options.margin!.left, this.options.margin!.top, imgWidth, pageHeight);
        
        // Add logo and footer to this page
        await this.addLogoToPDF(pdf, pageNumber);
        this.addPageFooter(pdf, pageNumber, totalPages);
      }

      // Save the PDF
      pdf.save(this.options.filename);

    } catch (error) {
      console.error('Error generating visual PDF:', error);
      throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      this.hideLoadingState();
    }
  }

  async generateFullPagePDF(options: Partial<VisualPDFOptions> = {}): Promise<void> {
    // Merge options
    this.options = { ...this.options, ...options };

    try {
      // Show loading state
      this.showLoadingState();

      // Fix oklch color compatibility
      const fixColorCompatibility = () => {
        const style = document.createElement('style');
        style.id = 'pdf-color-fix-fullpage';
        style.textContent = `
          /* Convert oklch colors to rgb for html2canvas compatibility */
          * {
            color: inherit !important;
            background-color: inherit !important;
            border-color: inherit !important;
          }
          
          /* Override problematic oklch colors with fallback rgb values */
          .bg-gradient-to-r,
          .bg-gradient-to-br,
          .bg-gradient-to-t {
            background: linear-gradient(to right, #1e40af, #0891b2) !important;
          }
          
          .from-navy-900 {
            background-color: #0f172a !important;
          }
          
          .via-blue-900 {
            background-color: #1e3a8a !important;
          }
          
          .to-cyan-800 {
            background-color: #155e75 !important;
          }
          
          .from-blue-600 {
            background-color: #2563eb !important;
          }
          
          .to-cyan-600 {
            background-color: #0891b2 !important;
          }
          
          .text-white {
            color: #ffffff !important;
          }
          
          .text-gray-900 {
            color: #111827 !important;
          }
          
          .text-gray-600 {
            color: #4b5563 !important;
          }
          
          .text-cyan-100 {
            color: #cffafe !important;
          }
          
          .border-white {
            border-color: #ffffff !important;
          }
          
          .bg-white {
            background-color: #ffffff !important;
          }
          
          .bg-slate-50 {
            background-color: #f8fafc !important;
          }
          
          .bg-blue-50 {
            background-color: #eff6ff !important;
          }
          
          .bg-cyan-50 {
            background-color: #ecfeff !important;
          }
          
          /* Additional color overrides for common Tailwind classes */
          .text-gray-800 { color: #1f2937 !important; }
          .text-gray-700 { color: #374151 !important; }
          .text-gray-500 { color: #6b7280 !important; }
          .text-gray-400 { color: #9ca3af !important; }
          .text-gray-300 { color: #d1d5db !important; }
          .text-gray-200 { color: #e5e7eb !important; }
          .text-gray-100 { color: #f3f4f6 !important; }
          
          .bg-gray-900 { background-color: #111827 !important; }
          .bg-gray-800 { background-color: #1f2937 !important; }
          .bg-gray-700 { background-color: #374151 !important; }
          .bg-gray-600 { background-color: #4b5563 !important; }
          .bg-gray-500 { background-color: #6b7280 !important; }
          .bg-gray-400 { background-color: #9ca3af !important; }
          .bg-gray-300 { background-color: #d1d5db !important; }
          .bg-gray-200 { background-color: #e5e7eb !important; }
          .bg-gray-100 { background-color: #f3f4f6 !important; }
          
          .bg-blue-900 { background-color: #1e3a8a !important; }
          .bg-blue-800 { background-color: #1e40af !important; }
          .bg-blue-700 { background-color: #1d4ed8 !important; }
          .bg-blue-500 { background-color: #3b82f6 !important; }
          .bg-blue-400 { background-color: #60a5fa !important; }
          .bg-blue-300 { background-color: #93c5fd !important; }
          .bg-blue-200 { background-color: #bfdbfe !important; }
          .bg-blue-100 { background-color: #dbeafe !important; }
          
          .bg-cyan-900 { background-color: #164e63 !important; }
          .bg-cyan-800 { background-color: #155e75 !important; }
          .bg-cyan-700 { background-color: #0e7490 !important; }
          .bg-cyan-500 { background-color: #06b6d4 !important; }
          .bg-cyan-400 { background-color: #22d3ee !important; }
          .bg-cyan-300 { background-color: #67e8f9 !important; }
          .bg-cyan-200 { background-color: #a5f3fc !important; }
          .bg-cyan-100 { background-color: #cffafe !important; }
          
          .bg-slate-900 { background-color: #0f172a !important; }
          .bg-slate-800 { background-color: #1e293b !important; }
          .bg-slate-700 { background-color: #334155 !important; }
          .bg-slate-600 { background-color: #475569 !important; }
          .bg-slate-500 { background-color: #64748b !important; }
          .bg-slate-400 { background-color: #94a3b8 !important; }
          .bg-slate-300 { background-color: #cbd5e1 !important; }
          .bg-slate-200 { background-color: #e2e8f0 !important; }
          .bg-slate-100 { background-color: #f1f5f9 !important; }
          
          /* Force all elements to use RGB colors */
          * {
            color: inherit !important;
            background-color: inherit !important;
            border-color: inherit !important;
            box-shadow: none !important;
          }
        `;
        document.head.appendChild(style);
        return style;
      };

      const removeColorFix = (style: HTMLStyleElement) => {
        if (style && style.parentNode) {
          style.parentNode.removeChild(style);
        }
      };

      // Apply color fix
      const colorFixStyle = fixColorCompatibility();

      // Add global CSS custom properties to override oklch
      const addGlobalColorOverrides = () => {
        const rootStyle = document.createElement('style');
        rootStyle.id = 'pdf-global-color-override-fullpage';
        rootStyle.textContent = `
          :root {
            --fallback-color: 0 0 0;
            --fallback-bg: 255 255 255;
            --fallback-border: 0 0 0;
          }
          
          /* Force all elements to use RGB values */
          * {
            color: rgb(var(--fallback-color)) !important;
            background-color: rgb(var(--fallback-bg)) !important;
            border-color: rgb(var(--fallback-border)) !important;
          }
          
          /* Specific overrides for common elements */
          body, html {
            background-color: rgb(255 255 255) !important;
            color: rgb(0 0 0) !important;
          }
        `;
        document.head.appendChild(rootStyle);
        return rootStyle;
      };

      const removeGlobalColorOverrides = (style: HTMLStyleElement) => {
        if (style && style.parentNode) {
          style.parentNode.removeChild(style);
        }
      };

      // Apply global color overrides
      const globalColorStyle = addGlobalColorOverrides();

      try {
        // Capture the entire page
        const canvas = await html2canvas(document.body, {
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff', // Use white background instead of null
          scale: this.options.scale,
          logging: false,
          width: document.documentElement.scrollWidth,
          height: document.documentElement.scrollHeight,
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
          scrollX: 0,
          scrollY: 0,
          foreignObjectRendering: true,
          removeContainer: false,
          imageTimeout: 15000,
          onclone: (clonedDoc) => {
            // Ensure print-friendly styles
            const clonedBody = clonedDoc.body;
            clonedBody.style.webkitPrintColorAdjust = 'exact';
            clonedBody.style.colorAdjust = 'exact';
            clonedBody.style.printColorAdjust = 'exact';
            
            // Add the color fix to the cloned document as well
            const clonedStyle = clonedDoc.createElement('style');
            clonedStyle.textContent = colorFixStyle.textContent;
            clonedDoc.head.appendChild(clonedStyle);
          }
        });

        // Remove color fix
        removeColorFix(colorFixStyle);
        removeGlobalColorOverrides(globalColorStyle);

        const imgData = canvas.toDataURL('image/png', this.options.quality);

        // Calculate dimensions
        const pageDims = this.calculatePageDimensions();
        const imgWidth = pageDims.width;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Create PDF
        const pdf = new jsPDF({
          orientation: this.options.orientation,
          unit: 'mm',
          format: this.options.format
        });

        // Calculate how many pages we need
        const pageHeight = pageDims.height;
        const totalPages = Math.ceil(imgHeight / pageHeight);

        let position = 0;
        let pageNumber = 1;

        // Add first page
        pdf.addImage(imgData, 'PNG', this.options.margin!.left, this.options.margin!.top, imgWidth, imgHeight);
        
        // Add logo and footer to first page
        await this.addLogoToPDF(pdf, pageNumber);
        this.addPageFooter(pdf, pageNumber, totalPages);

        // Add additional pages if needed
        while (position + pageHeight < imgHeight) {
          position += pageHeight;
          pageNumber++;
          
          pdf.addPage();
          
          // Add the next portion of the image
          const sourceY = position * (canvas.height / imgHeight);
          const sourceHeight = Math.min(pageHeight * (canvas.height / imgHeight), canvas.height - sourceY);
          
          // Create a temporary canvas for this page slice
          const pageCanvas = document.createElement('canvas');
          const pageCtx = pageCanvas.getContext('2d')!;
          pageCanvas.width = canvas.width;
          pageCanvas.height = sourceHeight;
          
          pageCtx.drawImage(canvas, 0, sourceY, canvas.width, sourceHeight, 0, 0, canvas.width, sourceHeight);
          const pageImgData = pageCanvas.toDataURL('image/png', this.options.quality);
          
          pdf.addImage(pageImgData, 'PNG', this.options.margin!.left, this.options.margin!.top, imgWidth, pageHeight);
          
          // Add logo and footer to this page
          await this.addLogoToPDF(pdf, pageNumber);
          this.addPageFooter(pdf, pageNumber, totalPages);
        }

        // Save the PDF
        pdf.save(this.options.filename);

      } catch (error) {
        // Clean up on error
        removeColorFix(colorFixStyle);
        removeGlobalColorOverrides(globalColorStyle);
        throw error;
      }

    } catch (error) {
      console.error('Error generating full page PDF:', error);
      throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      this.hideLoadingState();
    }
  }

  private showLoadingState(): void {
    // Create or show loading overlay
    let loadingOverlay = document.getElementById('pdf-loading-overlay');
    if (!loadingOverlay) {
      loadingOverlay = document.createElement('div');
      loadingOverlay.id = 'pdf-loading-overlay';
      loadingOverlay.innerHTML = `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          backdrop-filter: blur(4px);
        ">
          <div style="
            background: white;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          ">
            <div style="
              width: 40px;
              height: 40px;
              border: 4px solid #e3e3e3;
              border-top: 4px solid #3b82f6;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin: 0 auto 1rem;
            "></div>
            <h3 style="margin: 0 0 0.5rem; color: #1f2937; font-family: system-ui;">Generating PDF...</h3>
            <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">Capturing visual content with high fidelity</p>
          </div>
        </div>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      `;
      document.body.appendChild(loadingOverlay);
    } else {
      loadingOverlay.style.display = 'flex';
    }
  }

  private hideLoadingState(): void {
    const loadingOverlay = document.getElementById('pdf-loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.style.display = 'none';
    }
  }
}

// Convenience functions
export const generateVisualPDF = async (elementId: string, options: VisualPDFOptions = {}) => {
  const generator = new VisualPDFGenerator(options);
  await generator.generateVisualPDF(elementId);
};

export const generateFullPageVisualPDF = async (options: VisualPDFOptions = {}) => {
  const generator = new VisualPDFGenerator(options);
  await generator.generateFullPagePDF();
};
