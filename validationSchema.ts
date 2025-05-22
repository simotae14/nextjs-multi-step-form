import { z } from 'zod'

export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(3, 'First Name is Required'),
  lastName: z
    .string()
    .min(1, 'Last Name is Required'),
  phone: z
    .string()
    .length(10, 'Phone Number must be 10 digits')
    .regex(/^\d+$/, 'Phone Number must contain only digits'),
  email: z
    .string()
    .email('Invalid email address'),
});

export const experienceInfoSchema = z.object({
  fresher: z.boolean(),
  experiences: z.array(
    z.object({
      numberOfYears: z
        .string()
        .min(1, 'Number of years is required')
        .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
          message: 'Please enter a number greater than 0 for Number of years.'
        }), // it check if it is a real number and greater than zero
      companyName: z
        .string()
        .min(3, 'Company name is required'),
      description: z
        .string()
        .min(3, 'Description is required')
    })
  ).optional(),
})
.refine((data) => {
  return data.fresher || (data.experiences && data.experiences.length > 0);
});

export const educationBackgroundSchema = z.object({
  educations: z.array(
    z.object({
      courseName: z.string().min(3, 'Course Name is required'),
      schoolName: z.string().min(3, 'School Name is required'),
      yearOfCompletion: z
        .string()
        .min(4, 'Year of Completion (YYYY) is required')
        .regex(/^\d+$/, 'Years of Completion must contain only digits')
    })
  )
  .min(1, 'At least one education is required'),
});

// Group the 3 schemas in one single schema
export const formDataSchema = z.object({
  personalInfo: personalInfoSchema,
  experienceInfo: experienceInfoSchema,
  educationBackground: educationBackgroundSchema,
});

// Define the types for the different schemas
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type ExperienceInfo = z.infer<typeof experienceInfoSchema>;
export type EducationBackground = z.infer<typeof educationBackgroundSchema>;
export type FormData = z.infer<typeof formDataSchema>;

// Define the types for the single Education and for the single Experience
export type Educations = {
  courseName: string;
  schoolName: string;
  yearOfCompletion: string;
}[];

export type Experiences = {
  numberOfYears: string;
  companyName: string;
  description: string;
}[];