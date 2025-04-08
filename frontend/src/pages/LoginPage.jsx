import LoginForm from '../components/LoginForm'
 
export default function LoginPage() {
  return (
<div className="min-h-screen flex items-center justify-center bg-gray-100">
<div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
<h1 className="text-2xl font-bold mb-6 text-center">Prijava korisnika</h1>
<LoginForm />
</div>
</div>
  )
}