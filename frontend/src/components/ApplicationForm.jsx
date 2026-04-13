import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.collegeName || 
        !formData.course || !formData.year || !formData.areaOfInterest || !formData.motivation) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/applications/submit`, formData);
      
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
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(error.response?.data?.detail || 'Failed to submit application. Please try again.');
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
              </div>
              <div>
                <Label htmlFor="year" className="text-slate-300 mb-2 block">Year of Study *</Label>
                <Select onValueChange={(value) => handleSelectChange('year', value)} value={formData.year}>
                  <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white focus:border-amber-500">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                    <SelectItem value="Final Year">Final Year</SelectItem>
                    <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Area of Interest */}
            <div>
              <Label htmlFor="areaOfInterest" className="text-slate-300 mb-2 block">Area of Interest *</Label>
              <Select onValueChange={(value) => handleSelectChange('areaOfInterest', value)} value={formData.areaOfInterest}>
                <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white focus:border-amber-500">
                  <SelectValue placeholder="Select your primary interest" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="AI & Machine Learning">AI & Machine Learning</SelectItem>
                  <SelectItem value="Patent Research">Patent Research</SelectItem>
                  <SelectItem value="Startup & Entrepreneurship">Startup & Entrepreneurship</SelectItem>
                  <SelectItem value="Academic Research">Academic Research</SelectItem>
                  <SelectItem value="Innovation Development">Innovation Development</SelectItem>
                  <SelectItem value="IP Management">IP Management</SelectItem>
                </SelectContent>
              </Select>
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
