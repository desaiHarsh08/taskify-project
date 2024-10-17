import { Column } from "@/lib/task";
import { ColumnPrototype } from "@/lib/task-prototype";
import { fetchColumnPrototypeById } from "@/services/column-prototype-apis";
import { useEffect, useState } from "react";
import { fetchFile } from "@/services/column-apis";

type ColumnCardProps = {
  column: Column;
  onColumnChange: (columnPrototype: ColumnPrototype, value: unknown) => void;
};

export default function ColumnCard({
  column,
  onColumnChange,
}: ColumnCardProps) {

  const [columnPrototype, setColumnPrototype] =
    useState<ColumnPrototype | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchColumnPrototypeById(
          column.columnPrototypeId as number
        );
        setColumnPrototype(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleFileView = async (filePath: string) => {
    try {
      const response = await fetchFile(filePath);
      const blob = new Blob([response], { type: response.type });
      const url = window.URL.createObjectURL(blob);

      // Open or download depending on the MIME type
      if (blob.type.startsWith("image/") || blob.type === "application/pdf") {
        // Open in a new tab for images and PDFs
        window.open(url, "_blank");
      } else {
        // Download for other file types
        const a = document.createElement("a");
        a.href = url;
        a.download = filePath.split("/").pop() as string; // Extract file name from the path
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      // Revoke the object URL after usage
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error fetching the file:", error);
    }
  };

  const dateFormat = (date: string | Date | null) => {
    let tmpDate = new Date();
    if (date) {
      tmpDate = new Date(date);
    }
    const formattedDate = `${tmpDate.getFullYear()}-${(tmpDate.getMonth() + 1).toString().padStart(2, "0")}-${tmpDate.getDate().toString().padStart(2, "0")}`;

    return formattedDate;
  };

  return (
    columnPrototype &&
    column && (
      <div>
        <div className="mb-3 d-flex flex-column gap-2">
          <p className="mt-3 my-2">{columnPrototype.name}</p>
          {columnPrototype.columnType === "FILE" && (
            <>
              <input
                type="file"
                multiple={columnPrototype.multipleFiles}
                className="form-control"
                onChange={(e) =>
                  onColumnChange(columnPrototype, e.target.files)
                }
              />
            </>
          )}

          {column.fileDirectoryPaths &&
            column.fileDirectoryPaths.map((filePath) => {
                const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
              const parts = filePath.split(".");
              const fileExtension = parts[parts.length - 1];
              let fileLogo = "/file-logo-img.jpeg";
              if (fileExtension.toLowerCase() === "xlsx") {
                fileLogo = "/excel-logo-img.png";
              } else if (fileExtension.toLowerCase() === "pdf") {
                fileLogo = "/pdf-logo-img.png";
              } else if (
                fileExtension.toLowerCase() === "word" ||
                fileExtension.toLowerCase() === "docx"
              ) {
                fileLogo = "/word-logo-img.avif";
              }

              return (
                <div
                  className="d-flex my-3"
                  onClick={() => handleFileView(filePath)}
                >
                  <div className="p-2" style={{ cursor: "pointer" }}>
                    <img
                      src={fileLogo}
                      alt=""
                      width={70}
                      style={{ border: "1px solid #bcbcbc" }}
                    />
                    <p>{fileName}</p>
                  </div>
                </div>
              );
            })}
          {/* {console.log(
            column.columnPrototypeId,
            columnPrototype.id,
            columnPrototype.name,
            columnPrototype.columnType
          )} */}
          {columnPrototype.columnType === "DATE" && (
            <input
              type="date"
              className="form-control"
              value={dateFormat(column.dateValue as string)}
              onChange={(e) => onColumnChange(columnPrototype, e.target.value)}
            />
          )}

          {columnPrototype.columnType === "STRING" &&
            columnPrototype.largeText && (
              <textarea
                className="form-control"
                rows={3}
                value={column.textValue as string}
                onChange={(e) =>
                  onColumnChange(columnPrototype, e.target.value)
                }
              ></textarea>
            )}
          {columnPrototype.columnType === "STRING" &&
            !columnPrototype.largeText && (
              <input
                type="text"
                className="form-control"
                value={column.textValue as string}
                onChange={(e) =>
                  onColumnChange(columnPrototype, e.target.value)
                }
              />
            )}


{columnPrototype.columnType === "NUMBER" &&
            !columnPrototype.largeText && (
              <input
                type="number"
                className="form-control"
                value={column.numberValue as number}
                onChange={(e) =>
                  onColumnChange(columnPrototype, e.target.value)
                }
              />
            )}

{columnPrototype.columnType === "DROPDOWN" &&
            (
                <select 
                    className="form-select"
                    value={column.type as string}
                    onChange={(e) => onColumnChange(columnPrototype, e.target.value)}
                >
                    {columnPrototype.columnTypes.map((type) => (
                        <option value={type}>{type}</option>
                    ))}
                </select>
            )}

          {columnPrototype.columnType === "BOOLEAN" && (
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={column.booleanValue as boolean}
                onChange={(e) =>
                  onColumnChange(columnPrototype, e.target.checked)
                }
              />
            </div>
          )}
        </div>
      </div>
    )
  );
}
