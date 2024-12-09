import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/SideBar";
import { sidebarMenuItems } from "../data/sideBarMenuItems";
import Modal from "../components/common/Modal";
import { useAuth } from "../context/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    content: "",
    type: "success" as "success" | "error", // Default type is success
  });
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    severity: "success" as "success" | "error", // Default to success
  });

  // Handle Logout Click
  const handleLogoutClick = () => {
    setModalContent({
      title: "Confirm Logout",
      content: "Are you sure you want to log out?",
      type: "error", // Using error type for logout confirmation
    });
    setLogoutModalOpen(true);
  };

  // Confirm logout
  const handleConfirmLogout = () => {
    setLogoutModalOpen(false);

    // Perform logout actions
    console.log("Logging out user...");

    // Clear user data from context
    setUser(null);

    // Remove auth token from local storage
    localStorage.removeItem("token");

    // Clear session storage if needed
    sessionStorage.clear();

    // Show success snackbar
    setSnackbar({
      isOpen: true,
      message: "Logged out successfully.",
      severity: "success",
    });

    // Redirect to login page
    navigate("/login");
  };

  // Handle Close Modal
  const handleCloseLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, isOpen: false }));
  };

  // Routes that should not display the sidebar
  const routesWithoutSidebar = [
    "/signup",
    "/login",
    "/verify-2fa",
    "/forgot-password",
    "/reset-password",
    "/404",
  ];

  const showSidebar = !routesWithoutSidebar.includes(location.pathname);

  return (
    <div
      className="bg-cover bg-no-repeat bg-center min-h-screen flex w-screen"
      style={{ backgroundImage: "url(/background.png)" }}
    >
      {showSidebar && (
        <Sidebar
          username="Admin"
          onLogoutClick={handleLogoutClick} // Pass the handleLogoutClick here
          menuItem={sidebarMenuItems}
          actionIcon={"/icons/affiliate_2.png"}
          actionText={"Dashboard"}
          actionPath={"/dashboard"}
        />
      )}
      <div className="flex-grow">{children}</div>

      {/* Modal for Logout Confirmation */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={handleCloseLogoutModal}
        title={modalContent.title}
        content={modalContent.content}
        onConfirm={handleConfirmLogout}
        type={modalContent.type}
        buttons={[
          {
            text: "Yes",
            onClick: handleConfirmLogout,
            image: "green", // Custom styling
          },
          {
            text: "No",
            onClick: handleCloseLogoutModal,
            image: "yellow", // Custom styling
          },
        ]}
      />

      {/* MUI Snackbar for Notifications */}
      <Snackbar
        open={snackbar.isOpen}
        autoHideDuration={3000} // Auto close after 3 seconds
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Position
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Layout;
