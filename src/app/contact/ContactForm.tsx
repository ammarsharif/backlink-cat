'use client';

import { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send message');
      }

      setIsSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
  };

  return (
    <div className="bg-white rounded-[35px] w-full max-w-[900px] shadow-[0_0px_14px_rgba(0,0,0,0.16)] border border-[#A29999] px-8 py-8 md:px-12 md:py-10">
      {isSuccess && (
        <div className="mb-5 p-4 bg-green-50 text-green-700 rounded-[5px] border border-green-200 text-[15px]">
          Thank you! Your message has been sent successfully.
        </div>
      )}
      {serverError && (
        <div className="mb-5 p-4 bg-red-50 text-red-600 rounded-[5px] border border-red-200 text-[15px]">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1 relative">
            <label className="block text-[14px] md:text-[15px] font-bold text-black mb-1.5">First Name*</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full h-[48px] md:h-[54px] bg-white border ${errors.firstName ? 'border-red-500' : 'border-[#E5E5E5]'} rounded-[5px] px-4 shadow-sm focus:outline-none focus:border-[#6EBD44] text-[15px] transition-colors`}
            />
            {errors.firstName && <span className="absolute -bottom-5 left-0 text-[12px] text-red-500 font-medium">{errors.firstName}</span>}
          </div>
          <div className="flex-1">
            <label className="block text-[14px] md:text-[15px] font-bold text-black mb-1.5">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full h-[48px] md:h-[54px] bg-white border border-[#E5E5E5] rounded-[5px] px-4 shadow-sm focus:outline-none focus:border-[#6EBD44] text-[15px] transition-colors"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-[14px] md:text-[15px] font-bold text-black mb-1.5">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full h-[48px] md:h-[54px] bg-white border ${errors.email ? 'border-red-500' : 'border-[#E5E5E5]'} rounded-[5px] px-4 shadow-sm focus:outline-none focus:border-[#6EBD44] text-[15px] transition-colors`}
          />
          {errors.email && <span className="absolute -bottom-5 left-0 text-[12px] text-red-500 font-medium">{errors.email}</span>}
        </div>

        <div className="relative">
          <label className="block text-[14px] md:text-[15px] font-bold text-black mb-1.5">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`w-full h-[130px] md:h-[160px] bg-white border ${errors.message ? 'border-red-500' : 'border-[#E5E5E5]'} rounded-[5px] p-4 shadow-sm resize-none focus:outline-none focus:border-[#6EBD44] placeholder:text-[#B3B3B3] text-[15px] transition-colors`}
            placeholder="I'm interested in learning more about...."
          />
          {errors.message && <span className="absolute -bottom-5 left-0 text-[12px] text-red-500 font-medium">{errors.message}</span>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#6EBD44] text-white h-[56px] md:h-[64px] rounded-[5px] text-[18px] md:text-[20px] font-bold mt-1 hover:bg-[#5da539] active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
