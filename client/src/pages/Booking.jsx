import { useState } from 'react';
import { isPast, isWeekend, parseISO } from 'date-fns';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase'
import Navbar from '../components/Navbar'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    tattooStyle: '',
    description: '',
    status: 'pending',
    referenceImage: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, referenceImage: 'Please upload an image file (JPEG, PNG, GIF, WEBP)' }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, referenceImage: 'Image must be less than 5MB' }));
        return;
      }

      setFormData(prev => ({ ...prev, referenceImage: file }));
      setErrors(prev => ({ ...prev, referenceImage: '' }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, referenceImage: null }));
    setImagePreview(null);
    setErrors(prev => ({ ...prev, referenceImage: '' }));
  };

  const validateDate = (dateString) => {
    if (!dateString) return 'Date is required';
    
    const date = parseISO(dateString);
    if (isPast(date)) return 'Cannot select past dates';
    if (isWeekend(date)) return 'We are closed on weekends';
    
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.clientName.trim()) newErrors.clientName = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    
    const dateError = validateDate(formData.date);
    if (dateError) newErrors.date = dateError;
    
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.tattooStyle) newErrors.tattooStyle = 'Style is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      let imageUrl = '';
      
      // Upload image if provided
      if (formData.referenceImage) {
        const imageRef = ref(storage, `reference-images/${Date.now()}_${formData.referenceImage.name}`);
        const snapshot = await uploadBytes(imageRef, formData.referenceImage);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Save to Firestore
      await addDoc(collection(db, "appointments"), {
        clientName: formData.clientName,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        tattooStyle: formData.tattooStyle,
        description: formData.description,
        referenceImage: imageUrl,
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
        status: 'pending',
        referenceImage: null
      });
      setImagePreview(null);
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
        <Navbar />
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
                  Izaberite vreme
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
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

            <div>
              <label htmlFor="referenceImage" className="block text-sm font-medium text-gray-700 mb-1">
                Referentna slika (opciono)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                {!imagePreview ? (
                  <div>
                    <input
                      type="file"
                      id="referenceImage"
                      name="referenceImage"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="referenceImage"
                      className="cursor-pointer text-blue-600 hover:text-blue-800"
                    >
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="mt-1 text-sm text-gray-600">
                        Kliknite za upload slike ili prevucite ovde
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF do 5MB
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto max-h-48 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              {errors.referenceImage && (
                <p className="mt-1 text-sm text-red-600">{errors.referenceImage}</p>
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
              ) : 'Book Appointment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;