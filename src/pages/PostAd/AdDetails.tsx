import { useEffect, useState } from 'react';
import { AdDetailsTypes, CityType, DistrictType, FormDataType, SuburbType, Type } from './PostAd'
import { FaEdit } from 'react-icons/fa'
import {MdPhotoLibrary } from 'react-icons/md';
import { getCity, getDistrict, getSuburb, postAd } from '@/api/data';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import ImageUpload from '@/components/ImageUpload';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import OptionalFields from './OptionalFields';

const AdDetails = ({
  categories,
  selectedCategory,
  groups,
  selectedGroup,
  typeData,
  selectedType,
  setNext
}: AdDetailsTypes) => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [district, setDistrict] = useState<DistrictType[]>([]);
  const [cities, setCities] = useState<CityType[]>([]);
  const [suburb, setSuburb] = useState<SuburbType[]>([]);
  const [formData, setFormData] = useState<FormDataType>({} as FormDataType);
  const [optionalFields, setOptionalFields] = useState({});
  const [isOn, setIsOn] = useState<boolean>(false);
  const { images } = useSelector((state: RootState) => state.image);
  const {user} = useSelector((state: RootState) => state.user);
  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  console.log('optionalFields', optionalFields);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err: GeolocationPositionError) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };
  
  const getDistrictData = async () => {
    const response = await getDistrict();
    setDistrict(response.data);
  };
  const getCityData = async () => {
    const response = await getCity(formData.districtId);
    setCities(response.data);
  };
  const getSuburbData = async () => {
    const response = await getSuburb(formData.cityId, formData.districtId);
    setSuburb(response.data);
  };
  const handleSave = async() => {
    // console.log(formData);
    console.log('latitude', latitude, 'longitude', longitude)
    const response = await postAd({
      ...formData,
      createdDate: new Date(),
      createdBy: user?.exp,
      coordinate: `${latitude},${longitude}`,
      categoryId: selectedCategory,
      groupId: selectedGroup,
      typeId: selectedType,
      photo: images.join(' '),
    });
    if(response.status === 200){
      console.log('Ad posted successfully');
    }
  };
  useEffect(() => {
    getLocation();
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
        <button onClick={()=> setNext(false)} className="bg-gray-600 text-white rounded-md p-3">Change Category</button>
      </div>
      <div className="flex w-[100%] gap-6 pt-8">
        <div className="w-1/2">
          <div className="flex rounded-md items-center bg-gray-300 p-2 w-[100%] text-2xl">
            <FaEdit />
            <h3 className='font-bold'>Ad Details</h3>
          </div>
          <div className="flex flex-col items-baseline pt-4">
            <h3 className="text-md">All fields in this section are required.</h3>
            <div className="relative w-full">
              <label
                className='absolute text-m top-3 left-2 bg-white px-3 text-gray-400'
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
                className='absolute text-m top-3 left-2 bg-white px-3 text-gray-400'
              >
                Select a district
              </label>
              <select
                className="border border-gray-300 rounded-md p-3 mt-6 w-[100%]"
                value={formData.districtId}
                required
                id="districtId"
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
                className='absolute text-m top-3 left-2 bg-white px-3 text-gray-400'
              >
                Select a city
              </label>
              <select
                className="border border-gray-300 rounded-md p-3 mt-6 w-[100%]"
                value={formData.cityId}
                required
                id="cityId"
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
                className='absolute text-m top-3 left-2 bg-white px-3 text-gray-400'
              >
                Select a suburb
              </label>
              <select
                className="border border-gray-300 rounded-md p-3 mt-6 w-[100%]"
                value={formData.suburbId}
                required
                id="suburbId"
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
                      className='absolute text-m top-3 left-2 bg-white px-3 text-gray-400'
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      required
                      onChange={(e) => onChange(e)}
                      id="price"
                      className="border border-gray-300 rounded-md p-3 mt-6 w-[100%] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="relative w-full mt-10 ml-4 text-left">
                    <h3 className='text-md'>NZD</h3>
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
                    className='absolute text-m top-3 left-2 bg-white px-3 text-gray-400'
                  >
                    Reason
                  </label>
                  <select
                    className="border border-gray-300 rounded-md p-3 mt-6 w-[100%]"
                    value={formData.noPrice}
                    id="noPrice"
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
                value={formData.description}
                onChange={(value) => setFormData((prevData) => ({ ...prevData, description: value }))}
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
            <h3 className='font-bold'>Upload Photos</h3>
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
      <div className='flex w-full'>
        <OptionalFields 
          selectedCategory={selectedCategory}
          selectedGroup={selectedGroup}
          selectedType={selectedType}
          optionalFields={optionalFields}
          setOptionalFields={setOptionalFields}
        />
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