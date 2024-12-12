import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// Import All Components and Pages
import { useAuthStore } from './Helper/store';
import Homepage from './Main/Homepage';
import Homepage2 from './Main/Homepage';
import Register from './Pages/Register';
import Username from './Pages/Username';
import Password from './Pages/Password';
import Recovery from './Pages/Recovery';
import Reset from './Pages/Reset';
import Profile from './Pages/Profile';
import PageNotFound from './Pages/PageNotFound';
import FamilyRegistration from './Pages/familyRegistration';
import RegisterOTP from './Pages/RegisterOTP';
import RequestBlood from './Pages/RequestBlood';
import RequestBloodInfo from './Pages/RequestBloodInfo';
import BookAppointment from './Pages/BookAppointment';
import BloodRequestUpdate from './Pages/BloodRequestUpdate';
import Questions from './Pages/Questions';
import Questions2 from './Pages/Questions';
import ViewCampaign from './Pages/ViewCampaign';
import ViewCampaignUser from './Pages/ViewCampaignUser';
import ViewBloodBank from './Pages/ViewBloodBank';
import ViewBloodInventory from './Pages/ViewBloodInventory';
import EducationalPage from './Pages/EducationalPage';
import AppointmentAvailblityDetails from './Pages/AppointmentAvailblityDetails';
import UserAppointmentStatusPage from './Pages/UserAppointmentStatusPage';
import AboutUs from './Pages/AboutUs';
import Topbar from './Main/Topbar';
import Navbar from './Main/Navbar';

import Navbar2 from './Main/Navbar2';
import Footer from './Main/Footer';
import ContactUsPage from './Pages/ContactUsPage';

import ManageCampaign from './Pages/ManageCampaign'
import AppointmentRequestManage from './Pages/AppointmentRequestManage'
import AddCampaign  from './Pages/AddCampaign'
import BloodInventoryManage from './Pages/BloodInventoryManage'
import Timeslotavailiblity from './Pages/Timeslotavailiblity'
import BloodBankDashboard from './Pages/BloodBankDashboard'

// Layout Component for Topbar and Navbar
const Layout = ({ children, isProtected }) => {
  return (
    <>
      <Topbar />
      {isProtected ? <Navbar2 /> : <Navbar />}
      <main>{children}</main>
      <Footer />
    </>
  );
};

// Protect Route from Unauthorized Access
const ProtectRoute = ({ route, children }) => {
  const token = localStorage.getItem('token');
  const username = useAuthStore.getState().auth.username;

  if ((route === 'Profile' && token) || (route !== 'Profile' && username)) {
    return children;
  }

  return <Navigate to="/" replace />;
};

