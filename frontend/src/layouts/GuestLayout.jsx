import Footer from "../components/footer";
import { Header } from "../components/header";

export default function GuestLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 flex">{children}</main>
      <Footer />
    </div>
  );
}
