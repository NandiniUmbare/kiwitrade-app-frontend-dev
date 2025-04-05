import { useEffect, useState } from 'react';
import { AdDetailsTypes, CityType, DistrictType, FormDataType, PostErrorsType, SuburbType, Type } from './PostAd'
import { FaEdit } from 'react-icons/fa'
import {MdPhotoLibrary } from 'react-icons/md';
import { getCity, getDistrict, getSuburb, postAd } from '@/api/data';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import ImageUpload from '@/components/ImageUpload';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import OptionalFields from './OptionalFields';
import { validateForm } from '@/helper/validation';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button, Modal } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdDetails = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  setSelectedGoup,
  setSelectedType,
  groups,
  selectedGroup,
  typeData,
  selectedType,
  setNext,
  postId,
  postType
}: AdDetailsTypes) => {
  const [errors, setErrors] = useState<PostErrorsType>({});
  const [district, setDistrict] = useState<DistrictType[]>([]);
  const [cities, setCities] = useState<CityType[]>([]);
  const [suburb, setSuburb] = useState<SuburbType[]>([]);
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 52.9257201, lng: -1.475632 });
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    districtId: "",
    cityId: "",
    suburbId: "",
    description: "",
    noPrice: false
  } as unknown as FormDataType);
  const [optionalFields, setOptionalFields] = useState({});
  const [isOn, setIsOn] = useState<boolean>(false);
  const { images } = useSelector((state: RootState) => state.image);
  const { userPosts } = useSelector((state: RootState) => state.posts);
  const { user } = useSelector((state: RootState) => state.user);
  const userDetails: any = user ? (user as any).userDetails : null;
  const navigate = useNavigate();
  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
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
  const handleSave = async () => {
    const errors = validateForm(formData);
    if(Object.keys(errors).length > 0){
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...errors,
      }));
      return;
    }
    const response = await postAd({
      ...formData,
      districtId: Number(formData.districtId),
      cityId: Number(formData.cityId),
      suburbId: Number(formData.suburbId),
      price: Number(formData.price),
      noPrice: formData.noPrice?.toString(),
      createdDate: new Date(),
      createdBy: JSON.parse(userDetails).userId,
      coordinate: `${marker?.lat},${marker?.lng}`,
      categoryId: selectedCategory,
      groupId: selectedGroup,
      typeId: selectedType,
      userId: String(JSON.parse(userDetails).userId),
      photo: images.join(','),
      optionalData: JSON.stringify(optionalFields)
    });
    if (response?.status === 200) {
      setSuccessModal(true);
    }
  };
  const getCityCoordinates = async () => {
    const suburbName: string | undefined = suburb.find((s: SuburbType) => s.suburbId == formData.suburbId)?.suburbName;
    if (suburbName) {
      const apiUrl = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
        suburbName
      )}&format=json`;
      try {
      const response = await axios.get(apiUrl);
      if (response.data.length > 0) {
        setMapCenter({
          lat: parseFloat(response.data[0].lat),
          lng: parseFloat(response.data[0].lon),
        });
      }
    } catch (error: any) {
      throw new Error(error);
    }
    }
  }
  useEffect(() => {
    if (postId && postType === 'edit') {
      // setUserPostData();
      const post = userPosts.find(item => item.id === Number(postId));
      if (post) {
        setFormData({
          title: post.title || "",
          districtId: post.districtId || 0,
          cityId: post.cityId || 0,
          suburbId: post.suburbId || 0,
          description: post.description || "",
          createdDate: post.createdDate || new Date(),
          photo: post.photo || "",
          noPrice: post.noPrice || "",
          price: post.price || 0,
          coordinate: post.coordinate || "",
          categoryId: post.categoryId || 0,
          groupId: post.groupId || 0,
          typeId: post.typeId || 0,
          optionalData: post.optionalData || ""
        });
      }
      setSelectedCategory(post?.categoryId || 0); 
      setSelectedGoup(post?.groupId || 0);
      setSelectedType(post?.typeId || 0);
      setMarker(post?.coordinate ? { 
        lat: parseFloat(post.coordinate.split(',')[0]), 
        lng: parseFloat(post.coordinate.split(',')[1]) 
      } : null)
      getSuburbData();
    }
    getDistrictData();
  }, []);
  console.log(suburb)
  useEffect(() => {
    getCityData();
    getSuburbData();
    getCityCoordinates();
  }, [formData.districtId, formData.cityId, formData.suburbId]);
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
              {errors.title && <p className="text-left text-red-500 text-xs">{errors.title}</p>}
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
              {errors.districtId && <p className="text-left text-red-500 text-xs">{errors.districtId}</p>}
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
              {errors.cityId && <p className="text-left text-red-500 text-xs">{errors.cityId}</p>}
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
                {suburb.map((item: SuburbType) => (
                  <option key={item.suburbId} value={item.suburbId}>
                    {item.suburbName}
                  </option>
                ))}
              </select>
              {errors.suburbId && <p className="text-left text-red-500 text-xs">{errors.suburbId}</p>}
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
            <div className="flex flex-col w-full h-[300px] pt-4 mb-6">
              <h3 className="text-md text-left">Discription</h3>
              <ReactQuill
                value={formData.description}
                onChange={(value) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    description: value,
                  }));
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    description: "",
                  }));
                }}
                theme="snow"
                className="border border-gray-300 shadow-sm h-[300px]"
              />
              {errors.description && <p className="text-left text-red-500 text-xs">{errors.description}</p>}
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
          <div className='w-full h-[400px] mt-6'>
            <h3 className="text-md font-semibold text-left mb-2">Select Location</h3>
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY || ''}>
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={mapCenter}
                zoom={10}
                onClick={(e) => { e.latLng &&
                  setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                }}
              >
                 {marker && <Marker position={marker} />}
                </GoogleMap>
            </LoadScript>
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
      <hr className='my-12'/>
      <div className="flex justify-end">
        <Button size='large' onClick={handleSave} className={`text-2xl text-white px-6 py-4 rounded-lg bg-green-500`}>
          {postType === 'add' ? 'Save' : 'Update'}
        </Button>
      </div>
      <Modal
        title="Success"
        open={successModal}
        onOk={() => {
          setSuccessModal(false);
          navigate('/user/account')
        }}
        onCancel={() => setSuccessModal(false)}
        cancelButtonProps={{ style: { display: "none" } }}>
        <p>Your ad has been successfully posted. It is under review. After approved it will published.</p>
        </Modal>
    </div>
  );
};
export default AdDetails; 