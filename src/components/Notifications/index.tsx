import { Button, Checkbox } from 'antd';
import React from 'react'

const NotificationSettings: React.FC = () => {
  return (
      <div className='bg-white border border-gray-300 h-full rounded-lg m-8 ml-4 p-4'>
          <h1 className='text-left font-semibold text-xl'>Notification Settings</h1>
          <div className='p-4'>
              <h1 className='text-left font-semibold text-l'>System Notifications</h1>
              <hr className='mt-2'/>
              <Checkbox  className='flex p-4'>System Alerts</Checkbox>
          </div>
          <div className='p-4'>
              <h1 className='text-left font-semibold text-l'>Active Ads Notifications</h1>
              <hr className='mt-2'/>
              <Checkbox className='flex px-4 py-2'>Ad Expiration Alert</Checkbox>
                            <hr className='mt-2'/>
              <Checkbox className='flex px-4 py-2'>New Offers</Checkbox>
                            <hr className='mt-2'/>
              <Checkbox className='flex px-4 py-2'>New Enquiries</Checkbox>
                            <hr className='mt-2'/>
              <Checkbox className='flex px-4 py-2'>New Questions</Checkbox>
                            <hr className='mt-2'/>
              <Checkbox className='flex px-4 py-2'>New Followers</Checkbox>
          </div>
          <Button
              onClick={()=>{}}
              className='flex bg-green-500 text-white hover:!text-white hover:!bg-green-500 hover:!border-none'>
              Save Changes
          </Button>
    </div>
  )
}

export default NotificationSettings;