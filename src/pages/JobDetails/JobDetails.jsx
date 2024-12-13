import { Link, useLoaderData } from "react-router-dom";

const JobDetails = () => {
    const job = useLoaderData();
    const { _id, title, company, company_logo, requirements, description, location, salaryRange, applicationDeadline } = job;

    return (
        <div>
            <h2>{title}</h2>
            <h3>Apply for: {company}</h3>
            <p>{description}</p>
            <p>Deadline: {applicationDeadline}</p>
            <Link to={`/jobApply/${_id}`}>
                <button className="btn btn-accent">Apply Now</button></Link>
        </div>
    );
};

export default JobDetails;