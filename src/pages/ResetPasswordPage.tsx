
import ResetPassword from "@/components/auth/ResetPassword";
import Header from "@/components/layout/Header";

const ResetPasswordPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4 pt-24">
        <ResetPassword />
      </main>
    </div>
  );
};

export default ResetPasswordPage;
