import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { Loader2, CheckCircle, Send } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    collegeName: '',
    course: '',
    year: '',
    areaOfInterest: '',
    motivation: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else {
      const cleanPhone = formData.phone.replace(/\D/g, '');
      if (cleanPhone.length < 10) {
        newErrors.phone = 'Phone must be at least 10 digits';
      }
    }

    if (!formData.collegeName.trim()) {
      newErrors.collegeName = 'College name is required';
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Course is required';
    }

    if (!formData.year) {
      newErrors.year = 'Year is required';
    }

    if (!formData.areaOfInterest) {
      newErrors.areaOfInterest = 'Area of interest is required';
    }

    if (!formData.motivation.trim()) {
      newErrors.motivation = 'Motivation is required';
    } else if (formData.motivation.trim().length < 10) {
      newErrors.motivation = 'Please provide more details (at least 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submitted, validating...');
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    setIsSubmitting(true);

    try {
      // Clean phone number
      const cleanPhone = formData.phone.replace(/\D/g, '');
      
      const submissionData = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: cleanPhone,
        collegeName: formData.collegeName.trim(),
        course: formData.course.trim(),
        year: formData.year,
        areaOfInterest: formData.areaOfInterest,
        motivation: formData.motivation.trim()
      };

      console.log('Submitting data:', submissionData);
      
      const response = await axios.post(`${BACKEND_URL}/api/applications/submit`, submissionData);
      
      console.log('Response:', response.data);
      
      if (response.data.success) {
        setIsSubmitted(true);
        toast.success('Application submitted successfully!');
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            collegeName: '',
            course: '',
            year: '',
            areaOfInterest: '',
            motivation: ''
          });
          setIsSubmitted(false);
          setErrors({});
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      const errorMessage = error.response?.data?.detail || 'Failed to submit application. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="application" className="py-20 relative overflow-hidden bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-green-500/50 rounded-2xl p-12">
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">Application Submitted!</h3>
            <p className="text-slate-300 text-lg">
              Thank you for applying to the Patent & Research Internship Program. 
              We'll review your application and get back to you soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="application" className="py-20 relative overflow-hidden bg-slate-900">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
      
      {/* Background Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Apply <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Now</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Start your journey to becoming an innovation leader
          </p>
        </div>

        {/* Form */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <Label htmlFor="fullName" className="text-slate-300 mb-2 block">Full Name *</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500"
                required
              />
              {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
            </div>

            {/* Email and Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email" className="text-slate-300 mb-2 block">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500"
                  required
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="phone" className="text-slate-300 mb-2 block">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500"
                  required
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* College Name */}
            <div>
              <Label htmlFor="collegeName" className="text-slate-300 mb-2 block">College/University Name *</Label>
              <Input
                id="collegeName"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                placeholder="Enter your institution name"
                className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500"
                required
              />
              {errors.collegeName && <p className="text-red-400 text-sm mt-1">{errors.collegeName}</p>}
            </div>

            {/* Course and Year */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="course" className="text-slate-300 mb-2 block">Course/Program *</Label>
                <Input
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="e.g., B.Tech CSE, M.Sc Physics"
                  className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500"
                  required
                />
                {errors.course && <p className="text-red-400 text-sm mt-1">{errors.course}</p>}
              </div>
              <div>
                <Label htmlFor="year" className="text-slate-300 mb-2 block">Year of Study *</Label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-md px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                >
                  <option value="">Select year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Final Year">Final Year</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
                {errors.year && <p className="text-red-400 text-sm mt-1">{errors.year}</p>}
              </div>
            </div>

            {/* Area of Interest */}
            <div>
              <Label htmlFor="areaOfInterest" className="text-slate-300 mb-2 block">Area of Interest *</Label>
              <select
                id="areaOfInterest"
                name="areaOfInterest"
                value={formData.areaOfInterest}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-md px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                required
              >
                <option value="">Select your primary interest</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Patent Research">Patent Research</option>
                <option value="Startup & Entrepreneurship">Startup & Entrepreneurship</option>
                <option value="Academic Research">Academic Research</option>
                <option value="Innovation Development">Innovation Development</option>
                <option value="IP Management">IP Management</option>
              </select>
              {errors.areaOfInterest && <p className="text-red-400 text-sm mt-1">{errors.areaOfInterest}</p>}
            </div>

            {/* Motivation */}
            <div>
              <Label htmlFor="motivation" className="text-slate-300 mb-2 block">Why do you want to join this internship? *</Label>
              <Textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                placeholder="Tell us about your motivation and what you hope to achieve..."
                rows={5}
                className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 resize-none"
                required
              />
              {errors.motivation && <p className="text-red-400 text-sm mt-1">{errors.motivation}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-lg py-6 rounded-xl shadow-lg shadow-amber-500/30"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            </div>

            <p className="text-sm text-slate-500 text-center mt-4">
              By submitting this form, you agree to our terms and conditions
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
