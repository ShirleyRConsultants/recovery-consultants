import React, { useEffect, useState } from 'react';

interface CardProps {
  first_name: string;
  last_name: string;
  last_update: Date | null;
}

const Card: React.FC<CardProps> = ({ first_name, last_name, last_update }) => {
  const [isAssessmentDue, setIsAssessmentDue] = useState(false);

  useEffect(() => {
    if (last_update) {
      const lastUpdateDate = new Date(last_update);
      const currentDate = new Date();

      // Calculate the difference in milliseconds
      const differenceInTime = currentDate.getTime() - lastUpdateDate.getTime();

      // Convert to days
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      // Check if the difference is 7 days or more
      if (differenceInDays >= 7) {
        setIsAssessmentDue(true);
      } else {
        setIsAssessmentDue(false);
      }
    } else {
      // If there's no last_update, assessment is due
      setIsAssessmentDue(true);
    }
  }, [last_update]);

  return (
    <div className="mx-auto mt-2 max-w-sm rounded-lg transition-transform duration-300 hover:scale-105 overflow-hidden shadow-lg border border-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{`${first_name} ${last_name}`}</div>
        <p className="text-gray-700 text-base">
          {last_update ? (
            <>
       
              {isAssessmentDue ? <p className="text-red-500">Assessment Due</p>:<p className='text-blue-500'>Assessment Completed</p>}
            </>
          ) : (
            <span className="text-red-500">Assessment Due</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Card;
