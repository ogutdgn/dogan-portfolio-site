import { useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface UseContactFormReturn {
  formData: ContactFormData;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  updateField: (field: keyof ContactFormData, value: string) => void;
  submitForm: () => Promise<void>;
  resetForm: () => void;
}

export function useContactForm(): UseContactFormReturn {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null); // Clear error when user starts typing
    if (isSuccess) setIsSuccess(false); // Clear success when user starts typing
  };

  const submitForm = async () => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setError(result.error || 'An error occurred');
      }
    } catch (err) {
      setError('Connection error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setError(null);
    setIsSuccess(false);
    setIsLoading(false);
  };

  return {
    formData,
    isLoading,
    isSuccess,
    error,
    updateField,
    submitForm,
    resetForm,
  };
}
