import { create } from 'zustand';
import { EducationBackground, ExperienceInfo, FormData, PersonalInfo } from './validationSchema';

interface JobAppState {
	step: number;
	formData: FormData;
	nextStep: () => void;
	prevStep: () => void;
	getTotalSteps: () => number;
	// define the functions to validate every single form
	setPersonalInfo: (data: Partial<PersonalInfo>) => void;
	setEducationBackground: (data: Partial<EducationBackground>) => void;
	setExperienceInfo: (data: Partial<ExperienceInfo>) => void;
	// function to submit the form
	submitForm: () => void;
}

const useJobAppStore = create<JobAppState>((set, get) => ({
	step: 1,
	formData: {
		personalInfo: {
			firstName: '',
			lastName: '',
			phone: '',
			email: '',
		},
		experienceInfo: {
			fresher: false,
			experiences: [],
		},
		educationBackground: {
			educations: [
				{
					courseName: '',
					schoolName: '',
					yearOfCompletion: '',
				},
			],
		},
	},
	nextStep: () =>
		set(state => ({
			step: state.step + 1,
		})),
	prevStep: () =>
		set(state => ({
			step: state.step - 1,
		})),
	getTotalSteps: () => {
		return Object.keys(get().formData).length + 1; // it is the number of element in the formData object above
	},
	setPersonalInfo: data =>
		set(state => ({
			formData: {
				...state.formData,
				personalInfo: {
					...state.formData.personalInfo,
					...data,
				},
			},
		})),
	setExperienceInfo: data =>
		set(state => ({
			formData: {
				...state.formData,
				experienceInfo: {
					...state.formData.experienceInfo,
					...data,
				},
			},
		})),
	setEducationBackground: data =>
		set(state => ({
			formData: {
				...state.formData,
				educationBackground: {
					...state.formData.educationBackground,
					...data,
				},
			},
		})),
	submitForm: () =>
		set(state => {
			console.log('Form submitted Successfully!');
			console.log('Submitted Data: ', state.formData);

			return {
				step: 1,
				formData: {
					personalInfo: {
						firstName: '',
						lastName: '',
						phone: '',
						email: '',
					},
					experienceInfo: {
						fresher: false,
						experiences: [],
					},
					educationBackground: {
						educations: [
							{
								courseName: '',
								schoolName: '',
								yearOfCompletion: '',
							},
						],
					},
				},
			};
		}),
}));

export default useJobAppStore;
