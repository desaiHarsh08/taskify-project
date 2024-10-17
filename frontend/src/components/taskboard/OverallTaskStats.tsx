import { FiType } from "react-icons/fi";
import { IoIosPeople } from "react-icons/io";
import { MdLibraryAdd } from "react-icons/md";
import { SiTask } from "react-icons/si";

import CreateNewTask from "./CreateNewTask";
import { useEffect, useState } from "react";
import { TaskStats } from "@/lib/task-stats";
import { fetchStats } from "@/services/task-apis";
import MyToast from "../ui/MyToast";
import { RiAlarmWarningFill } from "react-icons/ri";

export default function OverallTaskStats() {
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getTaskStats();
  }, []);

  const getTaskStats = async () => {
    try {
      const response = await fetchStats();
      console.log(response);
      setStats(response);
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div id="overall-task-stats">
      <div className={`card stat-card`}>
        <div className="card-header">Task Action</div>
        <div className="card-body">
          <p className="card-text fs-5 d-flex gap-2 align-items-center">
            <MdLibraryAdd />
            <span className="fw-semibold">New Task</span>
          </p>
          <p className="card-text">Create a new task</p>
        </div>
        <div className="px-3 pb-3">
          <CreateNewTask
            setShowMessage={setMessage}
            setShowToast={setShowToast}
          />
        </div>
      </div>
      <div className={`card stat-card`}>
        <div className="card-header">Task Stats</div>
        <div className="card-body">
          <p className="card-text fs-5 d-flex gap-2 align-items-center">
            <SiTask />
            <span className="fw-semibold">All Tasks</span>
          </p>
          <p className="card-text">Since June 12, 2024</p>
        </div>
        <div className="px-3 pb-3">
          <span className="fs-4">{stats?.tasks}</span>
        </div>
      </div>
      <div className={`card stat-card`}>
        <div className="card-header">Task Stats</div>
        <div className="card-body">
          <p className="card-text fs-5 d-flex gap-2 align-items-center">
            <RiAlarmWarningFill className="text-danger" />
            <span className="fw-semibold text-danger">Overdue!</span>
          </p>
          <p className="card-text">Since June 12, 2024</p>
          <div className="px-3 pt-4">
            <span className="fs-4 text-danger">{stats?.overdueTasks}</span>
          </div>
        </div>
      </div>
      <div className={`card stat-card`}>
        <div className="card-header">Task Stats</div>
        <div className="card-body">
          <p className="card-text fs-5 d-flex gap-2 align-items-center">
            <FiType />
            <span className="fw-semibold">Task Type</span>
          </p>
          <p className="card-text">
            N ({stats?.newPumpTask}), S ({stats?.serviceTask})
          </p>
        </div>
      </div>
      <div className={`card stat-card`}>
        <div className="card-header">Customers Stats</div>
        <div className="card-body">
          <p className="card-text fs-5 d-flex gap-2 align-items-center">
            <IoIosPeople />
            <span className="fw-semibold">Customers</span>
          </p>
          <p className="card-text">Since June 12, 2024</p>
        </div>
        <div className="px-3 pb-3">
          <span className="fs-4">{stats?.customers}</span>
        </div>
      </div>
      <MyToast
        show={showToast}
        message={message}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
