import React, { useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";


interface MenuItem {
  icon: ReactNode | string;
  label: string;
  path?: string; // Optional property for navigation
  action?: () => void; // Optional callback for specific actions
}


interface SidebarProps {
  menuItem: MenuItem[];
  username: string;
  actionText: string;
  actionPath: string;
  actionIcon?: string; // Optional property for the icon
  profileImageSrc?: string;
  breakIntervals?: number[];
  collapsedWidth?: string;
  expandedWidth?: string;
  onLogoutClick?: () => void; // Added onLogoutClick prop, which is an optional function
}



interface SidebarMenuListProps {
  sidebarActive: boolean;
  menuItems: MenuItem[];
  breakIntervals?: number[];
  onLogoutClick?: () => void;
}

const SidebarMenuList: React.FC<SidebarMenuListProps> = ({
  sidebarActive,
  menuItems,
  breakIntervals,
  onLogoutClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  let itemsToRender: JSX.Element[] = [];
  let itemCount = 0;
  let intervalIndex = 0;

  const iconSize = sidebarActive ? "w-6 h-6" : "w-8 h-8";

  // Set selected menu based on current path
  useEffect(() => {
    const activeMenuItem = menuItems.find((item) => {
      // Ensure item.path is defined before comparing it
      return item.path && (location.pathname === item.path || location.pathname.startsWith(item.path));
    });
    setSelectedMenu(activeMenuItem?.label || null);
  }, [location.pathname, menuItems]);



  const handleItemClick = (item: MenuItem) => {
    setSelectedMenu(item.label);
    if (item.path) {
      navigate(item.path);
    } else if (item.action) {
      item.action();
    }
    if (item.label === "Logout" && onLogoutClick) {
      onLogoutClick();
    }
  };

  return (
    <div className="mt-[0.5rem] overflow-y-auto">
      <div className={window.innerHeight < 400 ? "h-[10rem]" : "h-full"}>
        <ul>
          {menuItems.map((item, index) => {
            itemCount++;

            // Add break interval logic
            if (sidebarActive && breakIntervals && itemCount === breakIntervals[intervalIndex]) {
              itemsToRender.push(<hr key={`hr-${index}`} className="my-4" />);
              itemCount = 0;
              intervalIndex = (intervalIndex + 1) % breakIntervals.length;
            }

            itemsToRender.push(
              <li
                key={index}
                className={`flex items-center gap-[1rem] mb-[1rem] cursor-pointer ${selectedMenu === item.label ? "text-[#45F882]" : "text-white"
                  }`}
                onClick={() => handleItemClick(item)}
              >
                {typeof item.icon === "string" ? (
                  <img
                    src={item.icon}
                    alt={item.label}
                    className={`${iconSize} ${sidebarActive ? "" : "mx-auto"}`}
                  />
                ) : (
                  item.icon
                )}
                {sidebarActive && (
                  <h1 className="capitalize poppins-regular text-[1rem]">
                    {item.label}
                  </h1>
                )}
              </li>
            );

            return null;
          })}
          {/* Render items */}
          {itemsToRender}
        </ul>
      </div>
    </div>
  );
};



const profileCard = (sidebarActive: boolean, userName: string) => {
  return (
    <div
      className={`bg-gradient-to-r w-${sidebarActive ? "full" : "fit"} from-[#45F882] to-[#FFBE18] p-[1px] rounded-[0.5rem] cursor-pointer`}
    >
      <div
        className={`bg-[#0E1B22] w-${sidebarActive ? "full" : "fit"} p-[0.5rem] rounded-[0.5rem]`}
      >
        <div className="flex justify-between items-center">
          {/* Left Section */}
          <div className="flex gap-[1rem] items-center">
            <img
              src="/affiliate-panel/icons/profile_icon.png"
              alt=""
              className={`h-[20px] w-auto ${sidebarActive ? "" : "mx-auto"}`}
            />
            {sidebarActive && (
              <div>
                <h1 className="capitalize text-white poppins-regular text-[12px]">
                  {userName}
                </h1>
              </div>
            )}
          </div>

          {/* Right Section */}
          {sidebarActive && (
            <div>
              <img
                src="/icons/edit.png"
                alt="Edit Icon"
                className="h-[16px] w-[16px] cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const Sidebar: React.FC<SidebarProps> = ({
  username,
  menuItem,
  actionIcon,
  actionText,
  actionPath,
  breakIntervals,
  collapsedWidth = 'w-[5%]',
  expandedWidth = 'w-[22%]',
  onLogoutClick // Accept the onLogoutClick as a prop
}) => {
  const { sidebarActive, toggleSidebar, setSidebarActive } = useSidebar(); // Access the context
  const navigate = useNavigate();

  // Handle window resizing and set sidebar state based on the window width
  useEffect(() => {
    const screenWidthListener = () => {
      if (window.innerWidth >= 768) {
        setSidebarActive(true);  // Ensure sidebar is active on large screens
      } else {
        setSidebarActive(false); // Hide sidebar on smaller screens
      }
    };

    screenWidthListener(); // Initial check on mount

    window.addEventListener('resize', screenWidthListener);

    return () => {
      window.removeEventListener('resize', screenWidthListener);
    };
  }, [setSidebarActive]);

  return (
    <div
      className={`absolute top-0 left-0 min-h-screen ${sidebarActive ? expandedWidth : collapsedWidth
        } bg-[#0E1B22] opacity-90 flex-shrink-0`}
    >
      <div className="absolute top-0 w-full h-full px-[0.5rem] xl:px-[1rem] py-[0.857rem] flex flex-col">
        {/* <div className="flex w-full justify-center">
          {profileCard(sidebarActive, username)}
        </div> */}
        {/* 
        {sidebarActive ? (
          <div className="w-full my-[1rem]">
            <button
              className="capitalize bg-[#45F882] rounded-[5px] w-full px-[0.5rem] py-[10px] flex items-center gap-[0.5rem] poppins-bold"
              onClick={() => navigate(actionPath)}
            >
              <img
                src={actionIcon}
                alt="icon"
                className="w-5 h-5"
              />
              {actionText}
            </button>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <button
              className="bg-[#45F882] rounded-[5px] w-fit p-[0.5rem] my-[1rem] flex items-center gap-[0.5rem]"
              onClick={() => navigate(actionPath)}
            >
              <img
                src={actionIcon}
                alt="icon"
                className="w-5 h-5"
              />
              <span className="sr-only">{actionText}</span>  For accessibility 
            </button>
          </div>
        )} 
*/}

        {/* Scrollable Menu List */}
        <div className={`overflow-y-auto flex-grow scrollbar-thin ${!sidebarActive ? 'no-scrollbar' : ''}`}>
          <SidebarMenuList sidebarActive={sidebarActive} menuItems={menuItem} breakIntervals={breakIntervals} onLogoutClick={onLogoutClick} />
        </div>

      </div>

      {/* Button to toggle sidebar */}
      <div
        onClick={toggleSidebar} // Use the toggleSidebar function from context
        className="hidden md:block absolute top-[4.5rem] rounded-full p-[0.5rem] bg-[#1A1D26] -right-5 cursor-pointer"
      >
        <img src="/affiliate-panel/icons/arrow_left.png" alt="" className={sidebarActive ? "" : "rotate-180"} />
      </div>
    </div>
  );
};


export default Sidebar;
