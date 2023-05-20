import { useRouter } from "next/router";
import useSWR from "swr";
import { Loading } from "@/components/Common/Loading";
import { NoteItem } from "@/components/Common/NoteItem";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

export const DiscussionList = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useSWR(id ? `/api/boards/${id}/discussion` : null);

  if (isLoading) return <Loading />;

  return (
    <ul className="mt-8 space-y-4">
      {data?.map((discussion: any) => (
        <NoteItem
          key={discussion.id}
          id={discussion.id}
          name={discussion.name}
          created_at={discussion.created_at!}
          postName="discussion"
          icon={<Square3Stack3DIcon />}
        />
      ))}
    </ul>
  );
};
