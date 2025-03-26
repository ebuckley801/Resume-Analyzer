import { Navbar } from "@/components/ui/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { notFound } from "next/navigation"

interface AnalysisResult {
  id: string
  score: number
  strengths: string[]
  improvements: string[]
  missing: string[]
  recommendations: string[]
}

async function getAnalysisResult(id: string): Promise<AnalysisResult> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/results/${id}`, {
    cache: "no-store"
  })
  
  if (!response.ok) {
    notFound()
  }

  return response.json()
}

export default async function AnalysisPage({ params }: { params: { id: string } }) {
  const result = await getAnalysisResult(params.id)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Score Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Matching Score</h3>
                <div className="flex items-center gap-4">
                  <Progress value={result.score} className="w-full" />
                  <span className="text-2xl font-bold">{result.score}%</span>
                </div>
              </div>

              {/* Strengths Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Matching Strengths</h3>
                <div className="grid gap-2">
                  {result.strengths.map((strength, index) => (
                    <div key={index} className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Areas for Improvement */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Areas for Improvement</h3>
                <div className="grid gap-2">
                  {result.improvements.map((improvement, index) => (
                    <div key={index} className="flex items-center gap-2 text-yellow-600">
                      <AlertCircle className="h-5 w-5" />
                      <span>{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing Requirements */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Missing Requirements</h3>
                <div className="grid gap-2">
                  {result.missing.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-red-600">
                      <XCircle className="h-5 w-5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recommendations</h3>
                <div className="grid gap-2">
                  {result.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-muted-foreground">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 