import useJobAppStore from "@/store"

function ReviewSubmit() {
  const { prevStep, submitForm } = useJobAppStore();

  return (
    <div>
      ReviewSubmit
      <div className="flex justify-between mt-5">
        <button
          onClick={prevStep}
          className="text-blue-500 text-lg sm:text-xl"
        >
          {"\u2190"} Previous 
        </button>
        <button
          onClick={submitForm}
          className="text-white bg-blue-500 px-3 py-1 rounded-lg text-lg sm:text-xl"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default ReviewSubmit