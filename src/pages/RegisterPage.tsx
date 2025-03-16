
import Header from '../components/layout/Header';
import Register from '../components/auth/Register';

const RegisterPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-16 min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Register />
      </main>
    </div>
  );
};

export default RegisterPage;
