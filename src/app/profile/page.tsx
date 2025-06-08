import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0/edge';
import Image from 'next/image';

async function ProfilePage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    // This should ideally not happen if withPageAuthRequired works correctly,
    // but it's good practice to handle it.
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          {user.picture && (
            <Image
              src={user.picture}
              alt={user.name || 'User profile picture'}
              width={80}
              height={80}
              className="rounded-full"
            />
          )}
          <div>
            <h2 className="text-2xl font-semibold">{user.name || 'N/A'}</h2>
            <p className="text-gray-600">{user.email || 'N/A'}</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Details:</h3>
          <ul className="list-disc list-inside">
            {user.nickname && <li>Nickname: {user.nickname}</li>}
            {user.org_id && <li>Organization ID: {user.org_id}</li>}
            {user.sid && <li>Session ID: {user.sid}</li>}
            {user.updated_at && <li>Profile Last Updated: {new Date(user.updated_at).toLocaleDateString()}</li>}
          </ul>
        </div>
        <pre className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-x-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default withPageAuthRequired(ProfilePage as any, {
  // Ensure that the page is dynamically rendered.
  // If you have data fetching requirements, you might need to adjust this
  // or handle loading/error states.
  returnTo: '/profile', // Optional: Where to redirect after login if they tried to access this page directly
});