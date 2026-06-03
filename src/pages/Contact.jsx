import { useState } from "react";
import { sendContactForm } from "../services/contactService";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!form.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      const response = await sendContactForm(form);

      console.log("SUCCESS:", response?.data);

      alert("Message sent successfully!");

      // reset form
      setForm({
        name: "",
        email: "",
        message: ""
      });

      setErrors({});

    } catch (error) {
      console.error("ERROR:", error);

      alert(
        error?.response?.data?.message ||
        "Something went wrong while sending message"
      );

    } finally {
      setLoading(false);
    }
  }

  const isFormValid =
    form.name.trim() &&
    form.email.includes("@") &&
    form.message.trim();

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-100 px-4">

    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 space-y-5 border border-gray-100"
    >

      {/* TITLE */}
      <div className="text-center mb-2">
        <h2 className="text-3xl font-bold text-gray-800">
          Contact Us
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          We’ll get back to you as soon as possible
        </p>
      </div>

      {/* NAME */}
      <div>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className={`w-full px-4 py-3 rounded-xl border transition focus:outline-none focus:ring-2 ${
            errors.name
              ? "border-red-400 focus:ring-red-200"
              : "border-gray-200 focus:ring-indigo-200 focus:border-indigo-500"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* EMAIL */}
      <div>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          className={`w-full px-4 py-3 rounded-xl border transition focus:outline-none focus:ring-2 ${
            errors.email
              ? "border-red-400 focus:ring-red-200"
              : "border-gray-200 focus:ring-indigo-200 focus:border-indigo-500"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* MESSAGE */}
      <div>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows="5"
          className={`w-full px-4 py-3 rounded-xl border transition resize-none focus:outline-none focus:ring-2 ${
            errors.message
              ? "border-red-400 focus:ring-red-200"
              : "border-gray-200 focus:ring-indigo-200 focus:border-indigo-500"
          }`}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
        )}
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={!isFormValid || loading}
        className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
        } text-white`}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        )}

        {loading ? "Sending..." : "Send Message"}
      </button>

    </form>
  </div>
);}