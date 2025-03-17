'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Demographics() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ageGroup: '',
    ethnicity: '',
    maritalStatus: '',
    genderIdentity: '',
  });

  const ageGroups = [
    'Under 24',
    '25 to 29',
    '30 to 34',
    '35 to 39',
    '40 to 44',
    '45 to 49',
    '50 or higher'
  ];

  const ethnicities = [
    'Black or African American',
    'East Asian',
    'Hispanic or Latino',
    'Middle Eastern or Northern African',
    'Native American or American Indian',
    'Native Hawaiian or other Pacific Islander',
    'South Asian',
    'Southeast Asian',
    'White or Caucasian',
    'Other'
  ];

  const maritalStatuses = [
    'Single or never married',
    'Married or in a domestic partnership'
  ];

  const genderIdentities = [
    'Male',
    'Female',
    'Transgender',
    'Non-binary',
    'Other'
  ];

  const handleSingleSelect = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F6FBF4] p-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Basic Information</h1>
        
        <div className="space-y-6">
          {/* Age Group */}
          <div>
            <label className="block text-gray-700 mb-2">What is your age group?</label>
            <div className="space-y-2">
              {ageGroups.map((age) => (
                <button
                  key={age}
                  onClick={() => handleSingleSelect('ageGroup', age)}
                  className={`w-full px-4 py-2 rounded-full text-sm text-left ${
                    formData.ageGroup === age
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          {/* Ethnicity */}
          <div>
            <label className="block text-gray-700 mb-2">Which of the following best describes your ethnicity?</label>
            <div className="space-y-2">
              {ethnicities.map((ethnicity) => (
                <button
                  key={ethnicity}
                  onClick={() => handleSingleSelect('ethnicity', ethnicity)}
                  className={`w-full px-4 py-2 rounded-full text-sm text-left ${
                    formData.ethnicity === ethnicity
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {ethnicity}
                </button>
              ))}
            </div>
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-gray-700 mb-2">What is your marital status?</label>
            <div className="space-y-2">
              {maritalStatuses.map((status) => (
                <button
                  key={status}
                  onClick={() => handleSingleSelect('maritalStatus', status)}
                  className={`w-full px-4 py-2 rounded-full text-sm text-left ${
                    formData.maritalStatus === status
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Gender Identity */}
          <div>
            <label className="block text-gray-700 mb-2">How would you describe your gender identity?</label>
            <div className="space-y-2">
              {genderIdentities.map((gender) => (
                <button
                  key={gender}
                  onClick={() => handleSingleSelect('genderIdentity', gender)}
                  className={`w-full px-4 py-2 rounded-full text-sm text-left ${
                    formData.genderIdentity === gender
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors">
              Back
            </button>
            <button 
              onClick={() => router.push('/fertilityHistoryConception')}
              className="px-6 py-2 rounded-full bg-green-700 text-white hover:bg-green-800 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}