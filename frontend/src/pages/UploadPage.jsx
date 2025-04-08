import UploadForm from '../components/UploadForm'
 
export default function UploadPage() {
  return (
<div className="min-h-screen bg-gray-50 p-8">
<div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
<h1 className="text-2xl font-bold mb-4">Upload dokumenta</h1>
<UploadForm />
</div>
</div>
  )
}