import { useState } from 'react';
import { isPast, isWeekend, parseISO } from 'date-fns';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from '../components/Navbar';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    tattooStyle: '',
    description: '',
    status: 'pending'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const tattooStyles = [
    'Traditional',
    'Realism',
    'Watercolor',
    'Japanese',
    'Tribal',
    'Geometric',
    'Blackwork',
    'Neo-Traditional',
    'Ostalo...'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateDate = (dateString) => {
    if (!dateString) return 'Date is required';
    
    const date = parseISO(dateString);
    if (isPast(date)) return 'Cannot select past dates';
    if (isWeekend(date)) return 'We are closed on weekends';
    
    return '';
  };

  const validateTime = (timeString) => {
    if (!timeString) return 'Time is required';
    
    const [hours, minutes] = timeString.split(':').map(Number);
    const timeValue = hours * 60 + minutes;
    

    if (timeValue < 600 || timeValue > 1320) {
      return 'Molimo vas izaberite vreme između 10:00 - 22:00';
    }
    
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.clientName.trim()) newErrors.clientName = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    
    const dateError = validateDate(formData.date);
    if (dateError) newErrors.date = dateError;
    
    const timeError = validateTime(formData.time);
    if (timeError) newErrors.time = timeError;
    
    if (!formData.tattooStyle) newErrors.tattooStyle = 'Style is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      // Save to Firestore
      await addDoc(collection(db, "appointments"), {
        clientName: formData.clientName,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        tattooStyle: formData.tattooStyle,
        description: formData.description,
        status: 'pending',
        createdAt: new Date()
      });

      setSubmitSuccess(true);
      setFormData({
        clientName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        tattooStyle: '',
        description: '',
        status: 'pending'
      });
    } catch (error) {
      console.error("Error saving booking:", error);
      setErrors({ 
        submit: 'Failed to save booking. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-950 py-16 px-4">
        <div className="pt-20 pb-10">
          <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
            <div className="text-green-600 text-2xl font-bold mb-4">Uspešno ste zakazali termin!</div>
            <p className="text-gray-700 mb-6">
              Hvala vam na poverenju. Naš tim će vas u najkraćem roku kontaktirati radi potvrde svih detalja.
            </p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200"
            >
              Zakaži Još Termina
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="pt-20 pb-10"> 
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Zakažite termin za tetovažu</h1>
          
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
                Ime i prezime
              </label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.clientName 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-black'
                }`}
              />
              {errors.clientName && (
                <p className="mt-1 text-sm text-red-600">{errors.clientName}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-black'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Broj telefona
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.phone 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-black'
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Izaberite dan
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={handleChange}
                  onBlur={() => {
                    if (formData.date) {
                      const dateError = validateDate(formData.date);
                      setErrors(prev => ({ ...prev, date: dateError }));
                    }
                  }}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.date 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-black'
                  }`}
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Izaberite vreme (10:00 - 22:00)
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  onBlur={() => {
                    if (formData.time) {
                      const timeError = validateTime(formData.time);
                      setErrors(prev => ({ ...prev, time: timeError }));
                    }
                  }}
                  min="10:00"
                  max="22:00"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.time 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-black'
                }`}
                />
                {errors.time && (
                  <p className="mt-1 text-sm text-red-600">{errors.time}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="tattooStyle" className="block text-sm font-medium text-gray-700 mb-1">
                Stil tetovaže
              </label>
              <select
                id="tattooStyle"
                name="tattooStyle"
                value={formData.tattooStyle}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.tattooStyle 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-black'
                }`}
              >
                <option value="">Izaberite stil</option>
                {tattooStyles.map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
              {errors.tattooStyle && (
                <p className="mt-1 text-sm text-red-600">{errors.tattooStyle}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Opis tetovaže 
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.description 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-black'
                }`}
                placeholder="Opisite svoju ideju tetovaze, velicinu..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
              } transition duration-200`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : 'Zakaži termin'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;