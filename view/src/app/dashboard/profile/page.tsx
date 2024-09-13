import { Authorization } from "@src/lib/authorization";
import { SProfile } from "@src/components/compound";
import { SLoading } from "@src/components/root";
import { Suspense } from "react";
export default async function ProfilePage() {
  // await Authorization(["admin", "user"]);

  return (
    <section className={`py-5`}>
      <Suspense fallback={<SLoading text="Loading... Profile" />}>
        <SProfile />
      </Suspense>
    </section>
  );
}
