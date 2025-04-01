'use client'

import { useEffect, useState } from 'react';
import { AnalysisResultDisplay } from '@/components/ui/AnalysisResultDisplay';
import { ProcessingDisplay } from '@/components/ui/ProcessingDisplay';
import { useParams } from 'next/navigation';

interface AnalysisResult {
  score: number;
  matchingStrengths: string;
  areasForImprovement: string;
  missingRequirements: string;
  recommendations: string;
}

export default function ResultsPage() {
  const params = useParams();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/results/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }
        const data = await response.json();
        setResult(data);
      } catch (err) {
        setError('Failed to load analysis results. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [params.id]);

  if (isLoading) {
    return <ProcessingDisplay />;
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">No results found.</div>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Analysis Results</h1>
          <p className="text-xl text-muted-foreground">
            Here&apos;s how your resume matches the job description
          </p>
        </div>
        <AnalysisResultDisplay result={result} />
      </div>
    </main>
  );
} 