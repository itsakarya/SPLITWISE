import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import Welcome from './welcome/Welcome';
import Group from './groups/Group';
import Dashboard from './dashboard/DashboardTransaction';
import Profile from './profile/Profile';
import Summary from './summary/Summary';
import Sidebar from '../components/sidebar/Sidebar';
import AddGroup from './groups/component/AddGroup';
import ShowGroupDetails from './groupDetails/ShowGroupDetails';
import Categorical from './analytics/categoricalAnalysis/Categorical';
import AllExpenseAnalysis from './analytics/allExpenseAnalysis/AllExpenseAnalysis';
import styles from './landing.module.css';

const Landing = () => {
  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // console.log(isSidebarOpen);

  return (
    <div className={styles.landing}>
      {isSidebarOpen && <Sidebar setIsSidebarOpen={setIsSidebarOpen} />}

      <AddGroup addGroupOpen={addGroupOpen} setAddGroupOpen={setAddGroupOpen} />
      <Routes>
        <Route
          path='/'
          element={<Welcome setIsSidebarOpen={setIsSidebarOpen} />}
        />
        <Route
          path='/group'
          element={<Group setAddGroupOpen={setAddGroupOpen} />}
        />

        <Route path='/home' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/summary' element={<Summary />} />
        <Route path='/groupDetails' element={<ShowGroupDetails />} />
        <Route path='/category' element={<Categorical />} />
        <Route path='/allexpenseanalytics' element={<AllExpenseAnalysis />} />
      </Routes>
    </div>
  );
};

export default Landing;
