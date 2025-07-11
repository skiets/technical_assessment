import Sidebar from "../components/sidebar";
import { AuthHeader } from "../components/header";
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar></Sidebar>
      <main className="flex-1  flex flex-col">
        <AuthHeader></AuthHeader>
        <div className="w-full h-full">{children}</div>
        </main>
    </div>
  );
}
