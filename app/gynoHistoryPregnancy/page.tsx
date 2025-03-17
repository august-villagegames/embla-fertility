'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GynoHistoryPregnancy() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    totalPregnancies: '',
    miscarriages: '',
    ectopicPregnancies: '',
    electiveTerminations: '',
    fullTermLiveBirths: '',
    fullTermStillbirths: '',
    prematureLiveBirths: '',
    prematureStillbirths: '',
    birthDefects: '',
    birthDefectsExplanation: '',
    currentPartnerConceptions: '',
    fertilityTreatments: new Set<string>(),
    letrozoleCycles: '',
    fshCycles: '',
    otherExplanation: '',
    complications: new Set<string>(),
  });

  const handleFertilityTreatmentChange = (treatment: string) => {
    const newTreatments = new Set(formData.fertilityTreatments);
    if (newTreatments.has(treatment)) {
      newTreatments.delete(treatment);
    } else {
      newTreatments.add(treatment);
    }
    setFormData({ ...formData, fertilityTreatments: newTreatments });
  };

  const handleComplicationChange = (complication: string) => {
    const newComplications = new Set(formData.complications);
    if (newComplications.has(complication)) {
      newComplications.delete(complication);
    } else {
      newComplications.add(complication);
    }
    setFormData({ ...formData, complications: newComplications });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F6FBF4] p-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Gynecological History</h1>
        <h2 className="text-xl text-gray-700 mb-6">Pregnancy Summary</h2>
        
        <div className="space-y-6">
          {/* Pregnancy Numbers Section */}
          {[
            { label: 'Total number of pregnancies', key: 'totalPregnancies' },
            { label: 'Number of miscarriages (less than 20 weeks)', key: 'miscarriages' },
            { label: 'Number of ectopic/tubal pregnancies', key: 'ectopicPregnancies' },
            { label: 'Number of elective terminations (abortions)', key: 'electiveTerminations' },
            { label: 'Number of full term live births', key: 'fullTermLiveBirths' },
            { label: 'Number of full term stillborn births', key: 'fullTermStillbirths' },
            { label: 'Number of premature (less than 37 weeks) live births', key: 'prematureLiveBirths' },
            { label: 'Number of premature (less than 37 weeks) stillborn births', key: 'prematureStillbirths' },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-gray-700 mb-2">{field.label}</label>
              <input
                type="number"
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Type here..."
                value={formData[field.key as keyof typeof formData]}
                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
              />
            </div>
          ))}

          {/* Birth Defects Section */}
          <div>
            <label className="block text-gray-700 mb-2">Any pregnancies with birth defects?</label>
            <div className="flex gap-2">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({ ...formData, birthDefects: option })}
                  className={`px-4 py-2 rounded-full text-sm ${
                    formData.birthDefects === option
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {option}
                </button>
              ))}
            </div>
            {formData.birthDefects === 'Yes' && (
              <textarea
                className="mt-2 w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Please explain..."
                value={formData.birthDefectsExplanation}
                onChange={(e) => setFormData({ ...formData, birthDefectsExplanation: e.target.value })}
              />
            )}
          </div>

          {/* Current Partner Conceptions */}
          <div>
            <label className="block text-gray-700 mb-2">
              Were any of the previous conceptions with your current partner:
            </label>
            <div className="flex gap-2">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({ ...formData, currentPartnerConceptions: option })}
                  className={`px-4 py-2 rounded-full text-sm ${
                    formData.currentPartnerConceptions === option
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Fertility Treatments */}
          <div>
            <label className="block text-gray-700 mb-2">Past fertility treatment required:</label>
            <div className="space-y-3">
              {[
                'Clomiphene citrate',
                'Letrozole',
                'FSH injectable meds',
                'hCG injectable meds',
                'Intrauterine insemination',
                'IVF',
                'Other'
              ].map((treatment) => (
                <div key={treatment} className="flex items-center">
                  <button
                    onClick={() => handleFertilityTreatmentChange(treatment)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      formData.fertilityTreatments.has(treatment)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    } hover:bg-green-50 transition-colors`}
                  >
                    {treatment}
                  </button>
                  {treatment === 'Letrozole' && formData.fertilityTreatments.has('Letrozole') && (
                    <input
                      type="number"
                      className="ml-2 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Number of cycles..."
                      value={formData.letrozoleCycles}
                      onChange={(e) => setFormData({ ...formData, letrozoleCycles: e.target.value })}
                    />
                  )}
                  {treatment === 'FSH injectable meds' && formData.fertilityTreatments.has('FSH injectable meds') && (
                    <input
                      type="number"
                      className="ml-2 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Number of cycles..."
                      value={formData.fshCycles}
                      onChange={(e) => setFormData({ ...formData, fshCycles: e.target.value })}
                    />
                  )}
                </div>
              ))}
              {formData.fertilityTreatments.has('Other') && (
                <textarea
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Please explain..."
                  value={formData.otherExplanation}
                  onChange={(e) => setFormData({ ...formData, otherExplanation: e.target.value })}
                />
              )}
            </div>
          </div>

          {/* Complications */}
          <div>
            <label className="block text-gray-700 mb-2">
              Have you ever been diagnosed with any of the following complications:
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                'Gestational diabetes',
                'Hypertensive disorders',
                'Preterm delivery',
                'Placental disease',
                'Intrauterine growth restriction'
              ].map((complication) => (
                <button
                  key={complication}
                  onClick={() => handleComplicationChange(complication)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    formData.complications.has(complication)
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  } hover:bg-green-50 transition-colors`}
                >
                  {complication}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={() => router.push('/gynoHistoryMenstrual')}
              className="px-6 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            >
              Back
            </button>
            <button className="px-6 py-2 rounded-full bg-green-700 text-white hover:bg-green-800 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}