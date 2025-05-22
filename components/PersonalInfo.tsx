import useJobAppStore from "@/store"

function PersonalInfo() {
  const { nextStep } = useJobAppStore();
  return (
    <div>
      PersonalInfo
      {/* buttons */}
      <div className="flex justify-end mt-5">
        <button
          onClick={nextStep}
          className="text-white bg-blue-500 px-3 py-1 rounded-lg text-lg sm:text-xl"
        >
          Next {"\u2192"}
        </button>
      </div>
    </div>
  )
}

export default PersonalInfo