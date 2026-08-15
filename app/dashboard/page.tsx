export const dynamic = "force-dynamic";

import UserJobList from "@/components/features/dashboard/UserJobList";
import Container from "@/components/ui/Container";

export default function Dashboard() {
  return (
    <Container className="py-12">
      <UserJobList />
    </Container>
  );
}
