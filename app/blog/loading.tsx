import { ClipLoader } from "react-spinners"
export default function BlogLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <ClipLoader color="#6366f1" size={60} speedMultiplier={0.8} />
    </div>
  )
}

