// import Image from "next/image";
import LoginForm from "../components/login-form";


export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-full max-w-md">
      <LoginForm />
    </div>
  </div>
  );
}
