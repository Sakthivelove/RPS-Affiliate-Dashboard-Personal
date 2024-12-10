import { useEffect } from "react";

const useResponsiveSidebar = (setSidebarActive: (state: boolean) => void) => {
    useEffect(() => {
        const handleResize = () => {
            setSidebarActive(window.innerWidth >= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [setSidebarActive]);
};

export { useResponsiveSidebar }
