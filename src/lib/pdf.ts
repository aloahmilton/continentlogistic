import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Type definition for jsPDF with autotable
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDF;
}

export const generateInvoicePDF = (invoice: any) => {
  const doc = new jsPDF() as jsPDFWithAutoTable;
  
  // Header
  doc.setFontSize(22);
  doc.setTextColor(220, 38, 38); // Brand Red
  doc.text('CONTINENTAL TRACK', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('Global Logistics & Freight Solutions', 105, 27, { align: 'center' });
  
  // Invoice Details
  doc.setFontSize(16);
  doc.setTextColor(0);
  doc.text('INVOICE', 20, 45);
  
  doc.setFontSize(10);
  doc.text(`Invoice #: ${invoice.invoiceNumber || invoice._id}`, 20, 52);
  doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`, 20, 57);
  doc.text(`Tracking #: ${invoice.trackingNumber}`, 20, 62);
  
  // Customer Details
  doc.setFontSize(12);
  doc.text('BILL TO:', 140, 45);
  doc.setFontSize(10);
  doc.text(invoice.customerName, 140, 52);
  doc.text(invoice.customerEmail, 140, 57);
  
  // Table
  const tableData = [
    ['Description', 'Rate', 'Tax', 'Total'],
    [`Logistics Services for ${invoice.trackingNumber}`, `$${invoice.amount.toFixed(2)}`, `$${(invoice.tax || 0).toFixed(2)}`, `$${invoice.total.toFixed(2)}`]
  ];
  
  doc.autoTable({
    startY: 75,
    head: [tableData[0]],
    body: [tableData[1]],
    theme: 'grid',
    headStyles: { fillStyle: [220, 38, 38], textColor: [255, 255, 255] }
  });
  
  // Footer / Instructions
  const finalY = (doc as any).lastAutoTable.finalY || 100;
  doc.setFontSize(12);
  doc.text('Payment Instructions:', 20, finalY + 20);
  doc.setFontSize(9);
  doc.text('Please verify payment via your dashboard.', 20, finalY + 27);
  doc.text('Continental Track Logistics Group - All Rights Reserved.', 105, 285, { align: 'center' });
  
  doc.save(`Invoice_${invoice.invoiceNumber || invoice._id}.pdf`);
};

export const generateLabelPDF = (shipment: any) => {
  const doc = new jsPDF() as jsPDFWithAutoTable;
  
  // Label Border
  doc.rect(10, 10, 190, 120);
  
  // Brand
  doc.setFontSize(18);
  doc.setTextColor(220, 38, 38);
  doc.text('CONTINENTAL TRACK', 105, 25, { align: 'center' });
  doc.setFontSize(10);
  doc.text('EXPRESS WORLDWIDE', 105, 30, { align: 'center' });
  
  // Tracking Number
  doc.setFontSize(24);
  doc.setTextColor(0);
  doc.text(shipment.trackingNumber, 105, 50, { align: 'center' });
  
  // Sender/Receiver
  doc.line(10, 60, 200, 60);
  
  doc.setFontSize(10);
  doc.text('FROM:', 15, 70);
  doc.setFontSize(12);
  doc.text(shipment.sender.name, 15, 76);
  doc.setFontSize(9);
  doc.text(shipment.origin, 15, 81);
  
  doc.setFontSize(10);
  doc.text('TO:', 110, 70);
  doc.setFontSize(14);
  doc.text(shipment.receiver.name, 110, 76);
  doc.setFontSize(10);
  doc.text(shipment.destination, 110, 83);
  
  // Service
  doc.line(10, 95, 200, 95);
  doc.setFontSize(12);
  doc.text(`SERVICE: ${shipment.serviceType}`, 15, 105);
  doc.text(`WEIGHT: ${shipment.weight} KG`, 110, 105);
  
  doc.setFontSize(8);
  doc.text('This is an electronically generated label.', 105, 125, { align: 'center' });
  
  doc.save(`Label_${shipment.trackingNumber}.pdf`);
};
