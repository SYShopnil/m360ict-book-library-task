import { SProfile } from "@src/components/compound";
import { SLoading } from "@src/components/root";
import { Suspense } from "react";
export default async function ProfilePage() {
  return (
    <section className={`py-5`}>
      <Suspense fallback={<SLoading text="Loading... Profile" />}>
        <SProfile />
      </Suspense>
    </section>
  );
}
