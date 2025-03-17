'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FertilityHistoryPriorFertility() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    attemptedBefore: '',
    attemptDuration: '',
    priorEvaluations: new Set<string>(),
    abnormalResults: new Set<string>(),
  });

  const evaluationOptions = [
    'Urine ovulation predictor kits',
    'TSH',
    'FSH blood test',
    'AMH level',
    'Semen analysis',
    'Hysterosalpingogram',
    'Pelvic ultrasound',
    'Sonohysterography',
    'Hysteroscopy'
  ];

  const handleEvaluationChange = (evaluation: string) => {
    const newEvaluations = new Set(formData.priorEvaluations);
    if (newEvaluations.has(evaluation)) {
      newEvaluations.delete(evaluation);
      const newAbnormal = new Set(formData.abnormalResults);
      newAbnormal.delete(evaluation);
      setFormData({ 
        ...formData, 
        priorEvaluations: newEvaluations,
        abnormalResults: newAbnormal
      });
    } else {
      newEvaluations.add(evaluation);
      setFormData({ 
        ...formData, 
        priorEvaluations: newEvaluations 
      });
    }
  };

  const handleAbnormalChange = (evaluation: string) => {
    const newAbnormal = new Set(formData.abnormalResults);
    if (newAbnormal.has(evaluation)) {
      newAbnormal.delete(evaluation);
    } else {
      newAbnormal.add(evaluation);
    }
    setFormData({ ...formData, abnormalResults: newAbnormal });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F6FBF4] p-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Fertility History</h1>
        
        <div className="space-y-6">
          {/* Prior Conception Attempts */}
          <div>
            <label className="block text-gray-700 mb-2">Have you ever attempted conception before?</label>
            <div className="flex gap-2">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({ ...formData, attemptedBefore: option })}
                  className={`px-4 py-2 rounded-full text-sm ${
                    formData.attemptedBefore === option
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Duration of Attempts */}
          {formData.attemptedBefore === 'Yes' && (
            <div>
              <label className="block text-gray-700 mb-2">How many months did you attempt conception?</label>
              <input
                type="number"
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter number of months..."
                value={formData.attemptDuration}
                onChange={(e) => setFormData({ ...formData, attemptDuration: e.target.value })}
              />
            </div>
          )}

          {/* Prior Evaluations */}
          <div>
            <label className="block text-gray-700 mb-2">Prior fertility evaluation:</label>
            <div className="space-y-2">
              {evaluationOptions.map((evaluation) => (
                <div key={evaluation} className="flex items-center gap-4">
                  <button
                    onClick={() => handleEvaluationChange(evaluation)}
                    className={`flex-grow px-4 py-2 rounded-full text-sm text-left ${
                      formData.priorEvaluations.has(evaluation)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    } hover:bg-green-50 transition-colors`}
                  >
                    {evaluation}
                  </button>
                  {formData.priorEvaluations.has(evaluation) && (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`abnormal-${evaluation}`}
                        checked={formData.abnormalResults.has(evaluation)}
                        onChange={() => handleAbnormalChange(evaluation)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <label htmlFor={`abnormal-${evaluation}`} className="text-sm text-gray-600">
                        Abnormal
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={() => router.push('/fertilityHistoryContraception')}
              className="px-6 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            >
              Back
            </button>
            <button 
              onClick={() => router.push('/gynoHistoryMenstrual')}
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