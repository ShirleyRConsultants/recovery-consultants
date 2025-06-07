import React, { useEffect, useState } from 'react';

interface CardProps {
  first_name: string;
  last_name: string;
  last_update: Date | null;
}

const Card: React.FC<CardProps> = ({ first_name, last_name, last_update }) => {
  const [isAssessmentDue, setIsAssessmentDue] = useState(false);

  // Function to capitalize the first letter of a string
  const capitalize = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  // Function to format the date as MM-DD-YYYY
  const formatDate = (date: Date) => {
    return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
  };

  useEffect(() => {
    if (last_update) {
      const lastUpdateDate = new Date(last_update);
      const currentDate = new Date();

      // Calculate the difference in days
      const differenceInDays = (currentDate.getTime() - lastUpdateDate.getTime()) / (1000 * 3600 * 24);

      // Check if the difference is 7 days or more
      setIsAssessmentDue(differenceInDays >= 7);
    } else {
      // If there's no last_update, assessment is due
      setIsAssessmentDue(true);
    }
  }, [last_update]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-200">
      <div className="px-6 py-6">
        <h2 className="font-bold text-xl text-slate-900 mb-1">
          {`${capitalize(first_name)} ${capitalize(last_name)}`}
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          Last Assessment: {last_update ? formatDate(new Date(last_update)) : 'N/A'}
        </p>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isAssessmentDue ? 'bg-red-500' : 'bg-green-500'}`} />
          <p className={`text-sm font-medium ${isAssessmentDue ? 'text-red-600' : 'text-green-600'}`}>
            {isAssessmentDue ? 'Assessment Due' : 'Assessment Completed'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