// Define Routes
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout isProtected={false}>
        <Homepage />
      </Layout>
    ),
  },
  {
    path: '/blood-admin',
    element: (
      <Layout isProtected={false}>
        <BloodBankDashboard />
      </Layout>
    ),
  },
  {
    path: '/AboutUs',
    element: (
      <Layout isProtected={false}>
        <AboutUs />
      </Layout>
    ),
  },
  {
    path: '/ContactUsPage',
    element: (
      <Layout isProtected={false}>
        <ContactUsPage />
      </Layout>
    ),
  },
  
  {
    path: '/Reset',
    element: (
      <Layout isProtected={false}>
        <Reset />
      </Layout>
    ),
  },
  {
    path: '/Recovery',
    element: (
      <Layout isProtected={false}>
        <Recovery />
      </Layout>
    ),
  },
  {
    path: '/Username',
    element: (
      <Layout isProtected={false}>
        <Username />
      </Layout>
    ),
  },
  {
    path: '/ViewBloodBank',
    element: (
      <Layout isProtected={false}>
        <ViewBloodBank />
      </Layout>
    ),
  },
  {
    path: '/Questions',
    element: (
      <Layout isProtected={false}>
        <Questions />
      </Layout>
    ),
  },
  {
    path: '/register',
    element: (
      <Layout isProtected={false}>
        <Register />
      </Layout>
    ),
  },
  {
    path: '/verification',
    element: (
      <Layout isProtected={false}>
        <RegisterOTP />
      </Layout>
    ),
  },
  {
    path: '/EducationalPage',
    element: (
      <Layout isProtected={false}>
        <EducationalPage />
      </Layout>
    ),
  },
  {
    path: '/family-register',
    element: (
      <Layout isProtected={false}>
        <FamilyRegistration />
      </Layout>
    ),
  },
  {
    path: '/blood-admin/ManageCampaign',
    element: (
      <Layout isProtected={false}>
        <ManageCampaign />
      </Layout>
    ),
  },
  {
    path: '/AppointmentRequestManage',
    element: (
      <Layout isProtected={false}>
        <AppointmentRequestManage />
      </Layout>
    ),
  },
  {
    path: '/blood-admin/AddCampaign',
    element: (
      <Layout isProtected={false}>
        <AddCampaign />
      </Layout>
    ),
  },
  {
    path: '/blood-admin/BloodInventoryManage',
    element: (
      <Layout isProtected={false}>
        <BloodBankDashboard />
      </Layout>
    ),
  }, 
  {
    path: '/blood-admin/Timeslotavailiblity',
    element: (
      <Layout isProtected={false}>
        <Timeslotavailiblity />
      </Layout>
    ),
  },
  {
    path: '/password',
    element: (
      <Layout isProtected={true}>
        <ProtectRoute route="Password">
          <Password />
        </ProtectRoute>
      </Layout>
    ),
  },
  {
    path: '/Homepage2',
    element: (
      <Layout isProtected={true}>
        <ProtectRoute route="Homepage2">
          <Homepage2 />
        </ProtectRoute>
      </Layout>
    ),
  },
  {
    path: '/Questions2',
    element: (
      <Layout isProtected={true}>
        <ProtectRoute route="Questions2">
          <Questions2 />
        </ProtectRoute>
      </Layout>
    ),
  },
  {
    path: '/profile',
    element: (
      <Layout isProtected={true}>
        <ProtectRoute route="Profile">
          <Profile />
        </ProtectRoute>
      </Layout>
    ),
  },
  {
    path: '/ViewCampaignUser',
    element: (
      <Layout isProtected={true}>
        <ProtectRoute route="ViewCampaignUser">
          <ViewCampaignUser />
        </ProtectRoute>
      </Layout>
    ),
  },
  {
    path: '/ViewBloodInventory',
    element: (
      <Layout isProtected={true}>
        <ProtectRoute route="ViewBloodInventory">
          <ViewBloodInventory />
        </ProtectRoute>
      </Layout>
    ),
  },
  {
    path: '/UserAppointmentStatusPage',
    element: (
      <Layout isProtected={true}>
        <ProtectRoute route="UserAppointmentStatusPage">
          <UserAppointmentStatusPage />
        </ProtectRoute>
      </Layout>
    ),
  },
  {
    path: '/BookAppointment',
    element: (
      <Layout isProtected={true}>
        <ProtectRoute route="BookAppointment">
          <BookAppointment />
        </ProtectRoute>
      </Layout>
    ),
  },
  {
    path: '/BloodRequestUpdate',
    element: (
      <Layout isProtected={true}>
        <ProtectRoute route="BloodRequestUpdate">
          <BloodRequestUpdate />
        </ProtectRoute>
      </Layout>
    ),
  },
  {
    path: '/AppointmentAvailblityDetails',
    element: (
      <Layout isProtected={true}>
        <ProtectRoute route="AppointmentAvailblityDetails">
          <AppointmentAvailblityDetails />
        </ProtectRoute>
      </Layout>
    ),
  },
  {
    path: '/RequestBlood',
    element: (
      <Layout isProtected={true}>
        <ProtectRoute route="RequestBlood">
          <RequestBlood />
        </ProtectRoute>
      </Layout>
    ),
  },
  {
    path: '/RequestBloodInfo',
    element: (
      <Layout isProtected={true}>
        <ProtectRoute route="RequestBloodInfo">
          <RequestBloodInfo />
        </ProtectRoute>
      </Layout>
    ),
  },
  {
    path: '/ViewCampaign',
    element: (
      <Layout isProtected={false}>
        <ViewCampaign />
      </Layout>
    ),
  },
  {
    path: '*',
    element: (
      <Layout isProtected={false}>
        <PageNotFound />
      </Layout>
    ),
  },
]);

// App Component
export default function App() {
  return <RouterProvider router={router} />;
}
