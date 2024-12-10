import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faTrophy, faCalendarAlt, faWallet, faX, faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
import { FaTelegramPlane } from "react-icons/fa";

interface GradientCardProps {
  title: string;
  value?: string;
  imageSrc: string;
  imageAlt: string;
  fallbackIcon?: React.ReactNode;
}

const iconMapping: { [key: string]: React.ReactNode } = {
  'Total Players': <FontAwesomeIcon icon={faUsers} className="text-white text-3xl" />,
  'Tournaments': <FontAwesomeIcon icon={faTrophy} className="text-white text-3xl" />,
  'Upcoming': <FontAwesomeIcon icon={faCalendarAlt} className="text-white text-3xl" />,
  'Wallet Connection': <FontAwesomeIcon icon={faWallet} className="text-white text-3xl" />,
  'Telegram Connection': <FaTelegramPlane className="text-white text-3xl" />,
  'X Connection': <FontAwesomeIcon icon={faX} className="text-white text-3xl" />,
  'Registered Tournaments': <FontAwesomeIcon icon={faFlagCheckered} className="text-white text-3xl" />
};

const GradientCard: React.FC<GradientCardProps> = ({
  title,
  value,
  imageSrc,
  imageAlt,
  fallbackIcon,
}) => {
  return (
    <div className="bg-gradient-to-r from-[#45F882] to-[#FFBE18] p-[0.1rem] rounded-lg w-full">
      <div className="bg-[#1A1D26] h-fit py-[2rem] flex justify-center items-center gap-4 rounded-lg border-solid border-image-source[linear-gradient(90deg, #45F882 0%, #FFBE18 100%)] border-image-slice-1">
        {/* Text Section */}
        <div className="text-center flex flex-col">
          <p className="font-rajdhani text-white">{title}</p>
          <p className="font-rajdhani font-bold text-white">{value}</p>
        </div>

        {/* Icon Section with Gradient Circle */}
        <div className="relative w-[64px] h-[64px] rounded-full p-[2px] bg-gradient-to-r from-[#45F882] to-[#FFBE18]">
          <div className="flex justify-center items-center w-full h-full rounded-full bg-[#0E1B22]">
            {/* Render image or dynamically assigned icon */}
            {imageSrc ? (
              <img src={imageSrc} alt={imageAlt} className="w-[42px] h-[42px]" />
            ) : (
              fallbackIcon || (
                iconMapping[title] || (
                  <div className="w-[42px] h-[42px] flex justify-center items-center text-white">
                    {/* Default icon if no title match */}
                    <i className="fas fa-question-circle text-xl"></i>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientCard;
