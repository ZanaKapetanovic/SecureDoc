import DocumentsList from '../components/DocumentsList'
 
export default function MyDocumentsPage() {
  return (
<div className="min-h-screen bg-gray-50 p-8">
<div className="max-w-5xl mx-auto">
<h1 className="text-3xl font-bold mb-6">Moji dokumenti</h1>
<DocumentsList />
</div>
</div>
  )
}