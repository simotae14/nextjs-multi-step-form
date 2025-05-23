import * as React from 'react';
import useJobAppStore from '@/store';
import { personalInfoSchema } from '@/validationSchema';
import { zodErrorsManipulation } from '@/utils/zodErrorsManipulation';
import z from 'zod';

function PersonalInfo() {
	const { nextStep, formData, setPersonalInfo } = useJobAppStore();

	const [errors, setErrors] = React.useState<Record<string, string[] | undefined>>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPersonalInfo({ [e.target.name]: e.target.value });
	};

	const validateAndNext = () => {
		try {
			personalInfoSchema.parse(formData.personalInfo);
			setErrors({});
			nextStep();
		} catch (error: unknown) {
			if (error instanceof z.ZodError) {
				if (error instanceof z.ZodError) {
					const mappedErrors = zodErrorsManipulation(error);
					setErrors(mappedErrors as Record<string, string[]>);
				}
			}
		}
	};

	return (
		<div>
			<h2 className="text-xl font-semibold">Personal Information</h2>
			<div className="mt-5">
				<div className="grid gap-6 mb-6 md:grid-cols-2">
					<div>
						<label className="text-lg font-medium text-gray-900" htmlFor="firstName">
							First Name
						</label>
						<input
							type="text"
							name="firstName"
							placeholder="First Name"
							value={formData.personalInfo.firstName}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
							onChange={handleChange}
							required
						/>
						{/* Error container with fixed height to prevent layout shift */}
						<div className="min-h-[1.25rem] mt-1">
							{errors?.firstName && (
								<div className="text-sm text-red-600 space-y-1">
									{errors.firstName.map((error, index) => (
										<div key={index}>{error}</div>
									))}
								</div>
							)}
						</div>
					</div>
					<div>
						<label className="text-lg font-medium text-gray-900" htmlFor="lastName">
							Last Name
						</label>
						<input
							type="text"
							name="lastName"
							placeholder="Last Name"
							value={formData.personalInfo.lastName}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
							onChange={handleChange}
							required
						/>
						{/* Error container with fixed height to prevent layout shift */}
						<div className="min-h-[1.25rem] mt-1">
							{errors?.lastName && (
								<div className="text-sm text-red-600 space-y-1">
									{errors.lastName.map((error, index) => (
										<div key={index}>{error}</div>
									))}
								</div>
							)}
						</div>
					</div>
					<div>
						<label className="text-lg font-medium text-gray-900" htmlFor="phone">
							Phone Number
						</label>
						<input
							type="text"
							name="phone"
							placeholder="1234567890"
							value={formData.personalInfo.phone}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
							onChange={handleChange}
							required
						/>
						{/* Error container with fixed height to prevent layout shift */}
						<div className="min-h-[1.25rem] mt-1">
							{errors?.phone && (
								<div className="text-sm text-red-600 space-y-1">
									{errors.phone.map((error, index) => (
										<div key={index}>{error}</div>
									))}
								</div>
							)}
						</div>
					</div>
					<div>
						<label className="text-lg font-medium text-gray-900" htmlFor="email">
							Email address
						</label>
						<input
							type="email"
							name="email"
							placeholder="mike@example.com"
							value={formData.personalInfo.email}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
							onChange={handleChange}
							required
						/>
						{/* Error container with fixed height to prevent layout shift */}
						<div className="min-h-[1.25rem] mt-1">
							{errors?.email && (
								<div className="text-sm text-red-600 space-y-1">
									{errors.email.map((error, index) => (
										<div key={index}>{error}</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			{/* buttons */}
			<div className="flex justify-end mt-5">
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

export default PersonalInfo;
