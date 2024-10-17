package com.taskify.services;

import java.util.List;

import com.taskify.dtos.ColumnType;

public interface ColumnTypeServices {
    ColumnType createColumnType(ColumnType columnType);

    List<ColumnType> getAllColumnTypes();

    List<ColumnType> getColumnTypesByColumnPrototypeId(Long columnPrototypeId);

    ColumnType getColumnTypeById(Long id);

    ColumnType updateColumnType(ColumnType columnType);
    
    boolean deleteColumnType(Long id);
}
