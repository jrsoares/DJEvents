import Layout from "@/components/Layout";
import { parseCookies } from "nookies";
import { getAPIClient } from "services/apiSSR";
import styles from '@/styles/Dashboard.module.css'

import DashboardEvent from "@/components/DashboardEvent";

export default function pageDashboard({ events }) {
  const deleteEvent = (id) => {
    console.log(id)
  }

  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
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