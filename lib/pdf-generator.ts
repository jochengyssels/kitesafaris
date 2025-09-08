import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PDFOptions {
  filename?: string;
  logoPath?: string;
  includeLogo?: boolean;
}

export class ItineraryPDFGenerator {
  private pdf: jsPDF;
  private logoPath: string;
  private includeLogo: boolean;

  constructor(options: PDFOptions = {}) {
    this.pdf = new jsPDF('p', 'mm', 'a4');
    this.logoPath = options.logoPath || '/kitesafaris-zebra-logo.png';
    this.includeLogo = options.includeLogo !== false;
  }

  private async addLogo(pageNumber: number = 1): Promise<void> {
    if (!this.includeLogo) return;

    try {
      // Create an image element to load the logo
      const logoImg = new Image();
      logoImg.crossOrigin = 'anonymous';
      
      return new Promise<void>((resolve) => {
        const timeout = setTimeout(() => {
          console.warn('Logo loading timeout');
          resolve();
        }, 3000);

        logoImg.onload = () => {
          clearTimeout(timeout);
          try {
            const imgWidth = 40;
            const imgHeight = (logoImg.height * imgWidth) / logoImg.width;
            const pageWidth = this.pdf.internal.pageSize.getWidth();
            const x = pageWidth - imgWidth - 10;
            const y = 10;

            this.pdf.addImage(logoImg, 'PNG', x, y, imgWidth, imgHeight);
            resolve();
          } catch (error) {
            console.warn('Error adding logo to PDF:', error);
            resolve();
          }
        };
        
        logoImg.onerror = () => {
          clearTimeout(timeout);
          console.warn('Could not load logo image from:', this.logoPath);
          resolve();
        };
        
        logoImg.src = this.logoPath;
      });
    } catch (error) {
      console.warn('Error adding logo:', error);
    }
  }

  private addPageHeader(title: string, subtitle?: string) {
    // Add title
    this.pdf.setFontSize(24);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text(title, 20, 30);

    // Add subtitle if provided
    if (subtitle) {
      this.pdf.setFontSize(14);
      this.pdf.setFont('helvetica', 'normal');
      this.pdf.text(subtitle, 20, 40);
    }

    // Add line separator
    this.pdf.setDrawColor(0, 150, 255);
    this.pdf.setLineWidth(0.5);
    this.pdf.line(20, 45, 190, 45);
  }

  private addDaySection(day: any, yPosition: number): number {
    let currentY = yPosition;

    // Day header
    this.pdf.setFontSize(16);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.setTextColor(0, 100, 200);
    this.pdf.text(`Day ${day.day} - ${day.title}`, 20, currentY);
    currentY += 8;

    // Date and location
    this.pdf.setFontSize(12);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.setTextColor(0, 0, 0);
    this.pdf.text(`Date: ${day.date}`, 20, currentY);
    this.pdf.text(`Location: ${day.location}`, 20, currentY + 6);
    currentY += 15;

    // Activity
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('Activity:', 20, currentY);
    this.pdf.setFont('helvetica', 'normal');
    const activityLines = this.pdf.splitTextToSize(day.activity, 160);
    this.pdf.text(activityLines, 20, currentY + 6);
    currentY += 6 + (activityLines.length * 5);

    // Description
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('Description:', 20, currentY);
    this.pdf.setFont('helvetica', 'normal');
    const descLines = this.pdf.splitTextToSize(day.description, 160);
    this.pdf.text(descLines, 20, currentY + 6);
    currentY += 6 + (descLines.length * 5);

    // Wind conditions and difficulty
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text(`Wind Conditions: ${day.windConditions}`, 20, currentY);
    this.pdf.text(`Difficulty: ${day.difficulty.charAt(0).toUpperCase() + day.difficulty.slice(1)}`, 20, currentY + 6);
    currentY += 15;

    // Highlights
    if (day.highlights && day.highlights.length > 0) {
      this.pdf.setFont('helvetica', 'bold');
      this.pdf.text('Highlights:', 20, currentY);
      this.pdf.setFont('helvetica', 'normal');
      currentY += 6;
      
      day.highlights.forEach((highlight: string) => {
        this.pdf.text(`• ${highlight}`, 25, currentY);
        currentY += 5;
      });
      currentY += 5;
    }

    return currentY;
  }

  private addWhatIncludedSection(includedItems: string[], yPosition: number): number {
    let currentY = yPosition;

    this.pdf.setFontSize(16);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.setTextColor(0, 100, 200);
    this.pdf.text('What\'s Included', 20, currentY);
    currentY += 10;

    this.pdf.setFontSize(12);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.setTextColor(0, 0, 0);

    includedItems.forEach((item) => {
      this.pdf.text(`✓ ${item}`, 20, currentY);
      currentY += 6;
    });

    return currentY;
  }

