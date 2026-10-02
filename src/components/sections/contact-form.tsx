"use client";

import { useState } from "react";
import { submitForm } from "@/lib/forms";
import { site } from "@/lib/site";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    timeline: "",
    craft: [] as string[],
    size: "",
    message: "",
  });

  const handleCraftToggle = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      craft: prev.craft.includes(val)
        ? prev.craft.filter((c) => c !== val)
        : [...prev.craft, val],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage("Please tell us about your space.");
      return;
    }

    setErrorMessage("");
    setStatus("submitting");

    const payload: Record<string, string> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      city: formData.city,
      timeline: formData.timeline,
      craft: formData.craft.join(", "),
      size: formData.size,
      message: formData.message,
    };

    const res = await submitForm({
      form: "contact",
      fields: payload,
    }).catch(() => ({ ok: false }));

    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(
        `Something went wrong while sending your enquiry. Please reach us directly via email at ${site.email} or WhatsApp.`
      );
    }
  };

  return (
    <>
      <form
        className="ct__form"
        id="enquiry"
        onSubmit={handleSubmit}
        noValidate
        hidden={status === "success"}
      >
      <div className="f-row">
        <label className="f">
          <span>
            Your name <i>*</i>
          </span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <label className="f">
          <span>
            Email <i>*</i>
          </span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </label>
      </div>

      <div className="f-row">
        <label className="f">
          <span>Phone or WhatsApp</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </label>
        <label className="f">
          <span>Company or brand</span>
          <input
            name="company"
            type="text"
            autoComplete="organization"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </label>
      </div>

      <div className="f-row">
        <label className="f">
          <span>City</span>
          <input
            name="city"
            type="text"
            autoComplete="address-level2"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </label>
        <label className="f">
          <span>Timeline</span>
          <select
            name="timeline"
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          >
            <option value="">Choose one</option>
            <option>As soon as possible</option>
            <option>In 1 to 3 months</option>
            <option>In 3 to 6 months</option>
            <option>Just exploring</option>
          </select>
        </label>
      </div>

      <fieldset className="f f--chips">
        <legend>What are you thinking of?</legend>
        <div className="chips">
          {["Mural", "Sculpture", "Augmented reality", "CGI and VFX", "Not sure yet"].map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                name="craft"
                value={item}
                checked={formData.craft.includes(item)}
                onChange={() => handleCraftToggle(item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="f">
        <span>Approximate size</span>
        <select
          name="size"
          value={formData.size}
          onChange={(e) => setFormData({ ...formData, size: e.target.value })}
        >
          <option value="">Choose one</option>
          <option>Under 500 sq ft</option>
          <option>500 to 2,000 sq ft</option>
          <option>2,000 to 10,000 sq ft</option>
          <option>More than 10,000 sq ft</option>
          <option>Not sure</option>
        </select>
      </label>

      <label className="f">
        <span>
          Tell us about your space <i>*</i>
        </span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Where is it, what is it used for, and what would you love people to feel there?"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </label>

      {/* spam trap */}
      <label className="f-trap" aria-hidden="true">
        Leave this empty
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
      </label>

      {errorMessage && (
        <p className="ct__error" role="alert">
          {errorMessage}
        </p>
      )}

      <button className="ct__submit" type="submit" disabled={status === "submitting"}>
        <span>{status === "submitting" ? "Sending…" : "Send enquiry"}</span>{" "}
        <b aria-hidden="true">→</b>
      </button>

      <p className="ct__note">
        We usually reply within two working days. Your details are only used to answer your
        enquiry.
      </p>
    </form>

    <div className="ct__done" id="formDone" hidden={status !== "success"} tabIndex={-1}>
      <p className="eyebrow">Enquiry sent</p>
      <h2>
        Thank you. <em>Your idea has taken off.</em>
      </h2>
      <p>
        We&apos;ve received your message and will get back to you soon. If it&apos;s urgent, message
        us on{" "}
        <a href="https://wa.me/918460349325" target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        .
      </p>
    </div>
  </>
  );
}
