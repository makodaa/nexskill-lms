import React from 'react';

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  progress: number;
  lastActive: string;
  status: 'active' | 'needs-support' | 'at-risk';
}

interface AssignedStudentsTableProps {
  students: Student[];
  onStudentClick?: (studentId: string) => void;
}

const AssignedStudentsTable: React.FC<AssignedStudentsTableProps> = ({
  students,
  onStudentClick,
}) => {
  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'needs-support':
        return 'bg-amber-100 text-amber-800';
      case 'at-risk':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: Student['status']) => {
    switch (status) {
      case 'active':
        return 'On Track';
      case 'needs-support':
        return 'Needs Support';
      case 'at-risk':
        return 'At Risk';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EDF0FB] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-teal-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-text-primary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-text-primary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDF0FB]">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-teal-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{student.name}</p>
                    <p className="text-xs text-text-muted">{student.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">{student.course}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full"
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-text-primary">
                      {student.progress}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">{student.lastActive}</td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      student.status
                    )}`}
                  >
                    {getStatusLabel(student.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onStudentClick?.(student.id)}
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {students.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-text-muted">No students assigned yet</p>
        </div>
      )}
    </div>
  );
};

export default AssignedStudentsTable;
