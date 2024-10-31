export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const slug = (await params).id;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      User: {slug}
    </div>
  );
}
