import { useState } from 'react'
 
export default function UploadForm() {
  const [file, setFile] = useState(null)
 
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!file) return
 
    console.log("Uploading:", file)
    // Upload file i obradi ga kroz zaštitne slojeve
  }
 
  return (
<form onSubmit={handleSubmit} className="space-y-4">
<input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
<button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Pošalji dokument
</button>
</form>
  )
}