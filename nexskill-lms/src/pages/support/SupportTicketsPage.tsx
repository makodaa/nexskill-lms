import SupportStaffAppLayout from '../../layouts/SupportStaffAppLayout';
import SupportTicketsTable from '../../components/support/SupportTicketsTable';

const SupportTicketsPage = () => {
  return (
    <SupportStaffAppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Tickets</h1>
          <p className="text-gray-600">Manage and respond to customer support requests</p>
        </div>

        {/* Tickets Table */}
        <SupportTicketsTable />
      </div>
    </SupportStaffAppLayout>
  );
};

export default SupportTicketsPage;
