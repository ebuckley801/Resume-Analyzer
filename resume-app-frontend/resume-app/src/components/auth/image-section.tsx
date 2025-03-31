import Image from "next/image";

export function ImageSection() {
  return (
    <div className="relative h-full min-h-[50vh] md:min-h-screen w-full overflow-hidden bg-gradient-to-br from-purple-900 via-blue-800 to-blue-500 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 flex items-center justify-center">
      {/* Gradient wave overlay */}
      <div className="absolute inset-0 z-0">
        <svg className="h-full w-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <path 
            className="fill-purple-500/30 dark:fill-purple-800/30"
            d="M0,192L48,186.7C96,181,192,171,288,186.7C384,203,480,245,576,224C672,203,768,117,864,96C960,75,1056,117,1152,138.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path 
            className="fill-blue-500/30 dark:fill-blue-800/30"
            d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,250.7C960,235,1056,181,1152,181.3C1248,181,1344,235,1392,261.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="z-10 text-center px-6">
        <h2 className="text-3xl font-bold text-white mb-2">Resume Analyzer</h2>
        <p className="text-xl text-blue-100 dark:text-blue-200 max-w-md">
          Optimize your job search by matching your resume to job descriptions
        </p>
      </div>
    </div>
  );
} 