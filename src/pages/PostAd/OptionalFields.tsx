import React, { useEffect, useState } from 'react';
import fields from '../../api/fields.json';
import { it } from 'node:test';

interface OptionalFieldsType {
  selectedCategory: number;
  selectedGroup: number;
  selectedType: number;
}

interface FieldsType {
  [key: number]: {
    [key: number]: {
      [key: number]: {
        title: string;
      };
    };
  };
}

const OptionalFields: React.FC<OptionalFieldsType> = ({
    selectedCategory,
    selectedGroup,
    selectedType}) => {
      const [fieldData, setFieldData] = useState([]);
      useEffect(()=>{
        const data = fields[selectedCategory]?.[selectedGroup]?.[selectedType];
        if (data) {
            setFieldData(data);
          } else {
            setFieldData([]); 
          }
      }, [selectedCategory, selectedGroup, selectedType])
    return (
      <div className='w-1/2'>
        {fieldData && fieldData.map(field => (
            <div className="relative w-[50%]" key={field.id}><label
          className='absolute text-m top-3 left-2 bg-white px-3 text-gray-400'
        >
          {field.title}
        </label>
          {field.type !== 'select' ? (
            <input className="border border-gray-300 rounded-md p-3 mt-6 w-[100%] focus:ring-2 focus:ring-blue-500 focus:border-blue-500" id={field.id} type={field.type}/>
          ):(
          
            <select className="border border-gray-300 rounded-md p-3 mt-6 w-[100%]" id={field.id}>
              {field.options.map(item => (
                <option key={item.value} value={item.value}>{item.key}</option>
              ))}
            </select>
          )}</div>
        ))}
      </div>
    )
}

export default React.memo(OptionalFields)