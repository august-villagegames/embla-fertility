'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LifestyleAndSocial() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    caffeinatedBeverages: '',
    smokingStatus: '',
    cigarettesPerDay: '',
    smokingYears: '',
    quitYear: '',
    nonCombustionTobacco: '',
    secondHandSmoke: '',
    drinksAlcohol: '',
    alcoholConsumption: {
      beer: { selected: false, perWeek: '' },
      wine: { selected: false, perWeek: '' },
      liquor: { selected: false, perWeek: '' }
    },
    usesDrugs: '',
    exercisesRegularly: '',
    exercise: {
      moderate: { selected: false, hoursPerWeek: '' },
      vigorous: { selected: false, hoursPerWeek: '' }
    }
  });

  const handleAlcoholTypeChange = (type: 'beer' | 'wine' | 'liquor') => {
    setFormData({
      ...formData,
      alcoholConsumption: {
        ...formData.alcoholConsumption,
        [type]: {
          ...formData.alcoholConsumption[type],
          selected: !formData.alcoholConsumption[type].selected
        }
      }
    });
  };

  const handleAlcoholAmountChange = (type: 'beer' | 'wine' | 'liquor', amount: string) => {
    setFormData({
      ...formData,
      alcoholConsumption: {
        ...formData.alcoholConsumption,
        [type]: {
          ...formData.alcoholConsumption[type],
          perWeek: amount
        }
      }
    });
  };

  const handleExerciseTypeChange = (type: 'moderate' | 'vigorous') => {
    setFormData({
      ...formData,
      exercise: {
        ...formData.exercise,
        [type]: {
          ...formData.exercise[type],
          selected: !formData.exercise[type].selected
        }
      }
    });
  };

  const handleExerciseHoursChange = (type: 'moderate' | 'vigorous', hours: string) => {
    setFormData({
      ...formData,
      exercise: {
        ...formData.exercise,
        [type]: {
          ...formData.exercise[type],
          hoursPerWeek: hours
        }
      }
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F6FBF4] p-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Lifestyle and Social History</h1>
        
        <div className="space-y-6">
          {/* Caffeinated Beverages */}
          <div>
            <label className="block text-gray-700 mb-2">
              How many caffeinated beverages (coffee, tea, soda) do you drink per day?
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.caffeinatedBeverages}
              onChange={(e) => setFormData({ ...formData, caffeinatedBeverages: e.target.value })}
            />
          </div>

          {/* Smoking */}
          <div>
            <label className="block text-gray-700 mb-2">Do you or have you smoked cigarettes?</label>
            <div className="flex gap-2">
              {['Yes', 'No', 'Quit'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({ ...formData, smokingStatus: option })}
                  className={`px-4 py-2 rounded-full text-sm ${
                    formData.smokingStatus === option
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {option}
                </button>
              ))}
            </div>

            {formData.smokingStatus === 'Yes' && (
              <div className="mt-2 space-y-2">
                <input
                  type="number"
                  placeholder="How many per day?"
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.cigarettesPerDay}
                  onChange={(e) => setFormData({ ...formData, cigarettesPerDay: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="How many years?"
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.smokingYears}
                  onChange={(e) => setFormData({ ...formData, smokingYears: e.target.value })}
                />
              </div>
            )}

            {formData.smokingStatus === 'Quit' && (
              <input
                type="number"
                placeholder="Year?"
                className="mt-2 w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.quitYear}
                onChange={(e) => setFormData({ ...formData, quitYear: e.target.value })}
              />
            )}
          </div>

          {/* Non-combustion Tobacco */}
          <div>
            <label className="block text-gray-700 mb-2">
              Do you use non-combustion tobacco products, such as vapes, oral sachets, or other, including for cessation?
            </label>
            <div className="flex gap-2">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({ ...formData, nonCombustionTobacco: option })}
                  className={`px-4 py-2 rounded-full text-sm ${
                    formData.nonCombustionTobacco === option
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Second-hand Smoke */}
          <div>
            <label className="block text-gray-700 mb-2">Are you exposed to second-hand smoke?</label>
            <div className="flex gap-2">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({ ...formData, secondHandSmoke: option })}
                  className={`px-4 py-2 rounded-full text-sm ${
                    formData.secondHandSmoke === option
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Alcohol */}
          <div>
            <label className="block text-gray-700 mb-2">Do you drink alcohol?</label>
            <div className="flex gap-2 mb-4">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({ ...formData, drinksAlcohol: option })}
                  className={`px-4 py-2 rounded-full text-sm ${
                    formData.drinksAlcohol === option
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {option}
                </button>
              ))}
            </div>

            {formData.drinksAlcohol === 'Yes' && (
              <div className="space-y-2">
                {(['beer', 'wine', 'liquor'] as const).map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.alcoholConsumption[type].selected}
                      onChange={() => handleAlcoholTypeChange(type)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <label className="capitalize">{type}</label>
                    {formData.alcoholConsumption[type].selected && (
                      <input
                        type="number"
                        placeholder="# per week"
                        className="ml-2 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={formData.alcoholConsumption[type].perWeek}
                        onChange={(e) => handleAlcoholAmountChange(type, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drugs */}
          <div>
            <label className="block text-gray-700 mb-2">
              Do you use marijuana, cocaine, or any other similar drug?
            </label>
            <div className="flex gap-2">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({ ...formData, usesDrugs: option })}
                  className={`px-4 py-2 rounded-full text-sm ${
                    formData.usesDrugs === option
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Exercise */}
          <div>
            <label className="block text-gray-700 mb-2">Do you exercise regularly?</label>
            <div className="flex gap-2 mb-4">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({ ...formData, exercisesRegularly: option })}
                  className={`px-4 py-2 rounded-full text-sm ${
                    formData.exercisesRegularly === option
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {option}
                </button>
              ))}
            </div>

            {formData.exercisesRegularly === 'Yes' && (
              <div className="space-y-2">
                {([
                  { type: 'moderate' as const, label: 'Moderate (i.e. walking, yoga)' },
                  { type: 'vigorous' as const, label: 'Vigorous (i.e. running)' }
                ]).map(({ type, label }) => (
                  <div key={type} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.exercise[type].selected}
                      onChange={() => handleExerciseTypeChange(type)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <label>{label}</label>
                    {formData.exercise[type].selected && (
                      <input
                        type="number"
                        placeholder="Hours per week"
                        className="ml-2 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={formData.exercise[type].hoursPerWeek}
                        onChange={(e) => handleExerciseHoursChange(type, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={() => router.push('/familyHistory')}
              className="px-6 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            >
              Back
            </button>
            <button 
              className="px-6 py-2 rounded-full bg-green-700 text-white hover:bg-green-800 transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}