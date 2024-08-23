
import React from 'react';

interface CardProps {
  first_name: string;
  last_name: string;
  last_update: Date | null;
}

const Card: React.FC<CardProps> = ({ first_name, last_name, last_update }) => {
  return (
    <div className="mt-2 max-w-sm rounded-lg transition-transform duration-300 hover:scale-105 overflow-hidden shadow-lg border border-white ">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{first_name + " " + last_name}</div>
        <p className='underline'>Last assessment</p>
        <p className="text-gray-700 text-base">
          {last_update ? <>{last_update}</> : <>No Assessment Completed</>}
        </p>
      </div>
    </div>
  );
};

export default Card;
