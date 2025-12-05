import React, { useState } from 'react';

interface CourseNode {
  id: string;
  title: string;
  type: 'course' | 'module' | 'lesson';
  children?: CourseNode[];
}

interface CourseContentTreeProps {
  onSelect?: (node: CourseNode) => void;
  onSelectLesson?: (lesson: any) => void;
}

const CourseContentTree: React.FC<CourseContentTreeProps> = ({ onSelect, onSelectLesson }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['course-1', 'module-1-1']));
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const courseData: CourseNode[] = [
    {
      id: 'course-1',
      title: 'JavaScript Mastery',
      type: 'course',
      children: [
        {
          id: 'module-1-1',
          title: 'Module 1: Basics',
          type: 'module',
          children: [
            { id: 'lesson-1-1-1', title: 'Introduction to JavaScript', type: 'lesson' },
            { id: 'lesson-1-1-2', title: 'Variables and Data Types', type: 'lesson' },
            { id: 'lesson-1-1-3', title: 'Functions and Scope', type: 'lesson' },
          ]
        },
        {
          id: 'module-1-2',
          title: 'Module 2: DOM Manipulation',
          type: 'module',
          children: [
            { id: 'lesson-1-2-1', title: 'Selecting Elements', type: 'lesson' },
            { id: 'lesson-1-2-2', title: 'Event Handling', type: 'lesson' },
          ]
        },
        {
          id: 'module-1-3',
          title: 'Module 3: Advanced React',
          type: 'module',
          children: [
            { id: 'lesson-1-3-1', title: 'Introduction to React Hooks', type: 'lesson' },
            { id: 'lesson-1-3-2', title: 'Context API', type: 'lesson' },
          ]
        },
      ]
    },
    {
      id: 'course-2',
      title: 'UI/UX Design',
      type: 'course',
      children: [
        {
          id: 'module-2-1',
          title: 'Module 1: Design Tools',
          type: 'module',
          children: [
            { id: 'lesson-2-1-1', title: 'Figma Fundamentals', type: 'lesson' },
            { id: 'lesson-2-1-2', title: 'Design Systems', type: 'lesson' },
          ]
        },
      ]
    },
    {
      id: 'course-3',
      title: 'Product Management',
      type: 'course',
      children: [
        {
          id: 'module-3-1',
          title: 'Module 1: Fundamentals',
          type: 'module',
          children: [
            { id: 'lesson-3-1-1', title: 'Product Management Overview', type: 'lesson' },
            { id: 'lesson-3-1-2', title: 'User Research', type: 'lesson' },
          ]
        },
      ]
    },
  ];

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const handleSelect = (node: CourseNode) => {
    setSelectedNode(node.id);
    if (onSelect) {
      onSelect(node);
    }
    // If it's a lesson and onSelectLesson is provided, call it
    if (node.type === 'lesson' && onSelectLesson) {
      onSelectLesson(node);
    }
  };

  const getIcon = (type: string, _hasChildren: boolean, isExpanded: boolean) => {
    if (type === 'course') return '📚';
    if (type === 'module') return isExpanded ? '📂' : '📁';
    if (type === 'lesson') return '📝';
    return '📄';
  };

  const renderNode = (node: CourseNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);
    const isSelected = selectedNode === node.id;

    return (
      <div key={node.id}>
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all ${
            isSelected
              ? 'bg-amber-100 text-amber-900'
              : 'hover:bg-gray-100'
          }`}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleNode(node.id);
            }
            handleSelect(node);
          }}
        >
          {hasChildren && (
            <span className="text-xs text-text-muted">
              {isExpanded ? '▼' : '▶'}
            </span>
          )}
          {!hasChildren && <span className="w-3" />}
          <span className="text-lg">{getIcon(node.type, hasChildren || false, isExpanded)}</span>
          <span className={`text-sm flex-1 ${
            node.type === 'course' ? 'font-bold' : 
            node.type === 'module' ? 'font-semibold' : 
            'font-normal'
          }`}>
            {node.title}
          </span>
          {node.type === 'lesson' && (
            <span className="text-xs text-amber-600 hover:text-amber-700">✏️</span>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div>
            {node.children?.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
      <div className="mb-4 pb-3 border-b border-gray-200">
        <h3 className="text-base font-bold text-text-primary">Course Structure</h3>
        <p className="text-xs text-text-muted mt-1">Click to select and edit content</p>
      </div>
      <div className="space-y-1 max-h-[600px] overflow-y-auto">
        {courseData.map((course) => renderNode(course))}
      </div>
    </div>
  );
};

export default CourseContentTree;
