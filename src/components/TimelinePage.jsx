import { useParams } from "react-router-dom";
import Scheduler from "./Scheduler"; // your custom scheduler component

const TimelinePage = () => {
  const { date } = useParams();

  return (
    <div className="timeline-page">
      <h2>Timeline for {date}</h2>
      <Scheduler date={date} />
    </div>
  );
};

export default TimelinePage;
