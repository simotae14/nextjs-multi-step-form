import useJobAppStore from '@/store';

function EducationBackground() {
	const { nextStep, prevStep } = useJobAppStore();

	return (
		<div>
			EducationBackground
			{/* buttons */}
			<div className="flex justify-between mt-5">
				<button onClick={prevStep} className="text-blue-500 text-lg sm:text-xl">
					{'\u2190'} Previous
				</button>
				<button
					onClick={nextStep}
					className="text-white bg-blue-500 px-3 py-1 rounded-lg text-lg sm:text-xl"
				>
					Next {'\u2192'}
				</button>
			</div>
		</div>
	);
}

export default EducationBackground;
