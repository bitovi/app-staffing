import ReportTable from "./components/ReportTable";
import styles from './Dashboard.module.scss'

export default function Dashboard(): JSX.Element {


  const reportDate = new Date();

  return (
    <div className={styles.dashboard}>

      <div className={styles.dashboardTitle}>
        Bitovi Staff Management
      </div>


      <ReportTable reportDate={reportDate}/>

    </div>
  );
}
