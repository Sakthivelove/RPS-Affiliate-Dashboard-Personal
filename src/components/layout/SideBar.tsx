import React,{ useState, useEffect } from "react";
import Modal from "../Modal";


const SidebarMenuList = (sidebarActive: boolean) => {
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

    const handleLogoutClick = () => {
        setLogoutModalOpen(true);
    };

    const closeLogoutModal = () => {
        setLogoutModalOpen(false);
    };

    const confirmLogout = () => {
        setLogoutModalOpen(false);
        console.log("Logged out!"); // Replace with actual logout logic
    };

    return (
        <div className="my-[2rem] overflow-y-auto">
            <div className={window.innerHeight < 400 ? "h-[10rem]" : "h-full"}>
                <ul>
                    <li className="flex items-center gap-[1rem] mb-[1rem] pb-[1rem] cursor-pointer border-b-[1px] border-[#FFFFFF]">
                        <img src="/affiliatePanel/icons/affiliateTournaments.png" alt="" className={sidebarActive ? "" : "mx-auto"} />
                        {sidebarActive ? (
                            <h1 className="capitalize text-white poppins-regular text-[1rem]">Affiliate Tournaments</h1>
                        ) : null}
                    </li>

                    <li className="flex items-center gap-[1rem] mb-[1rem] cursor-pointer">
                        <img src="/affiliatePanel/icons/tournamentDetails.png" alt="" className={sidebarActive ? "" : "mx-auto"} />
                        {sidebarActive ? (
                            <h1 className="capitalize text-white poppins-regular text-[1rem]">Tournament Details</h1>
                        ) : null}
                    </li>

                    <li className="flex items-center gap-[1rem] mb-[1rem] cursor-pointer pb-[1rem] border-b-[1px] border-[#FFFFFF]">
                        <img src="/affiliatePanel/icons/telegram.png" alt="" className={sidebarActive ? "" : "mx-auto"} />
                        {sidebarActive ? (
                            <h1 className="capitalize text-white poppins-regular text-[1rem]">Telegram Community</h1>
                        ) : null}
                    </li>

                    <li className="flex items-center gap-[1rem] mb-[1rem] cursor-pointer">
                        <img src="/affiliatePanel/icons/help.png" alt="" className={sidebarActive ? "" : "mx-auto"} />
                        {sidebarActive ? (
                            <h1 className="capitalize text-white poppins-regular text-[1rem]">Help</h1>
                        ) : null}
                    </li>

                    <li className="flex items-center gap-[1rem] mb-[1rem] cursor-pointer">
                        <img src="/affiliatePanel/icons/help.png" alt="" className={sidebarActive ? "" : "mx-auto"} />
                        {sidebarActive ? (
                            <h1 className="capitalize text-white poppins-regular text-[1rem]">Time Zone</h1>
                        ) : null}
                    </li>

                    <li className="flex items-center gap-[1rem] mb-[1rem] cursor-pointer" onClick={handleLogoutClick}>
                        <img src="/affiliatePanel/icons/logout.png" alt="" className={sidebarActive ? "" : "mx-auto"} />
                        {sidebarActive ? (
                            <h1 className="capitalize text-white poppins-regular text-[1rem]">Logout</h1>
                        ) : null}
                    </li>
                </ul>

                {/* Modal for Logout Confirmation */}
                <Modal
                    isOpen={isLogoutModalOpen}
                    onClose={closeLogoutModal}
                    title="Confirm Logout"
                    content="Are you sure you want to log out?"
                    buttons={[
                        { text: "Yes", onClick: confirmLogout, image: "green" },
                        { text: "No", onClick: closeLogoutModal, image: "yellow" },
                    ]}
                />
            </div>
        </div>
    );
};

const profileCard = (sidebarActive: boolean) => {

    return(
        <div className={`bg-gradient-to-r w-${sidebarActive? "full" : "fit"} from-[#45F882] to-[#FFBE18] p-[1px] rounded-[0.5rem] cursor-pointer`}>
            <div className={`bg-[#0E1B22] w-${sidebarActive? "full" : "fit"} p-[0.5rem] rounded-[0.5rem]`}>
                <div className="flex gap-[1rem] items-center">
                    <img src="/affiliatePanel/icons/profile_icon.png" alt="" className={`h-[20px] w-auto ${sidebarActive? " " : "mx-auto"}`} />
                    {
                        sidebarActive?
                            <div className="">
                                <h1 className="capitalize text-white poppins-regular text-[12px]">admin</h1>
                            </div>
                             
                            :

                            <></>

                    }
                </div>
            </div>
        </div>
    );
};


const Sidebar :  React.FC = () => {
    const [sidebarActive, setSidebarActive] = useState<boolean>(false);


    useEffect(() => {

        if(window.innerWidth >= 768){
            setSidebarActive(true);
        }else{
            setSidebarActive(false);
            
        };

        const screenWidthListener = () => {
            if(window.innerWidth < 768){
                setSidebarActive(false);
                // console.log("triggered", window.innerWidth);
            }
        };

        window.addEventListener('resize', screenWidthListener);

        return () => {
            window.removeEventListener('resize', screenWidthListener);
        };
 
    },[]);

    

    return(
        <div className={sidebarActive?"relative w-[70%] xl:w-[30%] bg-[#0E1B22] opacity-[90%] h-full" : "relative w-[20%] md:w-[10%] lg:w-[5%] bg-[#0E1B22] opacity-[90%] min-h-full"}>
            <div className="absolute top-0 w-full h-full px-[0.5rem] xl:px-[1rem] py-[0.857rem]">
                <div className="flex w-full justify-center">
                    {profileCard(sidebarActive)}
                </div>

                {
                    sidebarActive?
                        <div className="w-full my-[1rem]">
                            <button className="capitalize bg-[#45F882] rounded-[5px] w-full px-[28px] py-[10px] poppins-bold">Create Affiliate Tournament</button>
                        </div>
                        :
                        <div className="w-full flex justify-center">
                            
                            <button className="bg-[#45F882] rounded-[5px] w-fit p-[0.5rem] my-[1rem]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                                </svg>

                            </button>
                        </div>

                }

                {SidebarMenuList(sidebarActive)}
               
            </div>
            <div onClick={() => setSidebarActive(!sidebarActive)} className="hidden md:block absolute top-[4.5rem] rounded-full p-[0.5rem] bg-[#1A1D26] -right-5 cursor-pointer">
                <img src="/affiliatePanel/icons/arrow_left.png" alt="" className={sidebarActive? " " : "rotate-180"} />
            </div>
        </div>
    );
};



export default Sidebar;