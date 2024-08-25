"use client";
import React, { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_GENERAL_TOKEN;

export default function Component() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#eee] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#fff] rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-2">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <p className="text-gray-600 mb-6">
          {isLogin ? "Enter your credentials to login" : "Create a new account"}
        </p>
        {isLogin ? <LoginForm /> : <SignUpForm />}
        <button
          className="mt-4 text-blue-500 hover:text-blue-700"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      // Save tokens in localStorage
      localStorage.setItem("userID", data.userID);
      localStorage.setItem("generalToken", data.generalToken);
      if (data.admin && data.restrictedToken) {
        localStorage.setItem("restrictedToken", data.restrictedToken);
      }

      // Redirect to home page
      window.location.href = "/";
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-[#ccc] shadow-sm p-2"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-[#ccc] shadow-sm p-2"
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#fff] bg-[#f33] hover:bg-[#d11] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d33]"
      >
        Login
      </button>
    </form>
  );
}

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`
        },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) {
        throw new Error("Sign up failed");
      }

      setSuccess(true);
    } catch (err) {
      setError("Failed to create account. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-[#ccc] shadow-sm p-2"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-[#ccc] shadow-sm p-2"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-[#ccc] shadow-sm p-2"
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {success && (
        <div className="text-green-500">Account created successfully!</div>
      )}
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#fff] bg-[#f33] hover:bg-[#d11] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d33]"
      >
        Sign Up
      </button>
    </form>
  );
}
