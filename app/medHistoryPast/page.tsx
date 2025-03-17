'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MedHistoryPast() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    endocrineDisorders: new Set<string>(),
    disorderDetails: {} as Record<string, string>,
    hadSurgeries: '',
    surgeries: [{ year: '', type: '', reason: '' }],
    anesthesiaProblems: '',
    anesthesiaExplanation: ''
  });

  const endocrineOptions = [
    'Polycystic Ovary Syndrome (PCOS)',
    'Thyroid Disorders',
    'Diabetes',
    'Hyperprolactinemia',
    "Cushing's Syndrome",
    "Adrenal Insufficiency (Addison's Disease)",
    'Hypopituitarism'
  ];

  const handleEndocrineChange = (disorder: string) => {
    const newDisorders = new Set(formData.endocrineDisorders);
    if (newDisorders.has(disorder)) {
      newDisorders.delete(disorder);
      const { [disorder]: _, ...rest } = formData.disorderDetails;
      setFormData({
        ...formData,
        endocrineDisorders: newDisorders,
        disorderDetails: rest
      });
    } else {
      newDisorders.add(disorder);
      setFormData({
        ...formData,
        endocrineDisorders: newDisorders
      });
    }
  };

  const updateDisorderDetails = (disorder: string, details: string) => {
    setFormData({
      ...formData,
      disorderDetails: {
        ...formData.disorderDetails,
        [disorder]: details
      }
    });
  };

  const handleSurgeryChange = (index: number, field: string, value: string) => {
    const newSurgeries = [...formData.surgeries];
    newSurgeries[index] = { ...newSurgeries[index], [field]: value };

    // Add new row if all fields in the last row are filled
    if (index === newSurgeries.length - 1 &&
        newSurgeries[index].year &&
        newSurgeries[index].type &&
        newSurgeries[index].reason) {
      newSurgeries.push({ year: '', type: '', reason: '' });
    }

    setFormData({ ...formData, surgeries: newSurgeries });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F6FBF4] p-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Medical History</h1>
        
        <div className="space-y-6">
          {/* Endocrine Disorders */}
          <div>
            <label className="block text-gray-700 mb-2">
              Have you ever been diagnosed with any endocrine disorders?
            </label>
            <div className="space-y-2">
              {endocrineOptions.map((disorder) => (
                <div key={disorder}>
                  <button
                    onClick={() => handleEndocrineChange(disorder)}
                    className={`w-full px-4 py-2 rounded-full text-sm text-left ${
                      formData.endocrineDisorders.has(disorder)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    } hover:bg-green-50 transition-colors`}
                  >
                    {disorder}
                  </button>
                  
                  {formData.endocrineDisorders.has(disorder) && (
                    <div className="mt-2 ml-4">
                      <input
                        type="text"
                        placeholder="Status, medications, and last hormonal testing..."
                        className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={formData.disorderDetails[disorder] || ''}
                        onChange={(e) => updateDisorderDetails(disorder, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Surgeries */}
          <div>
            <label className="block text-gray-700 mb-2">Have you had any surgeries?</label>
            <div className="flex gap-2 mb-4">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({ ...formData, hadSurgeries: option })}
                  className={`px-4 py-2 rounded-full text-sm ${
                    formData.hadSurgeries === option
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {option}
                </button>
              ))}
            </div>

            {formData.hadSurgeries === 'Yes' && (
              <div className="space-y-2">
                {formData.surgeries.map((surgery, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Year"
                      className="w-24 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={surgery.year}
                      onChange={(e) => handleSurgeryChange(index, 'year', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Type of surgery"
                      className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={surgery.type}
                      onChange={(e) => handleSurgeryChange(index, 'type', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Reason"
                      className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={surgery.reason}
                      onChange={(e) => handleSurgeryChange(index, 'reason', e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Anesthesia Problems */}
          <div>
            <label className="block text-gray-700 mb-2">Did you have any problems with anesthesia?</label>
            <div className="flex gap-2">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({ ...formData, anesthesiaProblems: option })}
                  className={`px-4 py-2 rounded-full text-sm ${
                    formData.anesthesiaProblems === option
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {formData.anesthesiaProblems === 'Yes' && (
              <textarea
                placeholder="Please explain..."
                className="mt-2 w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.anesthesiaExplanation}
                onChange={(e) => setFormData({ ...formData, anesthesiaExplanation: e.target.value })}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={() => router.push('/gynoHistoryPregnancy')}
              className="px-6 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            >
              Back
            </button>
            <button 
              onClick={() => router.push('/medHistoryMedicationsAllergies')}
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