'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FertilityHistoryConception() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    stage: '',
    monthsTrying: '',
    intercourseFrequency: '',
    usedOvulationKits: '',
    usedAppsWearables: '',
    sexualDysfunction: new Set<string>(),
  });

  const stages = [
    'Not actively trying',
    'Passively trying',
    'Thinking about trying in the future',
    'Trying soon',
    'Currently trying',
    'Currently pregnant'
  ];

  const dysfunctionOptions = [
    'Decreased libido',
    'Erectile dysfunction (partner)',
    'Ejaculatory dysfunction (partner)',
    'Painful intercourse',
    'Vaginismus'
  ];

  const handleStageSelect = (stage: string) => {
    setFormData({ ...formData, stage });
  };

  const handleDysfunctionChange = (dysfunction: string) => {
    const newDysfunction = new Set(formData.sexualDysfunction);
    if (newDysfunction.has(dysfunction)) {
      newDysfunction.delete(dysfunction);
    } else {
      newDysfunction.add(dysfunction);
    }
    setFormData({ ...formData, sexualDysfunction: newDysfunction });
  };

  const showTryingQuestions = formData.stage === 'Currently trying';
  const showDysfunctionQuestion = ['Currently trying', 'Passively trying', 'Thinking about trying in the future', 'Trying soon'].includes(formData.stage);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F6FBF4] p-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Fertility History</h1>
        
        <div className="space-y-6">
          {/* Stage of Fertility Journey */}
          <div>
            <label className="block text-gray-700 mb-2">What stage of the fertility journey are you in?</label>
            <div className="space-y-2">
              {stages.map((stage) => (
                <button
                  key={stage}
                  onClick={() => handleStageSelect(stage)}
                  className={`w-full px-4 py-2 rounded-full text-sm text-left ${
                    formData.stage === stage
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>

          {/* Conditional Questions for Currently Trying */}
          {showTryingQuestions && (
            <>
              {/* Months Trying */}
              <div>
                <label className="block text-gray-700 mb-2">
                  How many months have you been trying (regular unprotected intercourse)?
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter number of months..."
                  value={formData.monthsTrying}
                  onChange={(e) => setFormData({ ...formData, monthsTrying: e.target.value })}
                />
              </div>

              {/* Intercourse Frequency */}
              <div>
                <label className="block text-gray-700 mb-2">
                  How many times do you have intercourse per week?
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter frequency..."
                  value={formData.intercourseFrequency}
                  onChange={(e) => setFormData({ ...formData, intercourseFrequency: e.target.value })}
                />
              </div>

              {/* Ovulation Kits */}
              <div>
                <label className="block text-gray-700 mb-2">
                  Have you used over-the-counter ovulation kits to time intercourse?
                </label>
                <div className="flex gap-2">
                  {['Yes', 'No'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setFormData({ ...formData, usedOvulationKits: option })}
                      className={`px-4 py-2 rounded-full text-sm ${
                        formData.usedOvulationKits === option
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      } hover:bg-green-50 transition-colors`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Apps/Wearables */}
              <div>
                <label className="block text-gray-700 mb-2">
                  Have you used ovulation apps or wearables to time intercourse?
                </label>
                <div className="flex gap-2">
                  {['Yes', 'No'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setFormData({ ...formData, usedAppsWearables: option })}
                      className={`px-4 py-2 rounded-full text-sm ${
                        formData.usedAppsWearables === option
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      } hover:bg-green-50 transition-colors`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Sexual Dysfunction */}
          {showDysfunctionQuestion && (
            <div>
              <label className="block text-gray-700 mb-2">
                Select any sexual dysfunction issues you regularly experience:
              </label>
              <div className="flex flex-wrap gap-2">
                {dysfunctionOptions.map((dysfunction) => (
                  <button
                    key={dysfunction}
                    onClick={() => handleDysfunctionChange(dysfunction)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      formData.sexualDysfunction.has(dysfunction)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    } hover:bg-green-50 transition-colors`}
                  >
                    {dysfunction}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={() => router.push('/demographics')}
              className="px-6 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            >
              Back
            </button>
            <button 
              onClick={() => router.push('/fertilityHistoryContraception')}
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