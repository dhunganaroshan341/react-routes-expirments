import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // input handler
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  // validation function
  function validateForm() {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.includes("@")) {
      newErrors.email = "Valid email is required";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  }

  // submit handler
  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);

      // simulate API request (like Laravel backend)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("FORM DATA:", form);
      alert("Message sent successfully!");

      // reset form
      setForm({
        name: "",
        email: "",
        message: ""
      });

      setErrors({});
    } finally {
      setLoading(false);
    }
  }

  const isFormValid =
    form.name.trim() &&
    form.email.includes("@") &&
    form.message.trim();

  return (
    <div style={{ maxWidth: "400px" }}>
      <h2>Contact Page</h2>

      <form onSubmit={handleSubmit}>

        {/* NAME */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            style={{
              border: errors.name ? "1px solid red" : "1px solid #ccc"
            }}
          />
          {errors.name && (
            <p style={{ color: "red" }}>{errors.name}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={{
              border: errors.email ? "1px solid red" : "1px solid #ccc"
            }}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email}</p>
          )}
        </div>

        {/* MESSAGE */}
        <div>
          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            style={{
              border: errors.message ? "1px solid red" : "1px solid #ccc"
            }}
          />
          {errors.message && (
            <p style={{ color: "red" }}>{errors.message}</p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={!isFormValid || loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}