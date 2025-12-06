import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StudentAppLayout from '../../layouts/StudentAppLayout';
import MembershipChangeFlow from '../../components/membership/MembershipChangeFlow';
import MembershipCancelPanel from '../../components/membership/MembershipCancelPanel';

// Dummy plans data (same as in MembershipPlans)
const allPlans = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    billingCycle: 'month',
    features: [
      'Access to all free courses',
      'Community discussions',
      'Limited AI Coach',
      'Basic progress tracking',
    ],
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 29,
    billingCycle: 'month',
    features: [
      'Full access to premium courses',
      'Unlimited AI Coach access',
      '2 coaching credits per month',
      'Course certificates',
      'Live classes access',
    ],
  },
  elite: {
    id: 'elite',
    name: 'Elite',
    price: 79,
    billingCycle: 'month',
    features: [
      '10 coaching credits per month',
      'Blockchain-verified certificates',
      'Priority support',
      'Career services & job placement',
      'Exclusive masterclasses',
    ],
  },
};

const MembershipManage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get target plan from router state, or default to 'elite'
  const targetPlanId = (location.state as any)?.targetPlanId || 'elite';
  
  // Current plan is 'pro' (dummy)
  const currentPlan = allPlans.pro;
  const targetPlan = allPlans[targetPlanId as keyof typeof allPlans] || allPlans.elite;

  const handleConfirmChange = () => {
    console.log(`Plan change confirmed: ${currentPlan.id} → ${targetPlan.id}`);
    alert(`✅ Plan upgrade confirmed!\n\nSwitching to ${targetPlan.name} plan\nNew price: $${targetPlan.price}/${targetPlan.billingCycle}\n\nYour new benefits will be available immediately!`);
    navigate('/student/membership/confirmation', {
      state: {
        type: 'change',
        newPlanId: targetPlan.id,
        planName: targetPlan.name,
        price: targetPlan.price,
        billingCycle: targetPlan.billingCycle,
      },
    });
  };

  const handleBack = () => {
    navigate('/student/membership');
  };

  const handleCancelConfirmed = () => {
    console.log('Membership cancellation confirmed');
    alert('⚠️ Membership cancelled\n\nYour Pro membership will remain active until the end of your current billing cycle.\n\nWe\'re sorry to see you go!');
    navigate('/student/membership/confirmation', {
      state: {
        type: 'cancel',
        currentPlanName: currentPlan.name,
      },
    });
  };

  return (
    <StudentAppLayout>
      <div className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to plans
          </button>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Manage membership</h1>
          <p className="text-lg text-slate-600">Change your plan or cancel your subscription</p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Plan Change Flow */}
          <div>
            <MembershipChangeFlow
              currentPlan={currentPlan}
              targetPlan={targetPlan}
              onConfirmChange={handleConfirmChange}
              onBack={handleBack}
            />
          </div>

          {/* Right Column - Cancel Panel */}
          <div>
            <MembershipCancelPanel onCancelConfirmed={handleCancelConfirmed} />
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#304DB5] flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Need help deciding?</h3>
              <p className="text-sm text-slate-600 mb-4">
                Our support team is here to answer your questions about plans, billing, and features.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => alert('📞 Contact Support\n\nEmail: support@nexskill.com\nPhone: 1-800-NEXSKILL\nLive Chat: Available 24/7\n\nOur team will respond within 2 hours.')}
                  className="px-5 py-2 bg-white text-[#304DB5] font-medium rounded-full border-2 border-[#304DB5] hover:bg-blue-50 transition-all text-sm"
                >
                  Contact support
                </button>
                <button
                  onClick={() => alert('❓ Frequently Asked Questions\n\n• How do I change my plan?\n• What payment methods are accepted?\n• Can I cancel anytime?\n• Do you offer refunds?\n\nVisit our help center for more answers.')}
                  className="px-5 py-2 text-slate-700 font-medium rounded-full border border-slate-300 hover:bg-white transition-all text-sm"
                >
                  View FAQ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentAppLayout>
  );
};

export default MembershipManage;
