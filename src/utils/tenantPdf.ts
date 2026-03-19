import { jsPDF } from "jspdf";

export interface TenantPdfData {
  fullName: string;
  dateOfBirth?: string;
  city: string;
  country: string;
  violationType?: string;
  description: string;
  reportedAt?: string;
  reporterName?: string;
  reporterEmail?: string;
  fileName: string;
}

export interface TenantPdfLabels {
  title: string;
  reportedAt: string;
  fullName: string;
  dateOfBirth: string;
  city: string;
  country: string;
  violationType: string;
  description: string;
  reporter: string;
  email: string;
  generatedOn: string;
}

const PAGE_WIDTH = 210;
const MARGIN = 20;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const LINE_HEIGHT = 8;
const LABEL_WIDTH = 50;

function drawField(doc: jsPDF, label: string, value: string, y: number): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(label.toUpperCase(), MARGIN, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);
  const lines = doc.splitTextToSize(value || "—", CONTENT_WIDTH - LABEL_WIDTH);
  doc.text(lines, MARGIN + LABEL_WIDTH, y);

  return y + LINE_HEIGHT * lines.length;
}

function drawDivider(doc: jsPDF, y: number): number {
  doc.setDrawColor(220, 220, 220);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  return y + LINE_HEIGHT;
}

export function downloadTenantPdf(data: TenantPdfData, labels: TenantPdfLabels): void {
  const doc = new jsPDF();
  let y = MARGIN;

  // Header background
  doc.setFillColor(249, 115, 22); // orange
  doc.rect(0, 0, PAGE_WIDTH, 36, "F");

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text(labels.title, MARGIN, 22);

  // Reported at subtitle
  if (data.reportedAt) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`${labels.reportedAt} ${data.reportedAt}`, MARGIN, 30);
  }

  y = 50;

  // Tenant details section
  doc.setTextColor(30, 30, 30);
  y = drawField(doc, labels.fullName, data.fullName, y);
  y += 2;
  y = drawField(doc, labels.dateOfBirth, data.dateOfBirth ?? "—", y);
  y += 2;
  y = drawField(doc, labels.city, data.city, y);
  y += 2;
  y = drawField(doc, labels.country, data.country, y);

  if (data.violationType) {
    y += 2;
    y = drawField(doc, labels.violationType, data.violationType, y);
  }

  y += LINE_HEIGHT * 0.5;
  y = drawDivider(doc, y);

  // Description
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(labels.description.toUpperCase(), MARGIN, y);
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);
  const descLines = doc.splitTextToSize(data.description || "—", CONTENT_WIDTH);
  doc.text(descLines, MARGIN, y);
  y += LINE_HEIGHT * descLines.length + LINE_HEIGHT;

  // Reporter section
  if (data.reporterName || data.reporterEmail) {
    y = drawDivider(doc, y);

    if (data.reporterName) {
      y = drawField(doc, labels.reporter, data.reporterName, y);
      y += 2;
    }
    if (data.reporterEmail) {
      y = drawField(doc, labels.email, data.reporterEmail, y);
    }
  }

  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(160, 160, 160);
  doc.text(
    `${labels.generatedOn} ${new Date().toLocaleString()}`,
    MARGIN,
    pageHeight - 10
  );

  doc.save(data.fileName);
}
