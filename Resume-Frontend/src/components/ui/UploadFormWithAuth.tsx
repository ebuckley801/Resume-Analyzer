'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:5001';

export function UploadFormWithAuth() {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        toast.error("Please upload a PDF file");
        return;
      }
      setResume(file);
      toast.success("Resume uploaded successfully");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume || !jobDescription) {
      toast.error("Please upload a resume and provide a job description");
      return;
    }

    if (!session?.user?.id) {
      toast.error("Please sign in to continue");
      return;
    }

    // Log authentication information
    console.log('Session data:', {
      userId: session.user.id,
      hasBackendToken: !!session.user.backendToken,
      tokenPreview: session.user.backendToken ? `${session.user.backendToken.substring(0, 10)}...` : 'none'
    });

    setIsAnalyzing(true);
    try {
      // 1. Upload job description
      const jobResponse = await fetch(`${BACKEND_URL}/job/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.backendToken}`,
        },
        body: JSON.stringify({
          text: jobDescription,
          user_id: session.user.id
        })
      });

      if (!jobResponse.ok) {
        const errorData = await jobResponse.json();
        throw new Error(errorData.error || "Failed to upload job description");
      }

      const jobData = await jobResponse.json();
      const jobId = jobData.job_id;

      // 2. Upload resume file
      const resumeFormData = new FormData();
      resumeFormData.append('file', resume);
      resumeFormData.append('user_id', session.user.id);

      const uploadResponse = await fetch(`${BACKEND_URL}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.user.backendToken}`,
        },
        body: resumeFormData
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.error || "Failed to upload resume");
      }

      const uploadData = await uploadResponse.json();
      const resumeText = uploadData.full_text;

      // 3. Call analyze endpoint
      const analyzeRequestData = {
        resume_text: resumeText,
        job_id: jobId,
        sections: uploadData.sections || {}
      };
      console.log('Sending to backend analyze:', JSON.stringify(analyzeRequestData, null, 2));

      const analyzeResponse = await fetch(`${BACKEND_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.backendToken}`,
        },
        body: JSON.stringify(analyzeRequestData)
      });

      if (!analyzeResponse.ok) {
        const errorData = await analyzeResponse.json();
        console.error('Backend analyze error:', errorData);
        throw new Error(errorData.error || "Analysis failed");
      }

      const analysisData = await analyzeResponse.json();
      console.log('Backend analyze response:', analysisData);
      
      // 4. Store the analysis result in our database
      const requestData = {
        job_id: jobId,
        resume_text: resumeText,
        analysis_data: analysisData,
        upload_id: uploadData.upload_id
      };

      // Ensure we're sending valid JSON
      const jsonData = JSON.stringify(requestData);
      console.log('Sending to frontend analyze:', jsonData);

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Frontend analyze error:', errorData);
        throw new Error(errorData.error || "Failed to save analysis");
      }

      const result = await response.json();
      console.log('Frontend analyze response:', result);
      toast.success("Analysis completed successfully");
      router.push(`/results/${result.id}`);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      toast.error(error instanceof Error ? error.message : "Failed to analyze resume. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="bg-background/50 backdrop-blur-sm">
      <CardHeader className="space-y-1 pb-8">
        <CardTitle className="text-2xl font-bold tracking-tight">Upload Resume & Job Description</CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Upload your resume and paste the job description to get started with the analysis.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <Label htmlFor="resume" className="text-base font-medium">Resume (PDF)</Label>
            </div>
            <div className="relative">
              <input
                type="file"
                id="resume"
                accept=".pdf"
                onChange={handleResumeChange}
                className="hidden"
                required
              />
              <label
                htmlFor="resume"
                className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-muted/50 border-2 border-dashed rounded-xl cursor-pointer hover:bg-muted/70 border-border/50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-1 text-sm font-medium text-muted-foreground">
                    {resume ? resume.name : "Click to upload your resume"}
                  </p>
                  <p className="text-xs text-muted-foreground">PDF (MAX. 10MB)</p>
                </div>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <Label htmlFor="jobDescription" className="text-base font-medium">Job Description</Label>
            </div>
            <Textarea
              id="jobDescription"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[200px] resize-none bg-muted/50 border-border/50 focus:border-primary/50"
              required
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit" 
              disabled={isAnalyzing}
              className="w-full md:w-auto min-w-[200px] h-11 rounded-lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Resume"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 