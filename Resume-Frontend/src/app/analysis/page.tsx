'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { AnalysisResultDisplay } from '@/components/ui/AnalysisResultDisplay';

interface AnalysisResult {
  score: number;
  matchingStrengths: string;
  areasForImprovement: string;
  missingRequirements: string;
  recommendations: string;
}

export default function AnalysisPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      router.push('/sign-in');
      return;
    }

    if (!session?.user?.backendToken) {
      console.error('No backend token found in session');
      setError('Authentication error. Please sign in again.');
      return;
    }

    const fetchLatestResult = async () => {
      try {
        const response = await fetch('/api/results');
        
        if (!response.ok) {
          // For any error, just redirect to upload page
          router.push('/upload');
          return;
        }
        
        const data = await response.json();
        // If no results, redirect to upload page
        if (!Array.isArray(data) || data.length === 0) {
          router.push('/upload');
          return;
        }
        
        // Get the latest result
        setResult(data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching results:', error);
        // For any error, redirect to upload page
        router.push('/upload');
      }
    };

    fetchLatestResult();
  }, [status, session, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          <p className="font-medium">Error loading results</p>
          <p className="text-sm">{error}</p>
          <Button
            onClick={() => router.push('/upload')}
            className="mt-4"
          >
            Upload New Resume
          </Button>
        </div>
      </div>
    );
  }

  if (!result) {
    // This should rarely show since we redirect on empty results
    return (
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex h-[calc(100vh-12rem)] flex-col items-center justify-center rounded-lg border border-dashed"
        >
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h2 className="mt-6 text-xl font-semibold">No analysis results found</h2>
            <p className="mb-8 mt-2 text-center text-sm font-normal leading-7 text-muted-foreground">
              Upload your resume and analyze it against job descriptions to see your results here.
            </p>
            <Button
              onClick={() => router.push('/upload')}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Upload Resume
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Analysis Results</h1>
        <p className="mt-2 text-muted-foreground">
          Here's how your resume matches the job description
        </p>
      </div>
      <AnalysisResultDisplay result={result} />
    </div>
  );
} 