import { UploadForm } from "@/components/ui/UploadForm";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/authOptions";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
    title: "Resume Analyzer",
    description: "Upload your resume and job description to get detailed insights and recommendations.",
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Resume Analyzer</h1>
          <p className="text-xl text-muted-foreground">
            Upload your resume and job description to get detailed insights and recommendations
          </p>
        </div>
        <UploadForm />
      </div>
    </main>
  );
}
