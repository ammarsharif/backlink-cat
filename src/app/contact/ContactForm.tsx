'use client';

import { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      }, 1000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="bg-white rounded-[35px] w-full max-w-[967px] shadow-[0_0px_14px_rgba(0,0,0,0.16)] border border-[#A29999] p-8 md:p-12 lg:p-16">
      {isSuccess && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-[5px] border border-green-200 font-[var(--font-inter)]">
          Thank you! Your message has been sent successfully.
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 lg:gap-8 relative">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 relative">
            <label className="block text-[14px] md:text-[16px] font-bold text-black mb-2">First Name*</label>
            <input 
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full h-[50px] md:h-[60px] bg-white border ${errors.firstName ? 'border-red-500' : 'border-[#E5E5E5]'} rounded-[5px] px-4 shadow-sm focus:outline-none focus:border-[#6EBD44]`} 
            />
            {errors.firstName && <span className="absolute -bottom-5 left-0 text-[12px] text-red-500 font-medium">{errors.firstName}</span>}
          </div>
          <div className="flex-1 relative">
            <label className="block text-[14px] md:text-[16px] font-bold text-black mb-2">Last Name</label>
            <input 
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full h-[50px] md:h-[60px] bg-white border border-[#E5E5E5] rounded-[5px] px-4 shadow-sm focus:outline-none focus:border-[#6EBD44]" 
            />
          </div>
        </div>
        
        <div className="relative">
          <label className="block text-[14px] md:text-[16px] font-bold text-black mb-2">Email*</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full h-[50px] md:h-[60px] bg-white border ${errors.email ? 'border-red-500' : 'border-[#E5E5E5]'} rounded-[5px] px-4 shadow-sm focus:outline-none focus:border-[#6EBD44]`} 
          />
          {errors.email && <span className="absolute -bottom-5 left-0 text-[12px] text-red-500 font-medium">{errors.email}</span>}
        </div>

        <div className="relative">
          <label className="block text-[14px] md:text-[16px] font-bold text-black mb-2">Message</label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`w-full h-[150px] md:h-[200px] bg-white border ${errors.message ? 'border-red-500' : 'border-[#E5E5E5]'} rounded-[5px] p-4 shadow-sm resize-none focus:outline-none focus:border-[#6EBD44] placeholder:text-[#B3B3B3] text-[15px]`}
            placeholder="I'm interested in learning more about...."
          />
          {errors.message && <span className="absolute -bottom-5 left-0 text-[12px] text-red-500 font-medium">{errors.message}</span>}
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#6EBD44] text-white h-[60px] md:h-[70px] rounded-[5px] text-[18px] md:text-[20px] font-bold mt-4 hover:bg-[#5da539] transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
