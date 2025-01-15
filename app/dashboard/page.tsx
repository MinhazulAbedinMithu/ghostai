import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import DashTabs from "@/components/Dashboard/DashTabs";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); 
    return null; 
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <DashTabs />
    </div>
  );
};

export default DashboardPage;
