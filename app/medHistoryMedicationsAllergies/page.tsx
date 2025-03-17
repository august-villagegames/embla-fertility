'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MedHistoryMedicationsAllergies() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    gonadotoxicMeds: '',
    gonadotoxicExplanation: '',
    takesMedication: '',
    medications: [{ name: '', strength: '', frequency: '', reason: '' }],
    hasAllergies: '',
    allergies: [{ medication: '', reaction: '' }]
  });

  const handleMedicationChange = (index: number, field: string, value: string) => {
    const newMedications = [...formData.medications];
    newMedications[index] = { ...newMedications[index], [field]: value };

    // Add new row if any field in the last row has a value
    if (index === newMedications.length - 1 && 
        (newMedications[index].name || 
         newMedications[index].strength || 
         newMedications[index].frequency || 
         newMedications[index].reason)) {
      newMedications.push({ name: '', strength: '', frequency: '', reason: '' });
    }

    setFormData({ ...formData, medications: newMedications });
  };

  const handleAllergyChange = (index: number, field: string, value: string) => {
    const newAllergies = [...formData.allergies];
    newAllergies[index] = { ...newAllergies[index], [field]: value };

    // Add new row if any field in the last row has a value
    if (index === newAllergies.length - 1 && 
        (newAllergies[index].medication || newAllergies[index].reaction)) {
      newAllergies.push({ medication: '', reaction: '' });
    }

    setFormData({ ...formData, allergies: newAllergies });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F6FBF4] p-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Medical History</h1>
        
        <div className="space-y-6">
          {/* Gonadotoxic Medications */}
          <div>
            <label className="block text-gray-700 mb-2">
              Have you ever taken gonadotoxic medications or been given radiotherapy?
            </label>
            <div className="flex gap-2">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({ ...formData, gonadotoxicMeds: option })}
                  className={`px-4 py-2 rounded-full text-sm ${
                    formData.gonadotoxicMeds === option
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {formData.gonadotoxicMeds === 'Yes' && (
              <textarea
                placeholder="Please explain..."
                className="mt-2 w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.gonadotoxicExplanation}
                onChange={(e) => setFormData({ ...formData, gonadotoxicExplanation: e.target.value })}
              />
            )}
          </div>

          {/* Current Medications */}
          <div>
            <label className="block text-gray-700 mb-2">Do you currently take any medication?</label>
            <div className="flex gap-2 mb-4">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({ ...formData, takesMedication: option })}
                  className={`px-4 py-2 rounded-full text-sm ${
                    formData.takesMedication === option
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {option}
                </button>
              ))}
            </div>

            {formData.takesMedication === 'Yes' && (
              <div className="space-y-2">
                {formData.medications.map((medication, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Medication"
                      className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={medication.name}
                      onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Strength/dose"
                      className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={medication.strength}
                      onChange={(e) => handleMedicationChange(index, 'strength', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Frequency"
                      className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={medication.frequency}
                      onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Reason"
                      className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={medication.reason}
                      onChange={(e) => handleMedicationChange(index, 'reason', e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Allergies */}
          <div>
            <label className="block text-gray-700 mb-2">Do you have any allergies to medications or drugs?</label>
            <div className="flex gap-2 mb-4">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({ ...formData, hasAllergies: option })}
                  className={`px-4 py-2 rounded-full text-sm ${
                    formData.hasAllergies === option
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {option}
                </button>
              ))}
            </div>

            {formData.hasAllergies === 'Yes' && (
              <div className="space-y-2">
                {formData.allergies.map((allergy, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Name of medication"
                      className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={allergy.medication}
                      onChange={(e) => handleAllergyChange(index, 'medication', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Reaction"
                      className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={allergy.reaction}
                      onChange={(e) => handleAllergyChange(index, 'reaction', e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={() => router.push('/medHistoryPast')}
              className="px-6 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            >
              Back
            </button>
            <button 
              onClick={() => router.push('/familyHistory')}
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