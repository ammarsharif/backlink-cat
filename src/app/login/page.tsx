import { redirect } from 'next/navigation';

// Anonymous auth now happens automatically in the background via AuthContext.
// The manual login page is no longer needed.
export default function LoginPage() {
  redirect('/');
}
