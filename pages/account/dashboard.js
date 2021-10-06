import Layout from "@/components/Layout";
import { parseCookies } from "nookies";
import { getAPIClient } from "services/apiSSR";


export default function pageDashboard({ events }) {
  console.log(events)

  return (
    <Layout title='User Dashboard'>
      <div>Dashboard</div>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['djevent.token']: jwt } = parseCookies(ctx);

  if (!jwt) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  const res = await apiClient.get('/events/me');
  const events = res.data

  return {
    props: {
      events

    }
  }

}