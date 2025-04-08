import { useState } from 'react'

import DocumentViewer from './DocumentViewer'

export default function DocumentsList() {

    const [selectedDoc, setSelectedDoc] = useState(null)

    // Primjer dokumenata (kasnije zamijeni sa API-jem)

    const documents = [

        { id: 1, name: 'Moj fajl.pdf', url: '/docs/moj_fajl.pdf' },

        { id: 2, name: 'Zasticeni dokument.pdf', url: '/docs/zasticeni.pdf' },

    ]

    return (
        <div className="space-y-4">

            {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between bg-white p-4 rounded shadow">
                    <span className="font-medium">{doc.name}</span>
                    <div className="space-x-2">
                        <button

                            onClick={() => setSelectedDoc(doc)}

                            className="text-blue-600 hover:underline"
                        >

                            Pregledaj
                        </button>
                        <a

                            href={doc.url}

                            download

                            className="text-green-600 hover:underline"
                        >

                            Preuzmi
                        </a>
                    </div>
                </div>

            ))}

            {selectedDoc && <DocumentViewer document={selectedDoc} onClose={() => setSelectedDoc(null)} />}
        </div>

    )

}

