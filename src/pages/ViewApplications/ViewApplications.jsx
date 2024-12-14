import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const ViewApplications = () => {
    const jobApplications = useLoaderData();

    const handleStatusUpdate = (e, id) => {
        // console.log(e.target.value, id); //but we don't know who selected this. so we need application id.
        // now update this status in the backend

        const data = {
            status: e.target.value
        }
        fetch(`http://localhost:5000/job-applications/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    Swal.fire({
                        title: "Good job!",
                        text: "Updated successfully",
                        icon: "success"
                    });

                }
            })
    }

    return (
        <div className="min-h-screen">
            <h2>Applications for this job: {jobApplications.length} </h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Applicant Email</th>
                            <th>Resume link</th>
                            <th>Status</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jobApplications.map((application, idx) => <tr key={application._id}>
                                <th>{idx + 1}</th>
                                <td>{application.applicant_email}</td>
                                <td>{application.resume}</td>
                                <td>
                                    <select
                                        onChange={(e) => handleStatusUpdate(e, application._id)}
                                        className="select select-bordered select-sm w-full max-w-xs" defaultValue={application.status || 'Change Status'}>
                                        <option disabled >Change Status</option>
                                        <option>Under Review</option>
                                        <option>Set Interview</option>
                                        <option>Hired</option>
                                        <option>Rejected</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewApplications;