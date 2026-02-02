"use client";

import { useState, FormEvent } from "react";
import { ThemeColors } from "@/app/types";
import { sendContactMessage } from "@/app/services/api";
import { getContrastColor } from "../utils/theme";

interface ContactFormProps {
  companyId: string;
  colors: ThemeColors;
}

export default function ContactForm({ companyId, colors }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const textColor = colors.textColor || getContrastColor(colors.backgroundColor);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // Get reCAPTCHA token
      // const token = await new Promise<string>((resolve, reject) => {
      //   if (typeof window !== "undefined" && window.grecaptcha?.enterprise) {
      //     window.grecaptcha.enterprise.ready(() => {
      //       window.grecaptcha.enterprise
      //         .execute("6Lf2cMErAAAAAHVQxezb60U3dNSU1G04MtWpn21Z", {
      //           action: "contact_form",
      //         })
      //         .then(resolve)
      //         .catch(reject);
      //     });
      //   } else {
      //     reject(new Error("reCAPTCHA not loaded"));
      //   }
      // });

      await sendContactMessage(companyId, {
        companyId,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        // token,
      });

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = {
    backgroundColor: "transparent",
    borderBottom: `1px solid ${textColor}33`,
    color: textColor,
    padding: "1rem 0",
    width: "100%",
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="text-xs uppercase tracking-widest mb-2 block opacity-60"
          style={{ color: textColor }}
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={inputStyles}
          className="focus:border-current"
          placeholder="Ihr Name"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="text-xs uppercase tracking-widest mb-2 block opacity-60"
          style={{ color: textColor }}
        >
          E-Mail
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={inputStyles}
          className="focus:border-current"
          placeholder="ihre@email.ch"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="text-xs uppercase tracking-widest mb-2 block opacity-60"
          style={{ color: textColor }}
        >
          Nachricht
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          style={inputStyles}
          className="focus:border-current resize-none"
          placeholder="Ihre Nachricht..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="display uppercase tracking-widest text-sm px-8 py-4 transition-all duration-300 disabled:opacity-50"
        style={{
          backgroundColor: colors.accentColor,
          color: getContrastColor(colors.accentColor),
        }}
      >
        {isSubmitting ? "WIRD GESENDET..." : "NACHRICHT SENDEN"}
      </button>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <p className="text-green-600 text-sm">
          Ihre Nachricht wurde erfolgreich gesendet!
        </p>
      )}
      {submitStatus === "error" && (
        <p className="text-red-600 text-sm">{errorMessage}</p>
      )}
    </form>
  );
}

// Extend Window interface for reCAPTCHA
// declare global {
//   interface Window {
//     grecaptcha: {
//       enterprise: {
//         ready: (callback: () => void) => void;
//         execute: (
//           siteKey: string,
//           options: { action: string }
//         ) => Promise<string>;
//       };
//     };
//   }
// }
