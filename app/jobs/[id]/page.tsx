export const dynamic = "force-dynamic";

import { getSingleJob } from "@/actions/jobActions";
import JobDeatailsHeader from "@/components/features/job/JobDeatailsHeader";
import JobDescription from "@/components/features/job/JobDescription";
import Container from "@/components/ui/Container";

interface JobPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobPage({ params }: JobPageProps) {
  const { id } = await params;
  const job = await getSingleJob(id);

  return (
    <Container>
      <JobDeatailsHeader job={job} />
      <section className="py-12 px-4 lg:px-8">
        <div>
          {" "}
          <JobDescription job={job} />
        </div>
      </section>
    </Container>
  );
}
