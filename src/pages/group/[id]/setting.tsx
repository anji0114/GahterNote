import { GroupLayout } from "@/components/Group/GroupLayout";
import { Layout } from "@/components/Layout";
import { useRouter } from "next/router";

const GroupSettingPage = () => {
  const router = useRouter();
  console.log(router.query.id);

  return (
    <Layout>
      <GroupLayout>
        <div>設定</div>
      </GroupLayout>
    </Layout>
  );
};

export default GroupSettingPage;