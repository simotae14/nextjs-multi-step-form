import useJobAppStore from '@/store';

function ReviewSubmit() {
	const { prevStep, submitForm, formData } = useJobAppStore();

	return (
		<div>
			<h2 className="text-xl font-bold">Review your Information</h2>
			<div>
				<h3 className="text-lg font-semibold">Personal Info</h3>
				<div className="grid gap-6 mb-6 mt-2 md:grid-cols-2 border p-2 border-gray-300 rounded-lg">
					<p>
						<span className="font-semibold">First Name:</span> {formData.personalInfo.firstName}
					</p>
					<p>
						<span className="font-semibold">Last Name:</span> {formData.personalInfo.lastName}
					</p>
					<p>
						<span className="font-semibold">Phone number:</span> {formData.personalInfo.phone}
					</p>
					<p>
						<span className="font-semibold">Email:</span> {formData.personalInfo.email}
					</p>
				</div>
			</div>
			<div>
				<h3 className="text-lg font-semibold">Experience Information</h3>
				{formData.experienceInfo.fresher ? (
					<p>fresher</p>
				) : (
					<div>
						{formData.experienceInfo.experiences?.map((experience, idx) => (
							<div
								key={idx}
								className="grid gap-6 mb-6 mt-2 md:grid-cols-2 border p-2 border-gray-300 rounded-lg"
							>
								<p>
									<span className="font-semibold">Company Name:</span> {experience.companyName}
								</p>
								<p>
									<span className="font-semibold">Number of Years Worked:</span>{' '}
									{experience.numberOfYears}
								</p>
								<p>
									<span className="font-semibold">Description:</span> {experience.description}
								</p>
							</div>
						))}
					</div>
				)}
			</div>
			<div>
				<h3 className="text-lg font-semibold">Education Background</h3>
				<div>
					{formData.educationBackground.educations?.map((education, idx) => (
						<div
							key={idx}
							className="grid gap-6 mb-6 mt-2 md:grid-cols-2 border p-2 border-gray-300 rounded-lg"
						>
							<p>
								<span className="font-semibold">Course Name:</span> {education.courseName}
							</p>
							<p>
								<span className="font-semibold">School Name:</span> {education.schoolName}
							</p>
							<p>
								<span className="font-semibold">Year Of Completion:</span>{' '}
								{education.yearOfCompletion}
							</p>
						</div>
					))}
				</div>
			</div>
			<div className="flex justify-between mt-5">
				<button onClick={prevStep} className="text-blue-500 text-lg sm:text-xl">
					{'\u2190'} Previous
				</button>
				<button
					onClick={submitForm}
					className="text-white bg-blue-500 px-3 py-1 rounded-lg text-lg sm:text-xl"
				>
					Submit
				</button>
			</div>
		</div>
	);
}

export default ReviewSubmit;
