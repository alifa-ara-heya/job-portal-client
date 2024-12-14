import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const AddJob = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const handleAddJob = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        // console.log(formData.entries());
        const initialData = Object.fromEntries(formData.entries());
        console.log(initialData);
        const { min, max, currency, ...newJob } = initialData;
        console.log('New job', newJob);
        newJob.salaryRange = { min, max, currency };
        console.log('Wow job', newJob);
        newJob.requirements = newJob.requirements.split('\n')
        newJob.responsibilities = newJob.responsibilities.split('\n')

        fetch('http://localhost:5000/jobs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newJob)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: "Good job!",
                        text: "Job has been added",
                        icon: "success"
                    });
                    navigate('/myPostedJobs')
                }
            })
    }
    return (
        <div>
            <h2 className="text-2xl">Post A Job</h2>

            <form className="card-body" onSubmit={handleAddJob}>

                {/* job title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Title</span>
                    </label>
                    <input type="text"
                        name="title" placeholder="Job Title" className="input input-bordered" required />
                </div>

                {/* job type */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Type</span>
                    </label>
                    <select defaultValue='Pick a Job Type' className="select select-bordered w-full" name="type">
                        <option disabled>Pick a Job Type</option>
                        <option>Full-Time</option>
                        <option>Intern</option>
                        <option>Part Time</option>
                    </select>
                </div>

                {/* job field */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Field</span>
                    </label>
                    <select className="select select-bordered w-full" name="field" defaultValue='Pick a Job Field'>
                        <option disabled>Pick a Job Field</option>
                        <option>Engineering</option>
                        <option>Marketing</option>
                        <option>Finance</option>
                        <option>Teaching</option>
                    </select>
                </div>

                {/* salary range */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="form-control">
                        <label className="label">
                            <h3 className="label-text ">Salary Range</h3>
                        </label>
                        <input type="text"
                            name='min' placeholder="Min" className="input input-bordered" required />
                    </div>
                    <div className="form-control">

                        <input type="text"
                            name='max' placeholder="Max" className="input input-bordered" required />
                    </div>

                    <div className="form-control">

                        <select defaultValue='Pick currency' className="select select-bordered w-full" name="currency">
                            <option disabled>Pick currency</option>
                            <option>BDT</option>
                            <option>USD</option>
                            <option>INR</option>
                        </select>
                    </div>
                </div>

                {/* job location */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Location</span>
                    </label>
                    <input type="text"
                        name='location' placeholder="Job Location" className="input input-bordered" required />
                </div>

                {/* hr name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">HR Name</span>
                    </label>
                    <input type="text"
                        name="hr_name" placeholder="HR Name" className="input input-bordered" required />
                </div>

                {/* application deadline */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Deadline</span>
                    </label>
                    <input type="date"
                        name="deadline" placeholder="Deadline" className="input input-bordered" required />
                </div>

                {/* hr email */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">HR Email</span>
                    </label>
                    <input type="email"
                        defaultValue={user?.email}
                        name="hr_email" placeholder="HR Email" className="input input-bordered" required />
                </div>

                {/* company name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Company Name</span>
                    </label>
                    <input type="text"
                        name="company" placeholder="company Name" className="input input-bordered" required />
                </div>

                {/*company logo url */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Company</span>
                    </label>
                    <input type="text"
                        name="company_logo" placeholder="company logo url" className="input input-bordered" required />
                </div>

                {/* job description */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Description</span>
                    </label>
                    <textarea name="description" required className="textarea textarea-bordered" placeholder="Description"></textarea>
                </div>

                {/* job requirements */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Requirements</span>
                    </label>
                    <textarea name="requirements" required className="textarea textarea-bordered" placeholder="Put each requirements in a new line"></textarea>
                </div>

                {/* job responsibilities */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job responsibilities</span>
                    </label>
                    <textarea name="responsibilities" required className="textarea textarea-bordered" placeholder="Put each responsibility in a new line"></textarea>
                </div>

                {/* submit */}

                <div className="form-control mt-6">
                    <button className="btn btn-primary">Post Job</button>
                </div>
            </form>
        </div>
    );
};

export default AddJob;