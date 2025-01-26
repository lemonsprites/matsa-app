import { useAuth } from "@/lib/middleware/auth-guard";
import { LoginForm } from "@/pages/auth/login-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if(isAuth)
      navigate('/')
  }, [isAuth])


  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
