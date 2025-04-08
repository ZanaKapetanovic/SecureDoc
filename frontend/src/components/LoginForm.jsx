import { useState } from 'react'

export default function LoginForm() {

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {

        e.preventDefault()

        console.log({ email, password })

        // Ovdje ide poziv API-ja za prijavu

    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Email</label>
                <input

                    type="email"

                    className="w-full p-2 border rounded"

                    value={email}

                    onChange={(e) => setEmail(e.target.value)}

                    required

                />
            </div>
            <div>
                <label className="block text-sm font-medium">Lozinka</label>
                <input

                    type="password"

                    className="w-full p-2 border rounded"

                    value={password}

                    onChange={(e) => setPassword(e.target.value)}

                    required

                />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">

                Prijavi se
            </button>
        </form>

    )

}

