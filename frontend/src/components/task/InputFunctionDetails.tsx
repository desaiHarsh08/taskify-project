import { TFunction } from "@/lib/task";
import {
  ColumnPrototype,
  FieldPrototype,
  FunctionPrototype,
} from "@/lib/task-prototype";
import Button from "../ui/Button";
import FieldCard from "./FieldCard";
import React, { useEffect, useState } from "react";

type InputFunctionDetailsProps = {
  newFunction: TFunction;
  selectedFunctionPrototype: FunctionPrototype | null;
  setNewFunction: React.Dispatch<React.SetStateAction<TFunction | null>>;
  handleModalNavigate: (
    modalKey: "assignTask" | "selectFunction" | "inputFunctionDetails"
  ) => void;
  onAddFunction: () => Promise<void>;
  onAddAndCloseFunction: () => Promise<void>;
  setSelectedFunctionPrototype: React.Dispatch<
    React.SetStateAction<FunctionPrototype | null>
  >;
  handleFunctionDefaultSet: (fnPrototype: FunctionPrototype) => void;

};

export default function InputFunctionDetails({
  selectedFunctionPrototype,
  newFunction,
  setNewFunction,
  handleModalNavigate,
  onAddFunction,
  handleFunctionDefaultSet,
  onAddAndCloseFunction
}: InputFunctionDetailsProps) {

    console.log("selectedFunctionPrototype: ", selectedFunctionPrototype);
  const [selectedFieldPrototype, setSelectedFieldPrototype] =
    useState<FieldPrototype | null>(null);

  useEffect(() => {
    if (selectedFunctionPrototype?.choice) {
      setSelectedFieldPrototype(selectedFunctionPrototype.fieldPrototypes[0]);
      const tmpNewFnPrototype = { ...selectedFunctionPrototype };
      tmpNewFnPrototype.fieldPrototypes = [
        selectedFunctionPrototype.fieldPrototypes[0],
      ];
      handleFunctionDefaultSet(tmpNewFnPrototype);
    }
  }, [selectedFunctionPrototype]);

  const handleFunctionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewFunction((prev) => {
      if (prev) {
        return {
          ...prev,
          functionPrototypeId: prev?.functionPrototypeId,
          taskId: prev?.taskId ?? 0,
          department: prev?.department ?? "ACCOUNTS",
          [e.target.name]: e.target.value,
          createdByUserId: prev?.createdByUserId ?? 0, 
          fields: [...prev.fields],
        };
      } else {
        return newFunction;
      }
    });
  };

  const handleFieldChange = (
    fieldPrototype: FieldPrototype,
    columnPrototype: ColumnPrototype,
    value: unknown
  ) => {
    const tmpNewFn = { ...newFunction };
    tmpNewFn.fields = tmpNewFn.fields.map((field) => {
      if (field.fieldPrototypeId === fieldPrototype.id) {
        const newField = { ...field };
        newField.columns = newField.columns.map((col) => {
          if (col.columnPrototypeId === columnPrototype.id) {
            const newCol = { ...col };
            if (columnPrototype.columnType === "BOOLEAN") {
              newCol.booleanValue = value as boolean;
            } else if (columnPrototype.columnType === "FILE") {
              newCol.multipartFiles = value as File[];
              console.log("newCol.multipartFiles:", newCol.multipartFiles)
              console.log("file:", value)
            } else if (columnPrototype.columnType === "NUMBER") {
              newCol.numberValue = value as number;
            } else if (columnPrototype.columnType === "DATE") {
                newCol.dateValue = value as string;
            }  
            else {
              // String or Date
              newCol.textValue = value as string;
              console.log("here in update date")

            }

            return newCol;
          }

          return col;
        });

        return newField;
      }

      return field;
    });

    setNewFunction(tmpNewFn);
  };

  const dateFormat = (date: Date | string | null) => {
    let d = new Date();
    if (date) {
      d = new Date(date);
    }

    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files?.length > 0) {
        const tmpFn = {...newFunction}
        tmpFn.multipartFiles = Array.from(files);

        setNewFunction(tmpFn);
    }

  }

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ height: "400px" }}
    >
      <div className="overflow-y-auto" style={{ height: "350px" }}>
        <div className="">
          <h5>Description</h5>
          <p>{selectedFunctionPrototype?.description}</p>
          <span className="badge text-bg-primary my-3">
            {selectedFunctionPrototype?.department}
          </span>
        </div>
        {selectedFunctionPrototype && selectedFunctionPrototype?.functionTypes.length > 0 && <div className="mb-3">
            <select 
                className="form-select"
                value={newFunction.type as string}
                onChange={(e) => setNewFunction((prev) => ({...prev, type: e.target.value as string}) as TFunction)}
            >
                {selectedFunctionPrototype?.functionTypes.map((type) => {

                   return <option key={type}>{type}</option>
                }
                )}
            </select>
        </div>}
        <div className="my-3">
          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label my-2">
              Due Date
            </label>
            <input
              type="date"
              className="form-control"
              name="dueDate"
              id="dueDate"
              value={newFunction.dueDate && dateFormat(newFunction.dueDate as string)}
              onChange={handleFunctionChange}
            />
          </div>
          <div className="mb-3 border-bottom">
            {selectedFunctionPrototype?.choice && (
              <select
                className="form-select"
                value={selectedFieldPrototype?.title}
                onChange={(e) => {
                  const fieldProto =
                    selectedFunctionPrototype.fieldPrototypes.find(
                      (ele) => ele.title === e.target.value
                    );
                  setSelectedFieldPrototype(fieldProto as FieldPrototype);

                  const tmpNewFnPrototype = { ...selectedFunctionPrototype };
                  tmpNewFnPrototype.fieldPrototypes = [
                    fieldProto as FieldPrototype,
                  ];
                  handleFunctionDefaultSet(tmpNewFnPrototype);
                }}
              >
                {selectedFunctionPrototype.fieldPrototypes.map(
                  (fieldPrototype, fieldPrototypeIndex) => (
                    <option
                      key={`select-field-prototype-${fieldPrototypeIndex}`}
                      value={fieldPrototype.title}
                    >
                      {fieldPrototype.title}
                    </option>
                  )
                )}
              </select>
            )}
          </div>
          <div className="d-flex flex-column gap-4 py-3">
            {selectedFieldPrototype && selectedFunctionPrototype?.choice && (
              <FieldCard
                fieldPrototype={selectedFieldPrototype as FieldPrototype}
                fieldPrototypeIndex={0}
                newFunction={newFunction}
                onFieldChange={handleFieldChange}
              />
            )}
            {!selectedFunctionPrototype?.choice &&
              selectedFunctionPrototype?.fieldPrototypes.map(
                (fieldPrototype, fieldPrototypeIndex) => (
                  <FieldCard
                    key={`fieldPrototype-${fieldPrototypeIndex}`}
                    fieldPrototype={fieldPrototype}
                    fieldPrototypeIndex={fieldPrototypeIndex}
                    newFunction={newFunction}
                    onFieldChange={handleFieldChange}
                  />
                )
              )}
          </div>
        </div>
        <div className="border-top mt-5 pt-3">
            <p className="fw-bold fs-4 my-3">Optional Function fields</p>
        <div className="mb-3">
            <label htmlFor="remarks" className="form-label my-2">
                Files
            </label>
            <input
              className="form-control"
              name="fileDirectoryPath"
              onChange={handleFileChange}
            type="file"
            />
            </div>
            <div className="mb-3">
            <label htmlFor="remarks" className="form-label my-2">
                Remarks 
            </label>
            <textarea
              className="form-control"
              name="remarks"
              onChange={handleFunctionChange}
              rows={3}
              value={newFunction.remarks}
            ></textarea>
            </div>
        </div>
      </div>
      <div className="border-top align-items-center d-flex justify-content-end gap-2 p-2">
        <Button
          outline
          variant="secondary"
          onClick={() => handleModalNavigate("assignTask")}
        >
          Back
        </Button>
        <Button
          onClick={() => {
            onAddFunction();
          }}
        >
          Add
        </Button>
        <Button
            variant="secondary"
          onClick={onAddAndCloseFunction}
        >
          Add & Close
        </Button>
      </div>
    </div>
  );
}
