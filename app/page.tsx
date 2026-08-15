export const dynamic = "force-dynamic";

import { getJobs } from "@/actions/jobActions";
import Hero from "@/components/features/homepage/Hero";
import JobFeed from "@/components/features/homepage/JobFeed";
import Container from "@/components/ui/Container";

export default async function Home() {
  return (
    <div>
      <Hero />
      <section>
        <Container>
          <div className="mb-6">
            <h2 className="text-[23px] sm:text-[30px] font-semibold">
              Latest Opportunities
            </h2>
          </div>
          <JobFeed />
        </Container>
      </section>
    </div>
  );
}
