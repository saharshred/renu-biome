"use client";
import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  // Sign-up form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [growerNumber, setGrowerNumber] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    // Supabase login logic
    const { data: { user }, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError || !user) {
      setError(loginError?.message || "Login failed");
      setIsLoading(false);
      return;
    }
    // Fetch role from profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    if (profileError || !profile?.role) {
      setError('Unable to retrieve user role');
      setIsLoading(false);
      return;
    }
    // Redirect based on role
    if (profile.role === 'owner') {
      router.push('/dashboard/owner');
    } else if (profile.role === 'customer') {
      router.push('/dashboard/customer');
    } else {
      setError('Unknown user role');
    }
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    // 1. Sign up the user
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email: signUpEmail,
      password: signUpPassword,
    });
    if (signUpError || !user) {
      setError(signUpError?.message || 'Sign-up failed');
      setIsLoading(false);
      return;
    }
    // 2. Insert into profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        grower_number: growerNumber,
        email: signUpEmail,
        role: 'customer' // Default role for new sign-ups
      });
    if (profileError) {
      setError(profileError.message);
      setIsLoading(false);
      return;
    }
    // 3. Redirect to customer dashboard
    router.push('/dashboard/customer');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - ReNu-Biome Marketing Image */}
      <div className="hidden lg:block w-3/5 min-h-screen relative">
        <Image
          src="/renu-biome-marketing.png"
          alt="ReNu-Biome - Nature inspired inputs for Sustainable Agriculture Production"
          fill
          className="object-contain object-left"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/5"></div>
      </div>

      {/* Right side - Minimal Login/Sign Up */}
      <div className="flex-1 flex items-center justify-center min-h-screen bg-white">
        <div className="w-full max-w-sm px-12 py-8 mx-auto flex flex-col justify-center lg:ml-0">
          {/* Official ReNu-Biome Logo */}
          <div className="text-center mb-6">
            <div className="mb-6 flex justify-center">
              <Image
                src="/renu-biome-logo-clean.png"
                alt="ReNu-Biome - Advanced Crop Nutrition"
                width={220}
                height={65}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Minimal Form */}
          {isSignUp ? (
            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-1/2">
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="h-11 px-0 border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-emerald-500 focus:ring-0 placeholder:text-gray-400 text-gray-900 w-full"
                      placeholder="First name"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="h-11 px-0 border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-emerald-500 focus:ring-0 placeholder:text-gray-400 text-gray-900 w-full"
                      placeholder="Last name"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Input
                    type="text"
                    value={growerNumber}
                    onChange={(e) => setGrowerNumber(e.target.value)}
                    className="h-11 px-0 border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-emerald-500 focus:ring-0 placeholder:text-gray-400 text-gray-900 w-full"
                    placeholder="Grower number"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    className="h-11 px-0 border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-emerald-500 focus:ring-0 placeholder:text-gray-400 text-gray-900 w-full"
                    placeholder="Email address"
                    required
                  />
                </div>
                <div className="relative">
                  <Input
                    type={showSignUpPassword ? "text" : "password"}
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="h-11 px-0 pr-8 border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-emerald-500 focus:ring-0 placeholder:text-gray-400 text-gray-900 w-full"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showSignUpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {error && (
                <div className="text-center text-sm text-red-600 font-medium pt-2">{error}</div>
              )}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white font-medium transition-all duration-200 group relative overflow-hidden"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Sign up</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 px-0 border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-emerald-500 focus:ring-0 placeholder:text-gray-400 text-gray-900"
                    placeholder="Email address"
                    required
                  />
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 px-0 pr-8 border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-emerald-500 focus:ring-0 placeholder:text-gray-400 text-gray-900"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                  Forgot password?
                </Link>
              </div>
              {error && (
                <div className="text-center text-sm text-red-600 font-medium pt-2">{error}</div>
              )}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white font-medium transition-all duration-200 group relative overflow-hidden"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Sign in</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
            </form>
          )}

          {/* Bottom link */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              {isSignUp ? (
                <>
                  Already have an account?{' '}
                  <button type="button" onClick={() => { setIsSignUp(false); setError(""); setIsLoading(false); }} className="text-emerald-600 hover:text-emerald-700 font-medium">
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button type="button" onClick={() => { setIsSignUp(true); setError(""); setIsLoading(false); }} className="text-emerald-600 hover:text-emerald-700 font-medium">
                    Sign up
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Minimal trust indicator */}
          <div className="text-center mt-8 pt-8 border-t border-gray-100">
            <p className="text-xs text-gray-400">Secured with 256-bit encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
}
