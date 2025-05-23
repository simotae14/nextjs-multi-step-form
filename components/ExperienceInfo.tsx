import * as React from 'react';
import useJobAppStore from '@/store';
import { experienceInfoSchema, Experiences } from '@/validationSchema';
import { zodErrorsManipulation } from '@/utils/zodErrorsManipulation';
import z from 'zod';

function ExperienceInfo() {
	const { nextStep, prevStep, formData, setExperienceInfo } = useJobAppStore();

	const [errors, setErrors] = React.useState<Record<string, string[] | undefined>>({});

	const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
		const { name, value } = e.target;

		const updatedExperiences = [...formData.experienceInfo.experiences!];

		updatedExperiences[idx] = {
			...updatedExperiences[idx],
			[name]: value,
		};

		setExperienceInfo({
			experiences: updatedExperiences,
		});
	};

	const addExperience = () => {
		const newExperience = {
			numberOfYears: '',
			companyName: '',
			description: '',
		};

		const updatedExperiences = [...formData.experienceInfo.experiences!, newExperience];

		setExperienceInfo({
			experiences: updatedExperiences,
		});
	};

	const removeExperience = (idx: number) => {
		setErrors({});
		const currentExperience = [...formData.experienceInfo.experiences!];

		const newExperience: Experiences = [];

		currentExperience.filter(e => {
			if (e.companyName !== currentExperience[idx].companyName) {
				newExperience.push(e);
			}
		});
		setExperienceInfo({
			experiences: newExperience,
		});
	};

	const validateAndNext = () => {
		try {
			experienceInfoSchema.parse(formData.experienceInfo);
			setErrors({});
			nextStep();
		} catch (error: unknown) {
			if (error instanceof z.ZodError) {
				const mappedErrors = zodErrorsManipulation(error);
				setErrors(mappedErrors as Record<string, string[]>);
			}
		}
	};

	return (
		<div>
			<h2 className="text-xl font-semibold">Experience Information</h2>
			<div className="mt-5">
				{errors.genericError && (
					<div className="font-bold text-red-600">*{errors.genericError}</div>
				)}
				<div>
					<label className="text-lg font-medium text-gray-900" htmlFor="fresher">
						Are you a fresher?
					</label>
					<div className="flex items-center mt-2">
						<input
							type="checkbox"
							name="fresher"
							checked={formData.experienceInfo.fresher}
							value={formData.personalInfo.firstName}
							className="h-4 w-4 text-blue-600 bg-gray-300 ruonded focus:ring-blue-500"
							onChange={() => {
								const isFresher = !formData.experienceInfo.fresher;
								setErrors({});
								setExperienceInfo({
									fresher: isFresher,
									experiences: [], // if it is a fresher it doesn't have any experience
								});
							}}
						/>
						<span className="ml-2 text-sm text-gray-700">Yes, I am a fresher</span>
					</div>

					{/* Error container with fixed height to prevent layout shift */}
					<div className="min-h-[1.25rem] mt-1">
						{errors?.fresher && (
							<div className="text-sm text-red-600 space-y-1">
								{errors.fresher.map((error, index) => (
									<div key={index}>{error}</div>
								))}
							</div>
						)}
					</div>
				</div>
				{!formData.experienceInfo.fresher && (
					<div>
						{formData.experienceInfo.experiences?.map((experience, idx) => (
							<div
								key={idx}
								className="grid gap-6 mb-6 mt-2 md:grid-cols-2 border-gray-300 rounded-lg"
							>
								<div>
									<label className="text-lg font-medium text-gray-900" htmlFor="numberOfYears">
										Number of Years
									</label>
									<input
										type="number"
										min={1}
										name="numberOfYears"
										placeholder="Number of Years"
										value={experience.numberOfYears}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
										onChange={e => handleExperienceChange(e, idx)}
										required
									/>
									{/* Error container with fixed height to prevent layout shift */}
									<div className="min-h-[1.25rem] mt-1">
										{errors?.[`experiences.${idx}.numberOfYears`] && (
											<div className="text-sm text-red-600 space-y-1">
												{errors[`experiences.${idx}.numberOfYears`]?.map((error, index) => (
													<div key={index}>{error}</div>
												))}
											</div>
										)}
									</div>
								</div>
								<div>
									<label className="text-lg font-medium text-gray-900" htmlFor="companyName">
										Company Name
									</label>
									<input
										type="text"
										name="companyName"
										placeholder="Name of the Company"
										value={experience.companyName}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
										onChange={e => handleExperienceChange(e, idx)}
										required
									/>
									{/* Error container with fixed height to prevent layout shift */}
									<div className="min-h-[1.25rem] mt-1">
										{errors?.[`experiences.${idx}.companyName`] && (
											<div className="text-sm text-red-600 space-y-1">
												{errors[`experiences.${idx}.companyName`]?.map((error, index) => (
													<div key={index}>{error}</div>
												))}
											</div>
										)}
									</div>
								</div>
								<div>
									<label className="text-lg font-medium text-gray-900" htmlFor="description">
										Description
									</label>
									<input
										type="text"
										name="description"
										placeholder="About your experience"
										value={experience.description}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
										onChange={e => handleExperienceChange(e, idx)}
										required
									/>
									{/* Error container with fixed height to prevent layout shift */}
									<div className="min-h-[1.25rem] mt-1">
										{errors?.[`experiences.${idx}.description`] && (
											<div className="text-sm text-red-600 space-y-1">
												{errors[`experiences.${idx}.description`]?.map((error, index) => (
													<div key={index}>{error}</div>
												))}
											</div>
										)}
									</div>
								</div>
								<div className="flex justify-center items-end">
									<button
										className="text-white bg-blue-500 px-3 py-1 rounded-lg text-lg sm:text-xl"
										onClick={() => removeExperience(idx)}
									>
										Remove Experience
									</button>
								</div>
							</div>
						))}
						<button
							className="text-white bg-blue-500 px-3 py-1 rounded-lg text-lg sm:text-xl"
							onClick={addExperience}
						>
							Add More Experience
						</button>
					</div>
				)}
			</div>
			{/* buttons */}
			<div className="flex justify-between mt-5">
				<button onClick={prevStep} className="text-blue-500 text-lg sm:text-xl">
					{'\u2190'} Previous
				</button>
				<button
					onClick={validateAndNext}
					className="text-white bg-blue-500 px-3 py-1 rounded-lg text-lg sm:text-xl"
				>
					Next {'\u2192'}
				</button>
			</div>
		</div>
	);
}

export default ExperienceInfo;
