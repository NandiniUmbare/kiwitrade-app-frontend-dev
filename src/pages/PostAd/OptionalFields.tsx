import React, { useEffect, useState } from 'react';
import fields from '../../api/fields.json';

interface OptionalFieldsType {
  selectedCategory: number;
  selectedGroup: number;
  selectedType: number;
  optionalFields: { [key: string]: string };
  setOptionalFields: (fields: { [key: string]: string }) => void;
}
interface Fields { 
  type: string;
  title: string;
  id: string;
  options?: { key: string; value: string }[] | null;
}
interface FieldsType {
  [key: number]: {
    [key: number]: {
      [key: number]:  Fields[];
    };
  }
}

const OptionalFields: React.FC<OptionalFieldsType> = ({
  selectedCategory,
  selectedGroup,
  selectedType,
  optionalFields,
  setOptionalFields}) => {
  const [fieldData, setFieldData] = useState<Fields[]>([]);
    useEffect(()=>{
      const data = (fields as unknown as FieldsType)[selectedCategory]?.[selectedGroup]?.[selectedType];
      if (data) {
          setFieldData(data);
        } else {
        setFieldData([]);
      }
    }, [selectedCategory, selectedGroup, selectedType])
    return (
      <div className='w-1/2'>
        <h3 className='font-semibold text-xl text-left'>Details</h3>
        <p className='text-left my-2 text-l'>Your advert has a greater chance of being seen if you select some of these searchable options.</p>
        <div className='flex flex-wrap justify-between'>
        {fieldData && fieldData?.map((field: Fields, index:number) => (
          <div className="relative w-[46%]" key={field.id}>
            
            <div className='w-[100%]'>
            <label className='absolute text-m top-3 left-2 bg-white px-3 text-gray-400'>{field.title}</label>
              {field.type !== 'select' ? (
                <input
                  onChange={(e) => setOptionalFields({...optionalFields, [field.id]: e.target.value}) }
                  className="border border-gray-300 rounded-md p-3 mt-6 w-[100%] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id={field.id}
                  type={field.type} />
              ):(
              
                  <select
                    onChange={(e) => setOptionalFields({ ...optionalFields, [field.id]: e.target.value }) }
                    className="border border-gray-300 rounded-md p-3 mt-6 w-[100%]"
                    id={field.id}>
                      {field?.options?.map((item: {value:string, key:string}) => (
                        <option key={item.value} value={item.value}>{item.key}</option>
                      ))}
                  </select>
                  
              )}</div>
            </div>
        ))}
          </div>
      </div>
    )
}

export default React.memo(OptionalFields)