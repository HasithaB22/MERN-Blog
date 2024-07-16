import { Sidebar } from 'flowbite-react';
import {HiArrowSmRight} from 'react-icons/hi';
import {HiUser} from 'react-icons/hi';
import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
export default function DashSidebar() {
    const location = useLocation()
    const [tab, setTab] = useState('')
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const tabFormUrl = urlParams.get('tab');
        if (tabFormUrl) {
            setTab(tabFormUrl);
        }
    }, [location.search]);
    return (
        <Sidebar className="w-full md:w-56">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to ='/dashboard?tab=profile'>
                        <Sidebar.Item
                            active={tab === 'profile'}
                            icon={HiUser}
                            label={'User'}
                            labelColor='dark'>
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item  icon={HiArrowSmRight} classname='cursor-pointer'>
                        Sign Out
                    </Sidebar.Item>

                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
