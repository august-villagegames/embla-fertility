'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FamilyHistory() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    conditions: new Set<string>(),
    relationships: {} as Record<string, string>,
  });

  const conditions = [
    'Diabetes',
    'Neurologic (brain/spine)',
    'Thyroid problems',
    'High blood pressure',
    'Heart disease',
    'Glaucoma',
    'Blood clots',
    'Gallstones',
    'Obesity',
    'Hepatitis',
    'Psychiatric conditions',
    'Tuberculosis',
    'Infertility',
    'Endometriosis',
    'Menopause before age 40',
    'Genetic Disease',
    'Cystic Fibrosis',
    'Irritable Bowel Syndrome',
    'Cancer',
    'Other'
  ];

  const handleConditionChange = (condition: string) => {
    const newConditions = new Set(formData.conditions);
    if (newConditions.has(condition)) {
      newConditions.delete(condition);
      const { [condition]: _, ...rest } = formData.relationships;
      setFormData({
        ...formData,
        conditions: newConditions,
        relationships: rest
      });
    } else {
      newConditions.add(condition);
      setFormData({
        ...formData,
        conditions: newConditions
      });
    }
  };

  const updateRelationship = (condition: string, relationship: string) => {
    setFormData({
      ...formData,
      relationships: {
        ...formData.relationships,
        [condition]: relationship
      }
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F6FBF4] p-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Family History</h1>
        
        <div className="space-y-6">
          {/* Family Conditions */}
          <div>
            <label className="block text-gray-700 mb-2">Do you have any family history of the following:</label>
            <div className="space-y-2">
              {conditions.map((condition) => (
                <div key={condition}>
                  <button
                    onClick={() => handleConditionChange(condition)}
                    className={`w-full px-4 py-2 rounded-full text-sm text-left ${
                      formData.conditions.has(condition)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    } hover:bg-green-50 transition-colors`}
                  >
                    {condition}
                  </button>
                  
                  {formData.conditions.has(condition) && (
                    <div className="mt-2 ml-4">
                      <input
                        type="text"
                        placeholder="Relationship to family member..."
                        className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={formData.relationships[condition] || ''}
                        onChange={(e) => updateRelationship(condition, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={() => router.push('/medHistoryMedicationsAllergies')}
              className="px-6 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            >
              Back
            </button>
            <button 
              onClick={() => router.push('/lifestyleAndSocial')}
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