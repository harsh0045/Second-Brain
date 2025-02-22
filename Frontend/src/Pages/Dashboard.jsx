import React, { useEffect } from 'react'
import { Button } from '../Components/Button';
import Sidebar from '../Components/Sidebar';
import { ContentModal } from '../Components/ContentModal';
import { ShareIcon } from '../Icons/ShareIcon';
import { PlusIcon } from '../Icons/PlusIcon';
import { Card } from '../Components/Card';
import { useState } from 'react';
import { useContent } from '../hooks/useContent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ShareHashModal from '../Components/ShareHashModal';


import LogoutIcon from '../Icons/LogoutIcon';

import OtherBrainModal from '../Components/OtherBrainModal';

import { Logowithtext } from '../Components/Logowithtext';
import { LeftIcon } from '../Icons/LeftIcon';
import MenuIcon from '../Icons/MenuIcon';
import CrossIcon from '../Icons/CrossIcon';
import toast from 'react-hot-toast';
import { UserIcon } from '../Icons/User';
import { SidebarIcon } from '../Icons/SidebarIcon';


const Dashboard = () => {
  const navigate = useNavigate();
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const { contents, refresh } = useContent();
  const [deleteId, setDeleteId] = useState("");
  const [hashModalOpen, setHashModalOpen] = useState(false);
  const [otherBrainModalOpen, setOtherBrainModalOpen] = useState(false);
  const [otherBrainOpen, setOtherBrainOpen] = useState(false);
  const [otherEmail, setOtherEmail] = useState("");
  const [otherContent, setOtherContent] = useState([]);
  const [otherHash, setOtherHash] = useState("");
  const [firstName, setFirstName] = useState("");
  const [brainType, setBrainType] = useState("");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false)

  useEffect(() => {
    (prev) => setMenuOpen(!prev);
  }, [menuOpen]);

  async function check() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/profile`,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        })
      setLoading(false);

    } catch (err) {
      navigate("/signin");
    }
  }


  async function deleteContentId() {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/contents/deletecontent`,
        {
          data: {
            contentId: deleteId
          },
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
      toast.success(`Content Deleted: ${deleteId}`)
    } catch (error) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      refresh();
    }
  }

  async function userLogout() {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/logout`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      toast.success("User loged out Successfully")
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");

    }

  }


  async function getOtherBrain(hash) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/links/getlink`,
        {
          params: { hash: hash },
          headers: {
            authorization: localStorage.getItem("token"),
          },
        })

      setOtherBrainOpen(true);
      setOtherBrainModalOpen(false);
      setFirstName(response.data.firstname);
      setOtherEmail(response.data.email);
      setOtherContent(response.data.content);

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");

    }

  }
  useEffect(() => {
    check();
    const tm = setInterval(check, 10 * 60000);
    return (() => {
      clearInterval(tm);
    })

  }, []);
  useEffect(() => {
    if (deleteId) {
      deleteContentId();
    }
  }, [deleteId])
  useEffect(() => {
    refresh();
  }, [contentModalOpen])
  useEffect(() => {
    setBrainType("recent");
  }, [otherBrainOpen]);

  useEffect(() => {
    if (brainType === "") setBrainType("recent");
  }, []);

  if (loading) return <div>Loading...</div>
  return (
    <div>
      <div className='md:flex hidden'><Sidebar brainType={brainType} setBrainType={setBrainType} onClose={() => setOpenSidebar(false)} typeselection={(type) => setBrainType(type)} /></div>
      {openSidebar && <Sidebar brainType={brainType} setBrainType={setBrainType} onClose={() => setOpenSidebar(false)} typeselection={(type) => setBrainType(type)} />}

      <div className="md:ml-64 ml-0 bg-gray-100 min-h-screen ">
        {!otherBrainOpen &&
          <ContentModal open={contentModalOpen} onClose={() => { setContentModalOpen(false) }} />}
        {!otherBrainOpen && <ShareHashModal open={hashModalOpen} onClose={() => { setHashModalOpen(false) }} />}
        {!otherBrainOpen && <OtherBrainModal open={otherBrainModalOpen} onClose={() => setOtherBrainModalOpen(false)} otherOpen={(hash) => { getOtherBrain(hash); setOtherHash(hash); }} />}

        {!otherBrainOpen &&
          <div className='bg-white p-4 border h-20 flex justify-between items-center'>
            {!openSidebar &&
              <div className='md:hidden'  >
                <Button variant="Secondary" onClick={() => setOpenSidebar(prev => !prev)} startIcons={<SidebarIcon />} />
              </div>
            }
            <div className='text-2xl ml-3 text-purple-600 font-semibold'>
              My Brain
            </div>
            <div className="hidden lg:flex lg:justify-end lg:items-center lg:gap-4 ">
              <Button onClick={() => setOtherBrainModalOpen(true)} variant="Secondary" text="See Other's Brain" />
              <Button onClick={() => setHashModalOpen(true)} startIcons={<ShareIcon />} variant="Secondary" text="Share Brain" />
              <Button onClick={() => { setContentModalOpen(true); }} startIcons={<PlusIcon />} variant="Secondary" text="Add Content" />
              <Button onClick={() => userLogout()} endIcons={<LogoutIcon />} variant="Primary" text="Log Out" />
            </div>
            <div className='lg:hidden'>
              <Button variant="StartingS" startIcons={<MenuIcon/>} endIcons={<UserIcon/>} onClick={() => setMenuOpen(prev => !prev)} />
            </div>

          </div>}
        {menuOpen && !otherBrainOpen &&
          <div className='w-60 right-0 fixed border-r bg-white border  shadow-md outline-slate-200    flex flex-col '>
            <div className='flex flex-row-reverse mt-2 items-center pr-2'><span onClick={() => setMenuOpen(prev => !prev)} className='p-2 cursor-pointer rounded hover:bg-gray-200'><CrossIcon /></span></div>
            <div className='pl-8 rounded w-full   py-3 text-gray-700 text-md   cursor-pointer hover:bg-purple-600 hover:text-white transition-all duration-150' onClick={() => { setMenuOpen(false); setOtherBrainModalOpen(true) }} >See Other's Brain</div>
            <div className='pl-8 rounded w-full py-3 text-gray-700 text-md   cursor-pointer hover:bg-purple-600 hover:text-white transition-all duration-150' onClick={() => { setMenuOpen(false); setHashModalOpen(true) }} >Share Brain</div>
            <div className='pl-8 rounded w-full  py-3 text-gray-700 text-md   cursor-pointer hover:bg-purple-600 hover:text-white transition-all duration-150' onClick={() => { setMenuOpen(false); setContentModalOpen(true) }} >Add Content</div>
            <hr/>
            <div className='pl-8 rounded w-full  py-3 text-gray-700 text-md flex gap-x-2 items-center   cursor-pointer hover:bg-purple-600 hover:text-white transition-all duration-150' onClick= {() => userLogout()} >Log Out <LogoutIcon /></div>
          </div>

        }
        {menuOpen && otherBrainOpen &&
          <div className='w-72 right-0 fixed border-r mt-20 bg-white border shadow-md outline-slate-200    flex flex-col '>
            <div className='flex flex-row-reverse mt-2 pr-2'><span onClick={() => setMenuOpen(prev => !prev)} className='p-2 cursor-pointer rounded hover:bg-gray-200'><CrossIcon /></span></div>
            <div className='pl-8 rounded w-full mb-2 py-2 text-purple-600 text-md font-semibold  hover:bg-purple-600 hover:text-white transition-all duration-150'  > FirstName: {firstName}</div>

            <div className='pl-8 rounded w-full my-2 py-2 text-purple-600 text-md  font-semibold  hover:bg-purple-600 hover:text-white transition-all duration-150' >Email: {otherEmail}</div>
            <div className='pl-8 rounded w-full my-2 py-2 text-purple-600 text-md font-semibold  '  >Hash:<span className='font-mono font-light bg-purple-200 rounded-sm p-1'>{otherHash}</span></div>

          </div>

        }

        {otherBrainOpen && <div className=" bg-white text-purple-600 p-4 border h-20 flex justify-between items-center gap-4">
          {!openSidebar &&
            <div className='lg:hidden'>
              <Button variant="Primary" startIcons={<MenuIcon />} onClick={() => setOpenSidebar(prev => !prev)} />
            </div>
          }
          <div className='flex gap-6'>
            <div className=' px-2 flex justify-center items-center hover:cursor-pointer hover:bg-purple-200 hover:rounded-lg' onClick={() => setOtherBrainOpen(false)}>
              <LeftIcon />
            </div>
            <div className='hidden lg:flex lg:text-2xl  lg:font-semibold'>{firstName}'s Brain</div>
          </div>

          <div className='lg:flex text-purple-600 hidden'>{firstName}'s Hash: <span className='font-mono bg-purple-200 rounded-sm p-1'>{otherHash}</span></div>
          <div className='lg:flex hidden'><Logowithtext startTexts={otherEmail} /></div>
          <div onClick={() => setMenuOpen(prev => !prev)} className='lg:hidden bg-purple-600 text-white hover:bg-purple-500 py-2 px-4 rounded cursor-pointer '>
            See Details
          </div>
        </div>}


        <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
          {!otherBrainOpen &&
            (() => {
              const filteredContents = contents?.slice().reverse().filter(({ type }) => type === brainType || brainType === "recent");

              return filteredContents.length > 0 ? (
                filteredContents.map(({ title, type, link, _id }) => (
                  <Card key={_id} type={type} link={link} title={title} onDelete={() => setDeleteId(_id)} />
                ))
              ) : (
                <div className="col-span-full  flex flex-col items-center justify-center text-center">
                  <img src="empty.png" width={200} alt="" />
                  <div className="font-medium text-gray-600">
                    No content available in <span className="text-purple-600">{brainType}</span>
                  </div>
                </div>
              );
            })()}

          {otherBrainOpen &&
            (() => {
              const filteredContents = otherContent?.slice().reverse().filter(({ type }) => type === brainType || brainType === "recent");

              return filteredContents.length > 0 ? (
                filteredContents.map(({ title, type, link, _id }) => (
                  <Card key={_id} type={type} link={link} title={title} />
                ))
              ) : (
                <div className="col-span-full  flex flex-col items-center justify-center text-center">
                  <img src="empty.png" width={200} alt="" />
                  <div className="font-medium text-gray-600 ">
                    No content available in <span className="text-purple-600">{brainType}</span>
                  </div>
                </div>
              );
            })()}
        </div>
      </div>

    </div>

  )
}

export default Dashboard
