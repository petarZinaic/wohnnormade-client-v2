"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Button } from "@/components/common";

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md">
        <div className="bg-orange text-white rounded-t-lg">
          <h1 className="text-xl text-center font-bold mb-6 py-4">
            Login to Wohnnomade
          </h1>
        </div>
        <form className="p-6" onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="icon"
                className="absolute inset-y-0 right-0 flex items-center px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button
              fullWidth
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
              text={isLoading ? "Signing In..." : "Sign In"}
            />
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/forgot-password"
              className="text-orange hover:text-orangeDark text-sm"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="mt-6 text-center">
            <span className="text-gray-600 text-sm">
              Don't have an account?{" "}
            </span>
            <Link
              href="/register"
              className="text-orange hover:text-orangeDark text-sm font-semibold"
            >
              Sign up here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
