
import Header from '../components/layout/Header';
import Login from '../components/auth/Login';

const LoginPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-16 min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Login />
      </main>
    </div>
  );
};

export default LoginPage;
