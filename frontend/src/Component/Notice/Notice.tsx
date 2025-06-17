import React from 'react';
import { MdOutlineNotificationImportant } from 'react-icons/md';

const notices: string[] = [
  'Location',
  'Rent Price',
  'Safety & Security',
  'Rental Agreement Terms',
  'Deposit Amount',
  'Rules & Restrictions',
  'Lease Duration',
];

const Notice: React.FC = () => {
  return (
    <div className='w-[44rem] sm:w-[53rem] md:w-[69rem] xl:w-[75rem]  flex justify-center items-center mt-9'>

    <div className="bg-white p-6 w-[26rem] rounded-2xl shadow-lg max-w-xl mx-auto mt-10 animate-fade-in-up">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-400 text-white px-4 py-2 rounded-md mb-6 shadow-md flex items-center gap-2">
        <MdOutlineNotificationImportant className="text-3xl animate-bounce" />
        Important Rental Notices
      </h2>
      <ul className="space-y-3 text-gray-700">
        {notices.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-2 bg-gray-100 hover:bg-red-50 transition-all duration-300 px-4 py-2 rounded-md shadow-sm"
          >
            <MdOutlineNotificationImportant className="text-red-400 mt-1" />
            <span className="font-medium">{item}</span>
          </li>
        ))}
      </ul>
    </div>

    </div>
  );
};

export default Notice;
