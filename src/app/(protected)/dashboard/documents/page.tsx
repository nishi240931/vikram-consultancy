import React from "react";
import type { Metadata } from "next";
import { studentService } from "@/services/student.service";
import { Card, Button, Badge } from "@/design-system";
import { FileText, Upload, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Document Vault | Vikram Edu Consultants",
  description: "Upload and verify transcripts, SOPs, LORs, and test scores.",
};

export default async function StudentDocumentsPage() {
  const docs = await studentService.getStudentDocuments();

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#0B1B3D] font-['Outfit']">Document Vault</h2>
          <p className="text-xs text-slate-500">Secure storage for transcripts, IELTS/TOEFL score cards, SOPs, and LORs.</p>
        </div>

        <Button variant="primary" size="md" leftIcon={<Upload className="w-4 h-4" />}>
          Upload New Document
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {docs.map((doc) => (
          <Card key={doc.id} variant="flat" padding="md" className="bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-[#0B1B3D]/5 text-[#D4AF37]">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-800 text-sm font-['Outfit']">{doc.title}</h4>
                  <Badge variant={doc.status === "VERIFIED" ? "success" : "warning"} size="sm">
                    {doc.status}
                  </Badge>
                </div>
                <span className="text-xs text-slate-400">
                  Type: {doc.type} • Size: {(doc.fileSize / 1000000).toFixed(1)} MB • Uploaded: {new Date(doc.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
              Download
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
