'use client' // Only for app router; remove if using pages router

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(false)
  
  // Login form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // Sign-up form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [growerNumber, setGrowerNumber] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')

  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
  
    const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password })
  
    if (error || !user) {
      setError(error?.message || 'Login failed')
      return
    }
  
    // Fetch role from profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
  
    if (profileError || !profile?.role) {
      setError('Unable to retrieve user role')
      return
    }
  
    // Redirect based on role
    if (profile.role === 'owner') {
      router.push('/dashboard/owner')
    } else if (profile.role === 'customer') {
      router.push('/dashboard/customer')
    } else {
      setError('Unknown user role')
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 1. Sign up the user
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email: signUpEmail,
      password: signUpPassword,
    })

    if (signUpError || !user) {
      setError(signUpError?.message || 'Sign-up failed')
      return
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
      })

    if (profileError) {
      setError(profileError.message)
      // Optional: clean up the user if profile creation fails
      // await supabase.auth.api.deleteUser(user.id)
      return
    }

    // 3. Redirect to customer dashboard
    router.push('/dashboard/customer')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side image */}
      <div className="hidden lg:flex w-1/2 items-center justify-end bg-white">
        <Image
          src="/left-side.jpeg"
          alt="Lush green field"
          width={600}
          height={800}
          className="rounded-xl object-cover"
          quality={90}
          priority
        />
      </div>
      
      {/* Right side form */}
      <div className="flex flex-1 flex-col justify-center min-h-screen px-8 py-12 lg:px-24">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center items-center gap-2">
            <Image
              alt="ReNu-Biome logo"
              src="/orange-checkmark.png"
              className="h-10 w-12"
              width={40}
              height={40}
            />
            <span className="text-4xl font-bold text-[#208A84] tracking-tight">ReNu-Biome</span>
          </div>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          {isSignUp ? (
            // Sign-up Form
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input id="firstName" name="firstName" type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#208A84] sm:text-sm" />
                  </div>
                </div>
                <div className="w-1/2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input id="lastName" name="lastName" type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#208A84] sm:text-sm" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="growerNumber" className="block text-sm font-medium text-gray-900">
                  Grower Number <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input id="growerNumber" name="growerNumber" type="text" required value={growerNumber} onChange={(e) => setGrowerNumber(e.target.value)} className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#208A84] sm:text-sm" />
                </div>
              </div>
              <div>
                <label htmlFor="signUpEmail" className="block text-sm font-medium text-gray-900">
                  Email address <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input id="signUpEmail" name="signUpEmail" type="email" required value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#208A84] sm:text-sm" />
                </div>
              </div>
              <div>
                <label htmlFor="signUpPassword"  className="block text-sm font-medium text-gray-900">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input id="signUpPassword" name="signUpPassword" type="password" required value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#208A84] sm:text-sm" />
                </div>
              </div>
              {error && <p className="text-sm text-red-600 text-center">{error}</p>}
              <button type="submit" className="flex w-full justify-center rounded-md bg-[#208A84] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1c6d5f]">
                Sign up
              </button>
            </form>
          ) : (
            // Login Form
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email address <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#208A84] sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-[#208A84] hover:text-[#1c6d5f]">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#208A84] sm:text-sm"
                  />
                </div>
              </div>
              {error && <p className="text-sm text-red-600 text-center">{error}</p>}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#208A84] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1c6d5f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#208A84]"
                >
                  Sign in
                </button>
              </div>
            </form>
          )}

          <p className="mt-10 text-center text-sm text-gray-500">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={() => { setIsSignUp(!isSignUp); setError(''); }} className="font-semibold leading-6 text-[#208A84] hover:text-[#1c6d5f]">
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
