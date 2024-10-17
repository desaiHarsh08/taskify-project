import Task from "@/lib/task";
import Button from "../ui/Button";
import TaskPrototype from "@/lib/task-prototype";
import React, { useEffect, useState } from "react";

type InputTaskInfoProps = {
  taskPrototypes: TaskPrototype[];
  newTask: Task;
  setNewTask: React.Dispatch<React.SetStateAction<Task>>;
  onNavigateModal: (
    modalKey: keyof {
      taskType: boolean;
      taskPriority: boolean;
      customer: boolean;
      taskInfo: boolean;
      assignTask: boolean;
      selectDepartment: boolean;
    }
  ) => void; // Define the keys in the type
};

export default function InputTaskInfo({
  onNavigateModal,
  newTask,
  setNewTask,
  taskPrototypes,
}: InputTaskInfoProps) {
  const [selectedTaskPrototype, setSelectedTaskPrototype] =
    useState<TaskPrototype | null>(null);

  useEffect(() => {
    const tmpSelectedTaskProtototype = taskPrototypes.find(
      (ele) => ele.id === newTask.taskPrototypeId
    );
    if (tmpSelectedTaskProtototype) {
      setSelectedTaskPrototype(tmpSelectedTaskProtototype);
    }
  }, [newTask.taskPrototypeId, taskPrototypes]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ height: "400px" }}
    >
      <div className="py-3 overflow-auto" style={{ height: "350px" }}>
        <div className="mb-3">
          <label htmlFor="pumpType" className="form-label">
            Pump Type
          </label>
          <input
            type="text"
            className="form-control"
            id="pumpType"
            name="pumpType"
            value={newTask.pumpType as string}
            onChange={handleChange}
          />
        </div>
        {selectedTaskPrototype?.taskType === "SERVICE_TASK" ? (
          <div className="mb-3">
            <label htmlFor="problemDescription" className="form-label">
              Problem being faced
            </label>
            <textarea
              className="form-control"
              id="problemDescription"
              name="problemDescription"
              value={newTask.problemDescription as string}
              onChange={handleChange}
            ></textarea>
          </div>
        ) : (
          <>
            <div className="mb-3">
              <label htmlFor="pumpManufacturer" className="form-label">
                Pump Manufacturer
              </label>
              <input
                type="text"
                className="form-control"
                id="pumpManufacturer"
                name="pumpManufacturer"
                value={newTask.pumpManufacturer as string}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="specifications" className="form-label">
                Specification
              </label>
              <input
                type="text"
                className="form-control"
                id="specifications"
                name="specifications"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="requirements" className="form-label">
                Requirements
              </label>
              <textarea
                className="form-control"
                id="requirements"
                rows={3}
              ></textarea>
            </div>
          </>
        )}
      </div>
      <div className="d-flex justify-content-end gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => onNavigateModal("customer")}
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={() => onNavigateModal("selectDepartment")}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
