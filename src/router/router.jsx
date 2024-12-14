import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import JobDetails from "../pages/JobDetails/JobDetails";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../pages/JobApply/JobApply";
import MyApplications from "../pages/MyApplications/MyApplications";
import AddJob from "../pages/AddJob/AddJob";
import MyPostedJobs from "../pages/MyPostedJobs/MyPostedJobs";
import ViewApplications from "../pages/ViewApplications/ViewApplications";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <h2>Route not found</h2>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'sign-in',
                element: <SignIn />
            },
            {
                path: 'jobs/:id',
                element: <PrivateRoute>
                    <JobDetails />
                </PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/jobs/${params.id}`)
            },
            {
                path: 'jobApply/:id',
                element: <PrivateRoute>
                    <JobApply />
                </PrivateRoute>
            },
            {
                path: 'myApplications',
                element: <PrivateRoute>
                    <MyApplications />
                </PrivateRoute>
            },
            {
                path: 'addJob',
                element: <PrivateRoute>
                    <AddJob />
                </PrivateRoute>
            },
            {
                path: 'myPostedJobs',
                element: <PrivateRoute>
                    <MyPostedJobs />
                </PrivateRoute>
            },
            {
                path: 'viewApplications/:job_id',
                // jehetu amra application er id dekhtesi na, tai job er id use kore kara kara apply korse dekhte chacchi.
                element: <PrivateRoute>
                    <ViewApplications />
                </PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/job-applications/jobs/${params.job_id}`)
            }

        ]
    },
]);

export default router;
