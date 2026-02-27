"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/features/auth/loginApi";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { LoginPayload } from "@/types/auth";
import toast from "react-hot-toast";
import Link from "next/link";

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const payload: LoginPayload = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await login(payload).unwrap();

      dispatch(
        setCredentials({
          user: response.user,
          accessToken: response.tokens.access,
          refreshToken: response.tokens.refresh,
        })
      );

      toast.success("Login successful");
      router.push("/");
    } catch (error: unknown) {
      console.error("Login failed:", error);
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4">
      <div className="bg-[#020617] max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(0,229,255,0.4)]">
            <span className="text-2xl font-extrabold text-white">NX</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to access your dashboard
          </p>
        </div>

        <div className="bg-[#050B14] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1">
              <label className="text-sm text-gray-300 font-medium">
                Email Address<span className="text-red-500"> *</span>
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full bg-[#020617] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                placeholder="player@example.com"
              />
              {errors.email && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-300 font-medium">
                Password<span className="text-red-500"> *</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: "Password is required" })}
                  className="w-full bg-[#020617] border border-white/10 rounded-lg px-4 py-2.5 pr-12 text-sm text-white outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.78 21.78 0 0 1 5.06-6.94" />
                      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.78 21.78 0 0 1-2.11 3.38" />
                      <path d="M14.12 14.12a3 3 0 0 1-4.24-4.24" />
                      <path d="M1 1l22 22" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="w-4 h-4 rounded border-gray-600 text-cyan-500 focus:ring-cyan-500 bg-transparent"
                />
                <span>Remember me</span>
              </label>
              {/* <button
                type="button"
                className="text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Forgot Password?
              </button> */}
              <Link href="/register" className="text-cyan-400 hover:text-cyan-300 font-medium">
               Back To Register 
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 ${
                isLoading
                  ? "bg-cyan-800 text-white opacity-70 cursor-not-allowed"
                  : "bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg shadow-cyan-500/40"
              }`}
            >
              <span>{isLoading ? "Signing in..." : "Sign In"}</span>
            </button>
          </form>

          <p className="mt-6 text-[11px] text-center text-gray-500">
            Protected by NextGen Pros. See our{" "}
            <span className="text-cyan-400">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
