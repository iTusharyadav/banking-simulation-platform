import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useBankingSystem } from "../Context/UserContext";
import SyncLoader from "react-spinners/SyncLoader";

const ContactUs = () => {
  const navigateTo = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const { BASE_URL } = useBankingSystem();

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!email || !subject || !body) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      setIsLoading(true);
      const data = { email, subject, body };
      const resp = await axios.post(`${BASE_URL}/api/v1/user/mail`, data);

      if (resp.status === 200) {
        toast.success("Mail sent successfully!");
        handleReset();
      } else {
        toast.error("Unknown error occurred!");
      }
    } catch (err) {
      toast.error("Failed to send mail. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setEmail("");
    setSubject("");
    setBody("");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-20">
          <SyncLoader size={18} color="#5145CD" />
        </div>
      )}

      <section className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Contact Us
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Got a technical issue? Need help or details about our services?
          <br />
          We’d love to hear from you.
        </p>

        <form onSubmit={handleSendMail} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="How can we help?"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Your Message
            </label>
            <textarea
              id="message"
              rows={6}
              placeholder="Write your message here..."
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-60"
            >
              Send Message
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ContactUs;
