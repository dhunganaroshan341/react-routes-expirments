import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("LOGIN DATA:", form);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4"
      >

        <h2 className="text-2xl font-bold text-center">
          Login
        </h2>

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border rounded"
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>

      </form>
    </div>
  );
}