// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Job } from "@/lib/schema";
// import { auth } from "@clerk/nextjs/server";
// import { Briefcase, ExternalLink, MapPin } from "lucide-react";
// import { Span } from "next/dist/trace";
// import Link from "next/link";

// interface JobDetailHeaderProps {
//   job: Job | null;
// }

// export default async function JobDeatailsHeader({ job }: JobDetailHeaderProps) {
//   const { userId } = await auth();

//   return (
//     <div className="border-b bg-muted/30 py-12 px-3">
//       <div className="flex justify-between">
//         <div className="space-y-4">
//           <div>
//             <h1 className="mb-2 text-4xl lg:text-5xl font-bold">
//               {job?.title}
//             </h1>
//             <p className="text-xl text-muted-foreground">{job?.company}</p>
//           </div>
//           <div className="text-muted-foreground flex flex-wrap gap-4 items-center">
//             <div className="flex items-center gap-2">
//               <MapPin className="h-5 w-5" />
//               <span>{job?.location}</span>
//             </div>

//             <div className="flex items-center gap-2">
//               <Briefcase className="h-5 w-5" />
//               <span>{job?.jobType}</span>
//             </div>

//             {job?.salary && (
//               <span className="font-semibold text-foreground">
//                 {job?.salary}
//               </span>
//             )}
//           </div>
//           <div className="flex flex-wrap items-center gap-3">
//             <Badge variant={"secondary"}>{job?.experienceLevel}</Badge>
//             <span className="text-sm text-muted-foreground">
//               {job &&
//                 new Date(job.postedAt).toLocaleDateString("en-IN", {
//                   day: "2-digit",
//                   month: "short",
//                   year: "numeric",
//                 })}
//             </span>
//           </div>
//         </div>
//         <div className="xs:ml-[20px]">
//           {userId && job?.applicationUrl && (
//             <Button asChild>
//               <Link href={job?.applicationUrl || ""}>
//                 Apply Now
//                 <ExternalLink className="w-4 h-4" />
//               </Link>
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Job } from "@/lib/schema";
import { auth } from "@clerk/nextjs/server";
import { Briefcase, ExternalLink, MapPin, AlertCircle } from "lucide-react";
import Link from "next/link";

interface JobDetailHeaderProps {
  job: Job | null;
}

export default async function JobDeatailsHeader({ job }: JobDetailHeaderProps) {
  const { userId } = await auth();

  if (!userId) return null;

  const hasValidUrl =
    job?.applicationUrl &&
    (job.applicationUrl.startsWith("http://") ||
      job.applicationUrl.startsWith("https://"));

  return (
    <div className="border-b bg-muted/30 py-12 px-3">
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <div>
            <h1 className="mb-2 text-4xl lg:text-5xl font-bold">
              {job?.title}
            </h1>
            <p className="text-xl text-muted-foreground">{job?.company}</p>
          </div>
          <div className="text-muted-foreground flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{job?.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <span>{job?.jobType}</span>
            </div>

            {job?.salary && (
              <span className="font-semibold text-foreground">
                {job?.salary}
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={"secondary"}>{job?.experienceLevel}</Badge>
            <span className="text-sm text-muted-foreground">
              {job &&
                new Date(job.postedAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
            </span>
          </div>
        </div>
        <div className="xs:ml-[20px]">
          {hasValidUrl ? (
            <Button asChild size="lg" className="font-semibold">
              <Link
                href={job.applicationUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                Apply Now
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button size="lg" variant="outline" className="font-semibold">
                  Apply Now
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-80 p-4 space-y-3 shadow-lg border border-border bg-popover text-popover-foreground"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-50 dark:bg-amber-950/40 text-amber-500 rounded-lg shrink-0 mt-0.5">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm leading-none">
                      Link missing
                    </h4>
                    <p className="text-xs text-muted-foreground leading-normal">
                      Employer of the company{" "}
                      <span className="font-medium text-foreground">
                        «{job?.company}»
                      </span>{" "}
                      did not provide a valid email address to apply for this
                      vacancy.
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}
