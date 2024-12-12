import { MdLocationPin } from "react-icons/md";
import { TbCoinTakaFilled } from "react-icons/tb";

const HotJobCard = ({ job }) => {
    const { title, company, company_logo, requirements, description, location, salaryRange } = job;

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="flex gap-2 m-2">
                <figure>
                    <img
                        className="w-16"
                        src={company_logo}
                        alt={title} />
                </figure>
                <div>
                    <h2 className="sm:text-2xl text-xl">{company}</h2>
                    <p className="flex items-center gap-1"><MdLocationPin />
                        {location}</p>
                </div>
            </div>
            <div className="card-body">
                <h2 className="card-title">{title}
                    <div className="badge badge-secondary">NEW</div></h2>
                <p>{description}</p>
                <div className="flex gap-2 flex-wrap">
                    {
                        requirements.map((skill, idx) => <p className="border rounded-md text-center px-2 hover:text-blue-300 hover:bg-gray-100" key={idx}>{skill}</p>)
                    }
                </div>
                <div className="card-actions justify-end items-center mt-4">
                    <p className="flex items-center gap-2"><TbCoinTakaFilled />Salary: {salaryRange.min}-{salaryRange.max}{salaryRange.currency}</p>
                    <button className="btn btn-primary">Apply</button>
                </div>
            </div>
        </div>
    );
};

export default HotJobCard;