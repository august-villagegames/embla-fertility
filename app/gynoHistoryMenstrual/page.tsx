'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GynoHistoryMenstrual() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstPeriodAge: '',
    cyclePatterns: new Set<string>(),
    daysBetweenPeriods: '',
    daysOfBleeding: '',
    crampingPain: '',
    symptoms: new Set<string>(),
  });

  const handlePatternChange = (pattern: string) => {
    const newPatterns = new Set(formData.cyclePatterns);
    if (newPatterns.has(pattern)) {
      newPatterns.delete(pattern);
    } else {
      newPatterns.add(pattern);
    }
    setFormData({ ...formData, cyclePatterns: newPatterns });
  };

  const handleSymptomChange = (symptom: string) => {
    const newSymptoms = new Set(formData.symptoms);
    if (newSymptoms.has(symptom)) {
      newSymptoms.delete(symptom);
    } else {
      newSymptoms.add(symptom);
    }
    setFormData({ ...formData, symptoms: newSymptoms });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F6FBF4] p-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Gynecological History</h1>
        
        <div className="space-y-6">
          {/* Age of First Period */}
          <div>
            <label className="block text-gray-700 mb-2">Age when you had your first period</label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Type here..."
              value={formData.firstPeriodAge}
              onChange={(e) => setFormData({ ...formData, firstPeriodAge: e.target.value })}
            />
          </div>

          {/* Menstrual Cycle Patterns */}
          <div>
            <label className="block text-gray-700 mb-2">Menstrual cycle patterns (check all that apply):</label>
            <div className="flex flex-wrap gap-2">
              {[
                'Regular periods',
                'Irregular periods',
                'Spotting before periods',
                'No periods',
                'Heavy periods',
                'Light periods',
                'Bleeding between periods'
              ].map((pattern) => (
                <button
                  key={pattern}
                  onClick={() => handlePatternChange(pattern)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    formData.cyclePatterns.has(pattern)
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {pattern}
                </button>
              ))}
            </div>
          </div>

          {/* Days Between Periods */}
          <div>
            <label className="block text-gray-700 mb-2">
              Number of days between the start of one period and the start of the next:
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Type here..."
              value={formData.daysBetweenPeriods}
              onChange={(e) => setFormData({ ...formData, daysBetweenPeriods: e.target.value })}
            />
          </div>

          {/* Days of Bleeding */}
          <div>
            <label className="block text-gray-700 mb-2">How many days of bleeding do you have?</label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Type here..."
              value={formData.daysOfBleeding}
              onChange={(e) => setFormData({ ...formData, daysOfBleeding: e.target.value })}
            />
          </div>

          {/* Cramping Pain */}
          <div>
            <label className="block text-gray-700 mb-2">
              Do you have severe cramping or pelvic pain with your periods?
            </label>
            <div className="flex flex-wrap gap-2">
              {['Yes', 'No', 'Always', 'Sometimes', 'Recently', 'In the past'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({ ...formData, crampingPain: option })}
                  className={`px-4 py-2 rounded-full text-sm ${
                    formData.crampingPain === option
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Symptoms */}
          <div>
            <label className="block text-gray-700 mb-2">
              Do you have any of the following symptoms before your periods?
            </label>
            <div className="flex flex-wrap gap-2">
              {['Breast tenderness', 'Bloating', 'Acne', 'Constipation'].map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => handleSymptomChange(symptom)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    formData.symptoms.has(symptom)
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {symptom}
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
              onClick={() => router.push('/gynoHistoryPregnancy')}
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