'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface AnalysisResult {
  score: number;
  matchingStrengths: string;
  areasForImprovement: string;
  missingRequirements: string;
  recommendations: string;
}

interface AnalysisResultDisplayProps {
  result: AnalysisResult;
}

export function AnalysisResultDisplay({ result }: AnalysisResultDisplayProps) {
  const scorePercentage = Math.round(result.score * 100);

  return (
    <div className="space-y-6">
      {/* Score Card */}
      <Card>
        <CardHeader>
          <CardTitle>Matching Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={scorePercentage} className="h-2" />
            <p className="text-2xl font-bold text-center">{scorePercentage}%</p>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Details */}
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Matching Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{result.matchingStrengths}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Areas for Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{result.areasForImprovement}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Missing Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{result.missingRequirements}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{result.recommendations}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 