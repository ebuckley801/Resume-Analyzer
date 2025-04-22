import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/authOptions";
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

  redirect("/upload");
}
