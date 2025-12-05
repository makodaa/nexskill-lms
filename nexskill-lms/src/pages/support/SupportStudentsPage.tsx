import SupportStaffAppLayout from '../../layouts/SupportStaffAppLayout';
import SupportStudentList from '../../components/support/SupportStudentList';

const SupportStudentsPage = () => {
  return (
    <SupportStaffAppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Accounts</h1>
          <p className="text-gray-600">View student information and support history (Read-Only)</p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">View-Only Access</h3>
          <p className="text-blue-700">
            You have read-only access to student accounts. To make changes to student data, please contact an administrator.
          </p>
        </div>

        {/* Students List */}
        <SupportStudentList />
      </div>
    </SupportStaffAppLayout>
  );
};

export default SupportStudentsPage;
