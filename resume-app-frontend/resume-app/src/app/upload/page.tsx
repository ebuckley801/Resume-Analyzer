"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, Loader2 } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

export default function UploadPage() {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();

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

    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("jobDescription", jobDescription);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Analysis failed");

      const data = await response.json();
      toast.success("Analysis started successfully");
      router.push(`/results/${data.id}`);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      toast.error("Failed to analyze resume. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <PageContainer>
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Upload Resume & Job Description</h1>
          <p className="mt-2 text-muted-foreground">
            Upload your resume and paste the job description to get started with the analysis.
          </p>
        </div>

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
      </div>
    </PageContainer>
  );
} 