"use client";

import { PageContainer } from "@/components/layout/page-container";
import { UploadFormWithAuth } from "@/components/ui/UploadFormWithAuth";

export default function UploadPage() {
  return (
    <PageContainer>
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Upload Resume & Job Description</h1>
          <p className="mt-2 text-muted-foreground">
            Upload your resume and paste the job description to get started with the analysis.
          </p>
        </div>
        <UploadFormWithAuth />
      </div>
    </PageContainer>
  );
} 