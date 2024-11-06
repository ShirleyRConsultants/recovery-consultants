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
    <div className="mx-auto mt-4 max-w-sm rounded-lg bg-gradient-to-r from-mint to-purp transition-transform duration-300 hover:scale-105 shadow-lg overflow-hidden border border-white">
      <div className="px-6 py-6">
        <h2 className="font-bold text-xl text-white mb-1">
          {`${capitalize(first_name)} ${capitalize(last_name)}`}
        </h2>
        <p className="text-sm text-gray-200 mb-4">
          Last Assessment: {last_update ? formatDate(new Date(last_update)) : 'N/A'}
        </p>
        <p className={`text-base font-semibold ${isAssessmentDue ? 'text-red-400' : 'text-green-300'}`}>
          {isAssessmentDue ? 'Assessment Due' : 'Assessment Completed'}
        </p>
      </div>
    </div>
  );
};

export default Card;
