import * as React from 'react';
import useJobAppStore from '@/store';
import z from 'zod';
import { zodErrorsManipulation } from '@/utils/zodErrorsManipulation';
import { educationBackgroundSchema, Educations } from '@/validationSchema';

function EducationBackground() {
	const { nextStep, prevStep, formData, setEducationBackground } = useJobAppStore();

	const [errors, setErrors] = React.useState<Record<string, string[] | undefined>>({});

	const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
		const { name, value } = e.target;

		const updatedEducations = [...formData.educationBackground.educations];

		updatedEducations[idx] = {
			...updatedEducations[idx],
			[name]: value,
		};

		setEducationBackground({
			educations: updatedEducations,
		});
	};

	const addEducation = () => {
		const newEducation = {
			courseName: '',
			schoolName: '',
			yearOfCompletion: '',
		};

		const updatedEducations = [...formData.educationBackground.educations, newEducation];

		setEducationBackground({
			educations: updatedEducations,
		});
	};

	const removeEducation = (idx: number) => {
		setErrors({});
		const currentEducations = [...formData.educationBackground.educations];

		const newEducations: Educations = [];

		currentEducations.filter(e => {
			if (e.courseName !== currentEducations[idx].courseName) {
				newEducations.push(e);
			}
		});
		setEducationBackground({
			educations: newEducations,
		});
	};

	const validateAndNext = () => {
		try {
			educationBackgroundSchema.parse(formData.educationBackground);
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
			<h2 className="text-xl font-semibold">Education Background</h2>
			{/* buttons */}
			<div className="mt-5">
				{errors.genericError ||
					(typeof errors?.educations?.[0] === 'string' && (
						<div className="font-bold text-red-600">
							*{errors.genericError || errors?.educations?.[0]}
						</div>
					))}
				<div>
					{formData.educationBackground.educations?.map((education, idx) => (
						<div
							key={idx}
							className="grid gap-6 mb-6 mt-2 md:grid-cols-2 border-gray-300 rounded-lg"
						>
							<div>
								<label className="text-lg font-medium text-gray-900" htmlFor="courseName">
									Course name
								</label>
								<input
									type="text"
									name="courseName"
									placeholder="Course Name"
									value={education.courseName}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
									onChange={e => handleEducationChange(e, idx)}
									required
								/>
								{/* Error container with fixed height to prevent layout shift */}
								<div className="min-h-[1.25rem] mt-1">
									{errors?.[`educations.${idx}.courseName`] && (
										<div className="text-sm text-red-600 space-y-1">
											{errors[`educations.${idx}.courseName`]?.map((error, index) => (
												<div key={index}>{error}</div>
											))}
										</div>
									)}
								</div>
							</div>
							<div>
								<label className="text-lg font-medium text-gray-900" htmlFor="schoolName">
									School Name
								</label>
								<input
									type="text"
									name="schoolName"
									placeholder="School Name"
									value={education.schoolName}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
									onChange={e => handleEducationChange(e, idx)}
									required
								/>
								{/* Error container with fixed height to prevent layout shift */}
								<div className="min-h-[1.25rem] mt-1">
									{errors?.[`educations.${idx}.schoolName`] && (
										<div className="text-sm text-red-600 space-y-1">
											{errors[`educations.${idx}.schoolName`]?.map((error, index) => (
												<div key={index}>{error}</div>
											))}
										</div>
									)}
								</div>
							</div>
							<div>
								<label className="text-lg font-medium text-gray-900" htmlFor="yearOfCompletion">
									Year Of Completion
								</label>
								<input
									type="number"
									min={1}
									name="yearOfCompletion"
									placeholder="YYYY"
									value={education.yearOfCompletion}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
									onChange={e => handleEducationChange(e, idx)}
									required
								/>
								{/* Error container with fixed height to prevent layout shift */}
								<div className="min-h-[1.25rem] mt-1">
									{errors?.[`educations.${idx}.yearOfCompletion`] && (
										<div className="text-sm text-red-600 space-y-1">
											{errors[`educations.${idx}.yearOfCompletion`]?.map((error, index) => (
												<div key={index}>{error}</div>
											))}
										</div>
									)}
								</div>
							</div>
							<div className="flex justify-center items-end">
								<button
									className="text-white bg-blue-500 px-3 py-1 rounded-lg text-lg sm:text-xl"
									onClick={() => removeEducation(idx)}
								>
									Remove Education
								</button>
							</div>
						</div>
					))}
					<button
						className="text-white bg-blue-500 px-3 py-1 rounded-lg text-lg sm:text-xl"
						onClick={addEducation}
					>
						Add More Education
					</button>
				</div>
			</div>
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

export default EducationBackground;
