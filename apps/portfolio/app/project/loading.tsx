
import { ClipLoader } from "react-spinners"

export default function ProjectLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <ClipLoader color="#6366f1" size={60} speedMultiplier={0.8} />
      </div>
    </div>
  )
}
