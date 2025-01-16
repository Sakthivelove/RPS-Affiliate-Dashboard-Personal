import {
  StarIcon,
  ClipboardIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineCrown } from 'react-icons/ai';


export const sidebarMenuItems = [
  { label: "Rock Tournaments", icon: <StarIcon className="w-6 h-6" />, path: "/create-new-rock-tournament" },
  { label: "VIP Tournaments", icon: <AiOutlineCrown className="w-6 h-6" />, path: "/create-new-vip-tournament" },
  { label: "Tournament List", icon: <TableCellsIcon className="w-6 h-6" />, path: "/tournament-list" },
  { label: "Activities", icon: <ClipboardIcon className="w-6 h-6" />, path: "/activities" },
  { label: "Logout", icon: <FiLogOut className="w-6 h-6" /> },
];

