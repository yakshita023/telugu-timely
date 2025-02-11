import React from 'react';
import { PanchangamData } from '../types/calendar';
import { Clock, Sun, Moon, Calendar } from 'lucide-react';

interface Props {
  data: PanchangamData;
}

export const PanchangamCard: React.FC<Props> = ({ data }) => {
  return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-orange-600">దిన పంచాంగం</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Moon className="text-purple-600" />
            <div>
              <p className="text-gray-600">తిథి:</p>
              <p className="font-semibold">{data.tithi}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="text-yellow-600" />
            <div>
              <p className="text-gray-600">నక్షత్రం:</p>
              <p className="font-semibold">{data.nakshatra}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="text-red-600" />
            <div>
              <p className="text-gray-600">రాహు కాలం:</p>
              <p className="font-semibold">{data.rahuKalam}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="text-blue-600" />
            <div>
              <p className="text-gray-600">యమగండం:</p>
              <p className="font-semibold">{data.yamagandam}</p>
            </div>
          </div>
        </div>
      </div>
  );
};