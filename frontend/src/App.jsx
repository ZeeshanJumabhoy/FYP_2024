import React from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { useAuthStore } from './Helper/store'
 
//  Import All Components and Pages
import Homepage from './Main/Homepage'
import Register from './Pages/Register'
import Username from './Pages/Username'
import Password from './Pages/Password'
import Recovery from './Pages/Recovery'
import Reset from './Pages/Reset'
import Profile from './Pages/Profile'
import PageNotFound from './Pages/PageNotFound'
import FamilyRegistration from './Pages/familyRegistration';
import RegisterOTP from './Pages/RegisterOTP'
import RequestBlood from './Pages/RequestBlood'
import RequestBloodInfo from './Pages/RequestBloodInfo'
import Questions from './Pages/Questions';
import Poster from './Pages/Poster';

// Protect Route from unauthorized access
const ProtectRoute = ({ route, children }) => {
  if (route === 'Profile') {
    const token = localStorage.getItem('token')
    if (token) return children
  } else {
    const username = useAuthStore.getState().auth.username
    if (username) return children
  }

  // If it's unauthorized access then redirect it to root route
  return <Navigate to={'/'} replace={true}></Navigate>
}

const router = createBrowserRouter([
  {
    path:'/',
    element:<Poster/>,
  },
  {
    path: '/Username',
    element: <Username />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/verification',
    element: <RegisterOTP />,
  },
  {
    path: '/family-register',
    element: <FamilyRegistration />,
  },
  {
    path: '/password',
    element: (
      <ProtectRoute route="Password">
        <Password />
      </ProtectRoute>
    ),
  },
  {
    path: '/recovery',
    element: (
      <ProtectRoute route="recovery">
        <Recovery />
      </ProtectRoute>
    ),
  },
  {
    path: '/reset',
    element: (
      <ProtectRoute route="reset">
        <Reset />
      </ProtectRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectRoute route="Profile">
        <Profile />
      </ProtectRoute>
    ),
  },
  {
    path: '/RequestBlood',
    element: (
      <ProtectRoute route="RequestBlood">
        <RequestBlood />
      </ProtectRoute>
    ),
  },
  {
    path: '/RequestBloodInfo',
    element: (
      <ProtectRoute route="RequestBloodInfo">
        <RequestBloodInfo />
      </ProtectRoute>
    ),
  },
  {
    path: '/Questions',
    element: (
      <ProtectRoute route="Questions">
        <Questions />
      </ProtectRoute>
    ),
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
])

export default function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  )
}
 