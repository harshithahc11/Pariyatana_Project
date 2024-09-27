import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Suspense, lazy } from "react";
const SideBarComponent = lazy(() =>
  import("./components/navbar/SideBarComponent")
);
const HeaderBarComponent = lazy(() =>
  import("./components/navbar/HeaderBarComponent")
);
const DashboardComponent = lazy(() =>
  import("./components/dashboard/Dashboard")
);
//auth components 
const LoginComponent = lazy(() => import("./components/login/Login"));
const SignUpComponent = lazy(() => import("./components/signUp/SignUp"));
//user component
const UserManagementComponent = lazy(() =>
  import("./components/userManagement/UserManagement")
);
const UpdateUserComponent = lazy(() =>
  import("./components/userManagement/UpdateUser")
);
//company component
const CompanyManagementComponet = lazy(() =>
  import("./components/companyManagement/CompanyManagement")
);
const AddCompanyComponent = lazy(() =>
  import("./components/companyManagement/AddCompany")
);
const UpdateCompanyComponent = lazy(() =>
  import("./components/companyManagement/UpdateCompany")
);
//branch component
const BranchManagementComponent = lazy(()=>import("./components/branchManagement/BranchManagement"));
const AddBranchComponent = lazy(()=>import("./components/branchManagement/AddBranch"));
const UpdateBranchComponent = lazy(()=>import("./components/branchManagement/UpdateBranch"))
function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const isSingUpPage = location.pathname === "/SignUp";
  return (
    <>
      <div className="app">
        {!isLoginPage && !isSingUpPage && (
          <Suspense fallback={<div>Loading...</div>}>
            <SideBarComponent />
          </Suspense>
        )}
        <main className="content">
          {!isLoginPage && !isSingUpPage && (
            <Suspense fallback={<div>Loading...</div>}>
              <HeaderBarComponent />
            </Suspense>
          )}
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <Suspense fallback={<div>Loading..</div>}>
                    <LoginComponent />
                  </Suspense>
                }
              />
            </Route>
            <Route path="/pariyatan">
            
            </Route>
            <Route path="SignUp">
              <Route
                index
                element={
                  <Suspense fallback={<div>Loading..</div>}>
                    <SignUpComponent />
                  </Suspense>
                }
              />
            </Route>
            <Route path="dashboard">
              <Route
                index
                element={
                  <Suspense fallback={<div>Loading..</div>}>
                    <DashboardComponent />
                  </Suspense>
                }
              />
            </Route>

            <Route path="UserManagement">
              <Route
                index
                element={
                  <Suspense fallback={<div>Loading..</div>}>
                    <UserManagementComponent />
                  </Suspense>
                }
              />
            </Route>
            <Route path="UpdateUser/:uid">
              <Route
                index
                element={
                  <Suspense fallback={<div>Loading..</div>}>
                    <UpdateUserComponent />
                  </Suspense>
                }
              />
            </Route>
            <Route path="CompanyManagement">
              <Route
                index
                element={
                  <Suspense fallback={<div>Loading..</div>}>
                    <CompanyManagementComponet />
                  </Suspense>
                }
              />
            </Route>
            <Route path="AddCompany">
              <Route
                index
                element={
                  <Suspense fallback={<div>Loading..</div>}>
                    <AddCompanyComponent />
                  </Suspense>
                }
              />
            </Route>
            <Route path="UpdateCompany/:cid">
              <Route
                index
                element={
                  <Suspense fallback={<div>Loading..</div>}>
                    <UpdateCompanyComponent />
                  </Suspense>
                }
              />
            </Route>
            <Route path="BranchManagement" element={<Suspense fallback={<div>Loading..</div>}><BranchManagementComponent/></Suspense>}/>
            <Route path="AddBranchComponent" element={<Suspense fallback={<div>Loading..</div>}><AddBranchComponent/></Suspense>}/>
            <Route path="UpdateBranchComponent/:bid" element={<Suspense fallback={<div>Loading..</div>}><UpdateBranchComponent/></Suspense>}/>
            <Route path="*" element={<div>Page Not Found..</div>} />
          </Routes>
        </main>
      </div>
    </>
  );
}
export default App;
