export default function DocumentViewer({ document, onClose }) {
    return (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
  <div className="flex justify-between items-center mb-4">
  <h2 className="text-xl font-bold">{document.name}</h2>
  <button onClick={onClose} className="text-red-600 hover:underline">Zatvori ✖</button>
  </div>
  <iframe
            src={document.url}
            className="w-full h-[500px] border rounded"
            title="Document Preview"
          />
  </div>
  </div>
    )
  }