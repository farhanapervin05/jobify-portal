import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Login, Register, DashboardLayout, AllJobs, AddJob, Profile, Admin, PublicLayout, JobDetails, MyApplications, EditJob } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/home-landing' element={<Home />} />
          <Route path='/jobs-listing' element={<AllJobs isPublic={true} />} />
          <Route path='/job/:id' element={<JobDetails />} />
        </Route>
        <Route path='/user-authentication' element={<Login />} />
        <Route path='/user-registration' element={<Register />} />
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='edit-job/:id' element={<EditJob />} />
          <Route path='profile' element={<Profile />} />
          <Route path='admin' element={<Admin />} />
          <Route path='applications' element={<MyApplications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
