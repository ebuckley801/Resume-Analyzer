'use client'

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function ProcessingDisplay() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-2xl font-semibold">Processing Your Resume</h2>
        <p className="text-muted-foreground text-center">
          We&apos;re analyzing your resume and job description to provide you with detailed insights.
          This may take a few moments...
        </p>
      </CardContent>
    </Card>
  );
} 