import { useState } from "react";
import { sendContactForm } from "../services/contactService";

import InputField from "../components/InputField";
import TextAreaField from "../components/TextAreaField";
import {Button} from "../components/Button";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔁 Handle input changes (single source of truth)
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  // 🧠 Validation engine
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

  // 🚀 Submit handler
  async function handleSubmit(e) {
    e.preventDefault();
 console.log("SUBMIT FIRED");
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
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 space-y-5 bg-white shadow-xl rounded-2xl"
      >

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Contact Us
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            We’ll get back to you soon
          </p>
        </div>

        {/* INPUTS */}
        <InputField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
          error={errors.name}
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          error={errors.email}
        />

        <TextAreaField
          label="Message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Write your message..."
          error={errors.message}
        />

        {/* BUTTON */}
        <Button
          type="submit"
          loading={loading}
          disabled={!isFormValid}
        >
          Send Message
        </Button>

      </form>

    </div>
  );
}