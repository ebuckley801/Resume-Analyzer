"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface AnalysisResult {
  id: string;
  score: number;
  industry: string | null;
  createdAt: string;
  resumeName: string;
  jobDescriptionPreview: string;
  status: string;
}

export default function ResultsPage() {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('/api/results');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch results');
        }
        const data = await response.json();
        // Ensure data is an array
        setResults(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching results:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
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
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="container py-8">
        <div className="rounded-lg border p-4 text-center">
          <p className="text-muted-foreground">No analysis results found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Analysis Results</h1>
        <p className="mt-2 text-muted-foreground">
          View and manage your resume analysis results
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {results.map((result) => (
          <motion.div key={result.id} variants={item}>
            <Card className="h-full bg-background/50 backdrop-blur-sm transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{result.resumeName}</CardTitle>
                  <Badge variant={result.status === 'completed' ? 'default' : 'secondary'}>
                    {result.status}
                  </Badge>
                </div>
                <CardDescription>
                  {format(new Date(result.createdAt), 'MMM d, yyyy')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">Match Score</span>
                      <span className="text-sm font-medium">{Math.round(result.score * 100)}%</span>
                    </div>
                    <Progress value={result.score * 100} className="h-2" />
                  </div>
                  {result.industry && (
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{result.industry}</Badge>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {result.jobDescriptionPreview}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {results.length === 0 && (
        <div className="flex h-[calc(100vh-12rem)] flex-col items-center justify-center rounded-lg border border-dashed">
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
            <h2 className="mt-6 text-xl font-semibold">No results yet</h2>
            <p className="mb-8 mt-2 text-center text-sm font-normal leading-7 text-muted-foreground">
              Upload your resume and analyze it against job descriptions to see your results here.
            </p>
            <a
              href="/upload"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Upload Resume
            </a>
          </div>
        </div>
      )}
    </div>
  );
} 