  private addWindConditionsSection(windInfo: any, yPosition: number): number {
    let currentY = yPosition;

    this.pdf.setFontSize(16);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.setTextColor(0, 100, 200);
    this.pdf.text('Wind Conditions', 20, currentY);
    currentY += 10;

    this.pdf.setFontSize(12);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.setTextColor(0, 0, 0);

    this.pdf.text(`Season: ${windInfo.season}`, 20, currentY);
    this.pdf.text(`Wind Speed: ${windInfo.speed}`, 20, currentY + 6);
    this.pdf.text(`Wind Direction: ${windInfo.direction}`, 20, currentY + 12);
    this.pdf.text(`Water Temperature: ${windInfo.waterTemp}`, 20, currentY + 18);

    return currentY + 25;
  }

  private addFooter(pageNumber: number) {
    const pageHeight = this.pdf.internal.pageSize.getHeight();
    this.pdf.setFontSize(10);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.setTextColor(128, 128, 128);
    this.pdf.text(`Page ${pageNumber}`, 20, pageHeight - 10);
    this.pdf.text('Kitesafaris - Ultimate Caribbean Kiteboarding Adventures', 100, pageHeight - 10);
  }

  async generatePDF(itineraryData: any[], options: PDFOptions = {}): Promise<void> {
    const filename = options.filename || 'Antigua-Kitesafari-Itinerary.pdf';
    let pageNumber = 1;
    let currentY = 50;

    // Add logo to first page
    await this.addLogo(pageNumber);

    // Cover page
    this.addPageHeader('Antigua Kitesafari', '7-Day Luxury Caribbean Kiteboarding Adventure');
    
    this.pdf.setFontSize(14);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.text('Duration: 7 days (Saturday to Saturday)', 20, 60);
    this.pdf.text('Accommodation: Luxury catamaran with 3 double cabins', 20, 70);
    this.pdf.text('Max Guests: 6 people', 20, 80);
    this.pdf.text('Price: From €1,900', 20, 90);
    this.pdf.text('Season: December 2025 (peak season with 15-25 knot trade winds)', 20, 100);
    this.pdf.text('Experience: Ultimate Caribbean kiteboarding adventure with expert guides', 20, 110);

    this.addFooter(pageNumber);
    pageNumber++;

    // Itinerary pages
    for (let i = 0; i < itineraryData.length; i++) {
      const day = itineraryData[i];
      
      // Check if we need a new page
      if (currentY > 250) {
        this.pdf.addPage();
        await this.addLogo(pageNumber);
        this.addFooter(pageNumber);
        pageNumber++;
        currentY = 30;
      }

      currentY = this.addDaySection(day, currentY);
      currentY += 10;
    }

    // What's Included page
    this.pdf.addPage();
    await this.addLogo(pageNumber);
    
    const includedItems = [
      'Luxury catamaran accommodation',
      'Expert kiteboarding guides',
      'All kiteboarding equipment',
      'Daily meals and drinks',
      'Safety equipment and rescue support',
      'Snorkeling gear',
      'Transportation between spots',
      'Welcome and farewell dinners'
    ];

    this.addWhatIncludedSection(includedItems, 30);
    this.addFooter(pageNumber);
    pageNumber++;

    // Wind Conditions page
    this.pdf.addPage();
    await this.addLogo(pageNumber);
    
    const windInfo = {
      season: 'December 2025 (Peak Season)',
      speed: '15-25 knots (Trade Winds)',
      direction: 'Consistent easterly trade winds',
      waterTemp: '26-28°C (Perfect for kiteboarding)'
    };

    this.addWindConditionsSection(windInfo, 30);
    this.addFooter(pageNumber);

    // Save the PDF
    this.pdf.save(filename);
  }

  async generatePDFFromHTML(elementId: string, options: PDFOptions = {}): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    try {
      // Generate canvas from HTML element
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Create PDF
      this.pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        this.pdf.addPage();
        await this.addLogo();
        this.pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      const filename = options.filename || 'Antigua-Kitesafari-Itinerary.pdf';
      this.pdf.save(filename);
    } catch (error) {
      console.error('Error generating PDF from HTML:', error);
      throw error;
    }
  }
}

export const generateItineraryPDF = async (itineraryData: any[], options: PDFOptions = {}) => {
  const generator = new ItineraryPDFGenerator(options);
  await generator.generatePDF(itineraryData);
};

export const generateItineraryPDFFromHTML = async (elementId: string, options: PDFOptions = {}) => {
  const generator = new ItineraryPDFGenerator(options);
  await generator.generatePDFFromHTML(elementId, options);
};
