
import Header from '../components/layout/Header';
import ForgotPassword from '../components/auth/ForgotPassword';

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-16 min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <ForgotPassword />
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
