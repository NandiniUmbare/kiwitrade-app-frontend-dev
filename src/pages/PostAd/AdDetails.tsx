import { useEffect, useState } from 'react';
import { AdDetailsTypes, CityType, DistrictType, FormDataType, SuburbType, Type } from './PostAd'
import { FaEdit } from 'react-icons/fa'
import {MdPhotoLibrary } from 'react-icons/md';
import { getCity, getDistrict, getSuburb } from '@/api/data';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import ImageUpload from '@/components/ImageUpload';

const AdDetails = ({
  categories,
  selectedCategory,
  groups,
  selectedGroup,
  typeData,
  selectedType,
}: AdDetailsTypes) => {
  const [district, setDistrict] = useState<DistrictType>([]);
  const [cities, setCities] = useState<CityType>([]);
  const [suburb, setSuburb] = useState<SuburbType>([]);
  const [formData, setFormData] = useState<FormDataType>({});
  const [isOn, setIsOn] = useState<boolean>(false);
  const onChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const getDistrictData = async () => {
    const response = await getDistrict();
    setDistrict(response.datas);
  };
  const getCityData = async () => {
    const response = await getCity(formData.district);
    setCities(response.datas);
  };
  const getSuburbData = async () => {
    const response = await getSuburb(formData.city, formData.district);
    setSuburb(response.datas);
  };
  const handleSave = () => {
    console.log(formData);
  };
  useEffect(() => {
    getDistrictData();
  }, []);
  useEffect(() => {
    getCityData();
    getSuburbData();
  }, [formData]);
  return (
    <div className="p-6 bg-white border border-gray-400 rounded-md">
      <div className="flex justify-between">
        <h4>{`${categories[selectedCategory - 1]?.categoryName}->${groups[selectedGroup - 1]?.groupName}->${typeData?.find((t: Type) => t.typeId === selectedType)?.typeName}`}</h4>
        <button className="bg-gray-600 text-white rounded-md p-3">Change Category</button>
      </div>
      <div className="flex w-[100%] gap-6 pt-8">
        <div className="w-1/2">
          <div className="flex rounded-md items-center bg-gray-300 p-2 w-[100%] text-2xl">
            <FaEdit />
            <h3>Ad Details</h3>
          </div>
          <div className="flex flex-col items-baseline pt-4">
            <h3 className="text-md">All fields in this section are required.</h3>
            <div className="relative w-full">
              <label
                className={`absolute left-3 top-9 text-gray-400 transition-all duration-300 
                            ${formData.title ? 'text-m top-2 left-2 bg-white px-3 text-blue-500' : 'text-base'}
                            `}
              >
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                required
                onChange={(e) => onChange(e)}
                id="title"
                className="border border-gray-300 rounded-md p-3 mt-6 w-[100%] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative w-full">
              <label
                className={`absolute left-3 top-9 text-gray-400 transition-all duration-300 
                            ${formData.district ? 'text-m top-2 left-2 bg-white px-3 text-blue-500' : 'text-base'}
                            `}
              >
                Select a district
              </label>
              <select
                className="border border-gray-300 rounded-md p-3 mt-6 w-[100%]"
                value={formData.district}
                required
                id="district"
                onChange={(e) => onChange(e)}
              >
                <option value="" disabled></option>
                {district?.map((item: DistrictType) => (
                  <option key={item.distId} value={item.distId}>
                    {item.distName}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative w-full">
              <label
                className={`absolute left-3 top-9 text-gray-400 transition-all duration-300 
                            ${formData.city ? 'text-m top-2 left-2 bg-white px-3 text-blue-500' : 'text-base'}
                            `}
              >
                Select a city
              </label>
              <select
                className="border border-gray-300 rounded-md p-3 mt-6 w-[100%]"
                value={formData.city}
                required
                id="city"
                onChange={(e) => onChange(e)}
              >
                <option value="" disabled></option>
                {cities?.map((item: CityType) => (
                  <option key={item.cityId} value={item.cityId}>
                    {item.cityName}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative w-full">
              <label
                className={`absolute left-3 top-9 text-gray-400 transition-all duration-300 
                            ${formData.suburb ? 'text-m top-2 left-2 bg-white px-3 text-blue-500' : 'text-base'}
                            `}
              >
                Select a suburb
              </label>
              <select
                className="border border-gray-300 rounded-md p-3 mt-6 w-[100%]"
                value={formData.suburb}
                required
                id="suburb"
                onChange={(e) => onChange(e)}
              >
                <option value="" disabled></option>
                {suburb?.map((item: SuburbType) => (
                  <option key={item.suburbId} value={item.suburbId}>
                    {item.suburbName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex w-full">
              {!isOn && (
                <div className="flex w-[50%]">
                  <div className="relative w-full">
                    <label
                      className={`absolute left-3 top-9 text-gray-400 transition-all duration-300 
                                    ${formData.price ? 'text-m top-4 left-2 bg-white px-3 text-blue-500' : 'text-base top-3 left-2'}
                                    `}
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      required
                      onChange={(e) => onChange(e)}
                      id="price"
                      className="border border-gray-300 rounded-l-md p-3 mt-6 w-[100%] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="relative w-full">
                    <label
                      className={`absolute left-3 top-9 text-gray-400 transition-all duration-300 
                                    ${formData.currency ? 'text-m top-4 left-2 bg-white px-3 text-blue-500' : 'text-base top-4 left-2'}
                                    `}
                    >
                      Currency
                    </label>
                    <select
                      className="border border-gray-300 rounded-r-md p-3 mt-6 w-[100%]"
                      value={formData.currency}
                      id="currency"
                      onChange={(e) => onChange(e)}
                    >
                      <option key="kyd" value="kyd">
                        KYD
                      </option>
                      <option key="usd" value="usd">
                        USD
                      </option>
                    </select>
                  </div>
                </div>
              )}
              <div className="p-3 mt-6 flex w-[50%]">
                <div
                  className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
                    isOn ? 'bg-sky-500' : 'bg-white border'
                  }`}
                  onClick={() => setIsOn(!isOn)}
                >
                  <div
                    className={`w-6 h-6 bg-gray-300 rounded-full shadow-md transform transition-all duration-300 ${
                      isOn ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </div>
                <h3 className="text-lg"> No Price / Free</h3>
              </div>
              {isOn && (
                <div className="relative w-[50%]">
                  <label
                    className={`absolute left-3 top-9 text-gray-400 transition-all duration-300 
                                ${formData.reason ? 'text-m top-4 left-2 bg-white px-3 text-blue-500' : 'text-base top-4 left-2'}
                                `}
                  >
                    Reason
                  </label>
                  <select
                    className="border border-gray-300 rounded-md p-3 mt-6 w-[100%]"
                    value={formData.reason}
                    id="reason"
                    onChange={(e) => onChange(e)}
                  >
                    <option value="" disabled>
                      Please Select
                    </option>
                    <option key="free" value="free">
                      Free
                    </option>
                    <option key="price-upon-request" value="price-upon-request">
                      Price upon request
                    </option>
                  </select>
                </div>
              )}
            </div>
            <div className="flex flex-col w-full pt-4 mb-6">
              <h3 className="text-md text-left">Discription</h3>
              <ReactQuill
                value={formData.discription}
                onChange={(e) => onChange(e)}
                theme="snow"
                className="border border-gray-300 shadow-sm"
              />
            </div>
            <hr />
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex rounded-md items-center bg-gray-300 p-2 w-[100%] text-2xl">
            <MdPhotoLibrary />
            <h3>Upload Photos</h3>
          </div>
          <div className="flex flex-col items-baseline pt-4">
            <h3 className="text-md">
              Up to 10 photos allowed, less than 6MB each, jpg/jpeg/png only.
            </h3>
            <div className="w-full">
              <ImageUpload />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button onClick={handleSave} className={`text-2xl text-white p-3 rounded-lg bg-green-500`}>
          Save
        </button>
      </div>
    </div>
  );
};
export default AdDetails; 