// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import {
  Building2,
  Home,
  CheckCircle,
  XCircle,
  ChevronLeft,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { createClient } from '@/lib/supabase/client';

type BuildingType = 'purpose-built' | 'converted-house' | null;
type RadioOption = 'yes' | 'no' | null;

interface FormData {
  totalFlats: number | '';
  buildingType: BuildingType;
  nonResidentialPercentage: number;
  nonResidentialKnown: boolean;
  flatsWithLongLeases: number | '';
  residentLandlord: RadioOption;
  localAuthorityLandlord: RadioOption;
}

interface EligibilityResult {
  isEligible: boolean;
  reasons: Array<{
    criterion: string;
    passed: boolean;
    explanation: string;
    statute: string;
  }>;
  ineligibilityReasons: string[];
}

export default function RTMCheckerPage() {
  const [step, setStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    totalFlats: '',
    buildingType: null,
    nonResidentialPercentage: 0,
    nonResidentialKnown: false,
    flatsWithLongLeases: '',
    residentLandlord: null,
    localAuthorityLandlord: null,
  });
  const [eligibilityResult, setEligibilityResult] = useState<EligibilityResult | null>(null);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [rowId, setRowId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supabase = createClient();

  // Eligibility logic
  const calculateEligibility = (): EligibilityResult => {
    const totalFlats = typeof formData.totalFlats === 'number' ? formData.totalFlats : 0;
    const flatsWithLongLeases = typeof formData.flatsWithLongLeases === 'number' ? formData.flatsWithLongLeases : 0;
    const requiredLongLeaseFractions = Math.ceil(totalFlats * (2 / 3));

    const reasons = [];
    const ineligibilityReasons = [];

    // Criterion 1: Minimum 2 flats
    const minFlatsPass = totalFlats >= 2;
    reasons.push({
      criterion: 'Minimum number of flats',
      passed: minFlatsPass,
      explanation: minFlatsPass
        ? `Your building has ${totalFlats} flats, meeting the minimum requirement.`
        : 'Your building must have at least 2 flats to qualify for RTM.',
      statute: 's.72(1)(a) CLRA 2002',
    });
    if (!minFlatsPass) {
      ineligibilityReasons.push('Building has fewer than 2 flats');
    }

    // Criterion 2: Non-residential ≤ 25%
    const nonResidentialPass = formData.nonResidentialPercentage <= 25;
    reasons.push({
      criterion: 'Non-residential use limit',
      passed: nonResidentialPass,
      explanation: nonResidentialPass
        ? `Your building is ${formData.nonResidentialPercentage}% non-residential, meeting the 25% limit under s.72 CLRA 2002.`
        : `Your building is ${formData.nonResidentialPercentage}% non-residential. The statutory limit is 25%.`,
      statute: 's.72(1)(b) CLRA 2002',
    });
    if (!nonResidentialPass) {
      ineligibilityReasons.push(`Non-residential use exceeds 25% (currently ${formData.nonResidentialPercentage}%)`);
    }

    // Criterion 3: At least 2/3 of flats on long leases
    const longLeasePass = flatsWithLongLeases >= requiredLongLeaseFractions;
    reasons.push({
      criterion: 'Long lease requirement',
      passed: longLeasePass,
      explanation: longLeasePass
        ? `${flatsWithLongLeases} of your ${totalFlats} flats are on long leases (need at least ${requiredLongLeaseFractions}).`
        : `Only ${flatsWithLongLeases} of your ${totalFlats} flats are on long leases. At least ${requiredLongLeaseFractions} are required.`,
      statute: 's.72(1)(c) CLRA 2002',
    });
    if (!longLeasePass) {
      ineligibilityReasons.push(`Insufficient flats on long leases (${flatsWithLongLeases}/${requiredLongLeaseFractions})`);
    }

    // Criterion 4: Resident landlord restriction (converted houses only, ≤4 flats)
    const residentLandlordPass =
      formData.buildingType === 'purpose-built' || // Always allowed for purpose-built
      !(
        formData.buildingType === 'converted-house' &&
        totalFlats <= 4 &&
        formData.residentLandlord === 'yes'
      );
    reasons.push({
      criterion: 'Resident landlord restriction',
      passed: residentLandlordPass,
      explanation: residentLandlordPass
        ? formData.buildingType === 'purpose-built'
          ? 'Purpose-built blocks are not subject to the resident landlord restriction.'
          : formData.residentLandlord === 'no'
            ? 'Your converted house with a non-resident landlord is eligible under s.72(1)(d) CLRA 2002.'
            : totalFlats > 4
              ? 'Converted houses with more than 4 flats are exempt from the resident landlord restriction.'
              : 'No resident landlord issue detected.'
        : 'Converted houses with 4 or fewer flats cannot use RTM if the landlord lives in one of the flats.',
      statute: 's.72(1)(d) CLRA 2002',
    });
    if (!residentLandlordPass) {
      ineligibilityReasons.push('Resident landlord restriction applies (converted house, ≤4 flats, resident landlord)');
    }

    // Criterion 5: Council landlord always fails
    const councilLandlordPass = formData.localAuthorityLandlord !== 'yes';
    reasons.push({
      criterion: 'Landlord type',
      passed: councilLandlordPass,
      explanation: councilLandlordPass
        ? 'Your landlord is not a local authority, meeting RTM requirements.'
        : 'RTM cannot be used against a local authority landlord.',
      statute: 's.72 CLRA 2002',
    });
    if (!councilLandlordPass) {
      ineligibilityReasons.push('Local authority landlord — RTM not available');
    }

    const isEligible = minFlatsPass && nonResidentialPass && longLeasePass && residentLandlordPass && councilLandlordPass;

    return { isEligible, reasons, ineligibilityReasons };
  };

  const handleSubmitResults = async () => {
    if (!eligibilityResult) return;

    setIsSubmitting(true);
    try {
      const totalFlats = typeof formData.totalFlats === 'number' ? formData.totalFlats : 0;
      const response = await supabase.from('eligibility_checks').insert([
        {
          total_flats: totalFlats,
          is_purpose_built: formData.buildingType === 'purpose-built',
          non_residential_percentage: formData.nonResidentialPercentage,
          flats_with_long_leases: typeof formData.flatsWithLongLeases === 'number' ? formData.flatsWithLongLeases : 0,
          has_resident_landlord: formData.residentLandlord === 'yes',
          local_authority_landlord: formData.localAuthorityLandlord === 'yes',
          is_eligible: eligibilityResult.isEligible,
          ineligibility_reasons: eligibilityResult.ineligibilityReasons,
          checker_type: 'rtm',
        },
      ]).select();

      if (response.data && response.data[0]) {
        setRowId(response.data[0].id);
      }
    } catch (error) {
      console.error('Error saving eligibility check:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rowId || !email) return;

    try {
      await supabase
        .from('eligibility_checks')
        .update({ email_address: email })
        .eq('id', rowId);
      setEmail('');
      setEmailSubmitted(true);
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.totalFlats !== '' && typeof formData.totalFlats === 'number' && formData.totalFlats >= 2;
      case 2:
        return formData.buildingType !== null;
      case 3:
        return true; // Always valid, checkbox provides default
      case 4:
        return (
          formData.flatsWithLongLeases !== '' &&
          typeof formData.flatsWithLongLeases === 'number' &&
          formData.flatsWithLongLeases <= (typeof formData.totalFlats === 'number' ? formData.totalFlats : 0)
        );
      case 5:
        return formData.residentLandlord !== null && formData.localAuthorityLandlord !== null;
      default:
        return false;
    }
  };

  const handleContinue = () => {
    if (step === 5) {
      const result = calculateEligibility();
      setEligibilityResult(result);
      setShowResults(true);
      handleSubmitResults();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const costPerFlat = 299;
  const totalFlats = typeof formData.totalFlats === 'number' ? formData.totalFlats : 1;
  const totalCost = costPerFlat * totalFlats;
  const consentFlats = Math.ceil(totalFlats * 0.5);

  if (showResults && eligibilityResult) {
    return (
      <div className="flex flex-col min-h-screen bg-stone-50">
        <Nav />
        <main className="flex-grow py-12 md:py-20">
          <div className="container mx-auto max-w-3xl px-4">
            {/* Result Banner */}
            {eligibilityResult.isEligible ? (
              <div className="mb-12 rounded-lg bg-emerald-50 border border-emerald-200 p-8">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-2">
                      Your building qualifies for Right to Manage!
                    </h2>
                    <p className="text-emerald-800 text-lg mb-4">
                      You have all the statutory criteria to pursue RTM at your building.
                    </p>
                    <div className="space-y-2 text-emerald-700">
                      <p>
                        <strong>Consents needed:</strong> You'll need consent from at least {consentFlats} of your {totalFlats} flat owners.
                      </p>
                      <p>
                        <strong>FlatRights cost:</strong> £{costPerFlat}/flat (£{totalCost.toLocaleString()} total)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-12 rounded-lg bg-red-50 border border-red-200 p-8">
                <div className="flex items-start gap-4">
                  <XCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-red-900 mb-2">
                      Your building may not qualify for RTM
                    </h2>
                    <p className="text-red-800">
                      Based on your answers, one or more statutory criteria are not met. See the breakdown below for details.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Eligibility Breakdown */}
            <div className="bg-white rounded-lg border border-stone-200 p-8 mb-12">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Eligibility breakdown</h3>
              <div className="space-y-6">
                {eligibilityResult.reasons.map((reason, idx) => (
                  <div key={idx} className="pb-6 border-b border-stone-200 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3 mb-2">
                      {reason.passed ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-grow">
                        <h4 className="font-semibold text-slate-900">{reason.criterion}</h4>
                        <p className="text-sm text-stone-600 mt-1">{reason.explanation}</p>
                        <p className="text-xs italic text-stone-500 mt-2">{reason.statute}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA if eligible */}
            {eligibilityResult.isEligible && (
              <div className="bg-white rounded-lg border border-stone-200 p-8 mb-12">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Ready to take control of your building?
                </h3>
                <p className="text-stone-600 mb-6">
                  Our RTM service guides you through every statutory step, deadline, and document.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                    <div className="text-2xl font-bold text-teal-700 mb-1">£{costPerFlat}</div>
                    <div className="text-sm text-stone-600">FlatRights guidance (£{totalCost.toLocaleString()} total)</div>
                  </div>
                  <div className="p-4 rounded-lg bg-teal-50 border border-teal-200">
                    <div className="text-2xl font-bold text-teal-700 mb-1">£398</div>
                    <div className="text-sm text-stone-600">with solicitor review (per flat)</div>
                  </div>
                </div>
                <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white py-6">
                  Get started with RTM
                </Button>
              </div>
            )}

            {/* Email Capture */}
            <div className="bg-white rounded-lg border border-stone-200 p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Get our free RTM step-by-step guide
              </h3>
              <p className="text-stone-600 mb-6">
                We'll email you a detailed guide to understanding RTM eligibility and next steps.
              </p>
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow"
                  required
                />
                <Button
                  type="submit"
                  className="bg-teal-700 hover:bg-teal-800 text-white"
                  disabled={!email}
                >
                  Get guide
                </Button>
              </form>
            </div>

            {/* Statutory Reference */}
            <div className="mt-12 pt-8 border-t border-stone-200 text-center text-xs text-stone-500">
              <p>
                This checker applies the qualification criteria from s.72–s.75 of the Commonhold and Leasehold Reform Act 2002, as amended by the Leasehold and Freehold Reform Act 2024.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Nav />
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto max-w-2xl px-4">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold mb-4">
              Free eligibility check — no account needed
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Can your building Right to Manage?
            </h1>
            <p className="text-lg text-stone-600">
              Check your eligibility in 5 steps using the statutory criteria from the Commonhold and Leasehold Reform Act 2002.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-2 rounded-full transition-colors ${
                    s <= step ? 'bg-teal-700' : 'bg-stone-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-sm text-stone-600 mt-3">
              Step {step} of 5
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg border border-stone-200 p-8 mb-8">
            {/* Step 1: Total Flats */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  How many flats are in your building?
                </h2>
                <p className="text-stone-600 mb-6">
                  This is the total number of residential units.
                </p>
                <div>
                  <Label htmlFor="totalFlats" className="block text-sm font-semibold text-slate-900 mb-2">
                    Total flats
                  </Label>
                  <Input
                    id="totalFlats"
                    type="number"
                    min="2"
                    value={formData.totalFlats}
                    onChange={(e) => {
                      const val = e.target.value === '' ? '' : parseInt(e.target.value);
                      setFormData({ ...formData, totalFlats: val });
                    }}
                    placeholder="e.g., 20"
                    className="w-full"
                  />
                  <p className="text-xs text-stone-500 mt-2">
                    Minimum requirement: 2 flats (s.72 CLRA 2002)
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Building Type */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  What type of building is it?
                </h2>
                <p className="text-stone-600 mb-8">
                  This determines whether certain restrictions apply.
                </p>
                <div className="space-y-4">
                  {/* Purpose-built option */}
                  <button
                    onClick={() => setFormData({ ...formData, buildingType: 'purpose-built' })}
                    className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                      formData.buildingType === 'purpose-built'
                        ? 'border-teal-700 bg-teal-50'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <Building2 className="w-6 h-6 text-teal-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-slate-900">Purpose-built block of flats</h3>
                        <p className="text-sm text-stone-600 mt-1">
                          Built from the outset as residential flats with shared facilities
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Converted house option */}
                  <button
                    onClick={() => setFormData({ ...formData, buildingType: 'converted-house' })}
                    className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                      formData.buildingType === 'converted-house'
                        ? 'border-teal-700 bg-teal-50'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <Home className="w-6 h-6 text-teal-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-slate-900">Converted house</h3>
                        <p className="text-sm text-stone-600 mt-1">
                          A house or building converted into flats (some restrictions may apply)
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Non-residential Use */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  How much of the building is non-residential?
                </h2>
                <p className="text-stone-600 mb-8">
                  Shops, offices, or communal areas at ground level count as non-residential.
                </p>

                {!formData.nonResidentialKnown && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="nonResSlider" className="text-sm font-semibold text-slate-900 block mb-4">
                        Non-residential percentage
                      </Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="nonResSlider"
                          min={0}
                          max={100}
                          step={1}
                          value={[formData.nonResidentialPercentage]}
                          onValueChange={(value) =>
                            setFormData({ ...formData, nonResidentialPercentage: value[0] })
                          }
                          className="flex-grow"
                        />
                        <div className="text-3xl font-bold text-teal-700 w-16 text-right">
                          {formData.nonResidentialPercentage}%
                        </div>
                      </div>
                      <p className="text-xs text-stone-500 mt-3">
                        Statutory limit: 25% (s.72 CLRA 2002)
                      </p>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-lg bg-teal-50 border border-teal-200">
                      <Checkbox
                        id="unknownNonRes"
                        checked={false}
                        onCheckedChange={() =>
                          setFormData({ ...formData, nonResidentialKnown: true, nonResidentialPercentage: 0 })
                        }
                        className="mt-1"
                      />
                      <Label htmlFor="unknownNonRes" className="text-sm text-stone-700 cursor-pointer">
                        I don't know — my building is entirely residential as far as I can tell
                      </Label>
                    </div>
                  </div>
                )}

                {formData.nonResidentialKnown && (
                  <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-emerald-900">Entirely residential</p>
                        <p className="text-sm text-emerald-800 mt-1">Non-residential use is 0%</p>
                        <button
                          onClick={() => setFormData({ ...formData, nonResidentialKnown: false })}
                          className="text-sm text-emerald-700 hover:text-emerald-800 font-semibold mt-2"
                        >
                          Change answer
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Long Leases */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  How many flats are owned on long leases?
                </h2>
                <p className="text-stone-600 mb-8">
                  A long lease is generally any lease over 21 years. At least 2 out of 3 flats must be on long leases.
                </p>
                <div>
                  <Label htmlFor="longLeases" className="block text-sm font-semibold text-slate-900 mb-2">
                    Flats with long leases
                  </Label>
                  <Input
                    id="longLeases"
                    type="number"
                    min="0"
                    max={typeof formData.totalFlats === 'number' ? formData.totalFlats : undefined}
                    value={formData.flatsWithLongLeases}
                    onChange={(e) => {
                      const val = e.target.value === '' ? '' : parseInt(e.target.value);
                      setFormData({ ...formData, flatsWithLongLeases: val });
                    }}
                    placeholder="e.g., 18"
                    className="w-full"
                  />
                  {typeof formData.totalFlats === 'number' && (
                    <p className="text-xs text-stone-500 mt-2">
                      You need at least {Math.ceil(formData.totalFlats * (2 / 3))} flats on long leases for RTM eligibility (s.72(1)(c) CLRA 2002)
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Landlord Questions */}
            {step === 5 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  A couple of questions about your landlord
                </h2>
                <p className="text-stone-600 mb-8">
                  Some landlord situations restrict RTM eligibility.
                </p>

                <div className="space-y-8">
                  {/* Question 1 */}
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-4">
                      Does the landlord live in one of the flats?
                    </h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => setFormData({ ...formData, residentLandlord: 'yes' })}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                          formData.residentLandlord === 'yes'
                            ? 'border-teal-700 bg-teal-50 text-teal-900'
                            : 'border-stone-200 bg-white hover:border-stone-300 text-slate-900'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setFormData({ ...formData, residentLandlord: 'no' })}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                          formData.residentLandlord === 'no'
                            ? 'border-teal-700 bg-teal-50 text-teal-900'
                            : 'border-stone-200 bg-white hover:border-stone-300 text-slate-900'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  {/* Question 2 */}
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-4">
                      Is the landlord a local authority (council)?
                    </h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => setFormData({ ...formData, localAuthorityLandlord: 'yes' })}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                          formData.localAuthorityLandlord === 'yes'
                            ? 'border-red-700 bg-red-50 text-red-900'
                            : 'border-stone-200 bg-white hover:border-stone-300 text-slate-900'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setFormData({ ...formData, localAuthorityLandlord: 'no' })}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                          formData.localAuthorityLandlord === 'no'
                            ? 'border-teal-700 bg-teal-50 text-teal-900'
                            : 'border-stone-200 bg-white hover:border-stone-300 text-slate-900'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-shrink-0"
              disabled={step === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleContinue}
              className="flex-grow bg-teal-700 hover:bg-teal-800 text-white"
              disabled={!isStepValid() || isSubmitting}
            >
              {step === 5 ? 'Check eligibility' : 'Continue'}
            </Button>
          </div>

          {/* Statutory Reference */}
          <div className="mt-12 pt-8 border-t border-stone-200 text-center text-xs text-stone-500">
            <p>
              This checker applies the qualification criteria from s.72–s.75 of the Commonhold and Leasehold Reform Act 2002, as amended by the Leasehold and Freehold Reform Act 2024.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
