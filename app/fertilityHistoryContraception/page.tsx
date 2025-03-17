'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FertilityHistoryContraception() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    contraceptionMethods: new Set<string>(),
    methodDates: {} as Record<string, { startDate: string; endDate: string; complications: boolean }>,
    tubesTied: '',
    tubesTiedDates: {
      dateTied: '',
      dateUntied: '',
      complications: false
    }
  });

  const contraceptionMethods = [
    'None',
    'Condoms',
    'Diaphram',
    'IUD',
    'Birth control pills',
    'Injectable contraception',
    'Skin patch',
    'Other'
  ];

  const handleMethodChange = (method: string) => {
    const newMethods = new Set(formData.contraceptionMethods);
    if (newMethods.has(method)) {
      newMethods.delete(method);
      const { [method]: _, ...rest } = formData.methodDates;
      setFormData({
        ...formData,
        contraceptionMethods: newMethods,
        methodDates: rest
      });
    } else {
      newMethods.add(method);
      setFormData({
        ...formData,
        contraceptionMethods: newMethods,
        methodDates: {
          ...formData.methodDates,
          [method]: { startDate: '', endDate: '', complications: false }
        }
      });
    }
  };

  const updateMethodDates = (method: string, field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      methodDates: {
        ...formData.methodDates,
        [method]: {
          ...formData.methodDates[method],
          [field]: value
        }
      }
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F6FBF4] p-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Fertility History</h1>
        
        <div className="space-y-6">
          {/* Prior Contraception Methods */}
          <div>
            <label className="block text-gray-700 mb-2">Prior contraception methods:</label>
            <div className="space-y-4">
              {contraceptionMethods.map((method) => (
                <div key={method}>
                  <button
                    onClick={() => handleMethodChange(method)}
                    className={`w-full px-4 py-2 rounded-full text-sm text-left ${
                      formData.contraceptionMethods.has(method)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    } hover:bg-green-50 transition-colors`}
                  >
                    {method}
                  </button>
                  
                  {formData.contraceptionMethods.has(method) && method !== 'None' && (
                    <div className="mt-2 ml-4 space-y-2">
                      <div className="flex gap-4">
                        <div>
                          <label className="block text-sm text-gray-600">Start Date (MM/YYYY)</label>
                          <input
                            type="text"
                            placeholder="MM/YYYY"
                            className="mt-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={formData.methodDates[method]?.startDate || ''}
                            onChange={(e) => updateMethodDates(method, 'startDate', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600">End Date (MM/YYYY)</label>
                          <input
                            type="text"
                            placeholder="MM/YYYY"
                            className="mt-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={formData.methodDates[method]?.endDate || ''}
                            onChange={(e) => updateMethodDates(method, 'endDate', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`complications-${method}`}
                          checked={formData.methodDates[method]?.complications || false}
                          onChange={(e) => updateMethodDates(method, 'complications', e.target.checked)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <label htmlFor={`complications-${method}`} className="text-sm text-gray-600">
                          Complications?
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tubes Tied */}
          <div>
            <label className="block text-gray-700 mb-2">Have you ever had your tubes tied?</label>
            <div className="space-y-4">
              <div className="flex gap-2">
                {['Yes', 'No'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setFormData({ ...formData, tubesTied: option })}
                    className={`px-4 py-2 rounded-full text-sm ${
                      formData.tubesTied === option
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    } hover:bg-green-50 transition-colors`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {formData.tubesTied === 'Yes' && (
                <div className="ml-4 space-y-4">
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-sm text-gray-600">Date Tied (MM/YYYY)</label>
                      <input
                        type="text"
                        placeholder="MM/YYYY"
                        className="mt-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={formData.tubesTiedDates.dateTied}
                        onChange={(e) => setFormData({
                          ...formData,
                          tubesTiedDates: { ...formData.tubesTiedDates, dateTied: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Date Untied (MM/YYYY)</label>
                      <input
                        type="text"
                        placeholder="MM/YYYY"
                        className="mt-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={formData.tubesTiedDates.dateUntied}
                        onChange={(e) => setFormData({
                          ...formData,
                          tubesTiedDates: { ...formData.tubesTiedDates, dateUntied: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="tubes-complications"
                      checked={formData.tubesTiedDates.complications}
                      onChange={(e) => setFormData({
                        ...formData,
                        tubesTiedDates: { ...formData.tubesTiedDates, complications: e.target.checked }
                      })}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor="tubes-complications" className="text-sm text-gray-600">
                      Complications?
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={() => router.push('/fertilityHistoryConception')}
              className="px-6 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            >
              Back
            </button>
            <button 
              onClick={() => router.push('/fertilityHistoryPriorFertility')}
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