import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
}

export function PageHeader({ title, subtitle, icon: Icon, action }: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Icon className="w-5 h-5 text-red-600" />
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-sm text-gray-600 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {action && (
          <button
            onClick={action.onClick}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
          >
            {action.icon && <action.icon className="w-4 h-4" />}
            <span>{action.label}</span>
          </button>
        )}
      </div>
    </div>
  );
}
