package com.taskify.services.impl;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskify.dtos.ColumnType;
import com.taskify.models.ColumnTypeModel;
import com.taskify.models.prototypes.ColumnPrototypeModel;
import com.taskify.repositories.ColumnTypeRepository;
import com.taskify.services.ColumnTypeServices;

@Service
public class ColumnTypeServicesImpl implements ColumnTypeServices {

    @Autowired
    private ColumnTypeRepository columnTypeRepository;

    @Override
    public ColumnType createColumnType(ColumnType columnType) {
        ColumnPrototypeModel columnPrototypeModel = new ColumnPrototypeModel();
        columnPrototypeModel.setId(columnType.getColumnPrototypeId());
        ColumnTypeModel columnTypeModel = columnTypeRepository
                .save(new ColumnTypeModel(null, columnType.getType(), columnPrototypeModel));
        columnType.setId(columnTypeModel.getId());

        return columnType;
    }

    @Override
    public List<ColumnType> getAllColumnTypes() {
        List<ColumnTypeModel> columnTypeModels = columnTypeRepository.findAll();
        List<ColumnType> columnTypes = new ArrayList<>();
        for (ColumnTypeModel columnTypeModel : columnTypeModels) {
            columnTypes.add(new ColumnType(columnTypeModel.getId(), columnTypeModel.getType(),
                    columnTypeModel.getColumnPrototype().getId()));
        }

        return columnTypes;
    }

    @Override
    public ColumnType getColumnTypeById(Long id) {
        ColumnTypeModel columnType = columnTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ColumnType not found with id: " + id));

        return new ColumnType(id, columnType.getType(), columnType.getColumnPrototype().getId());
    }

    @Override
    public ColumnType updateColumnType(ColumnType columnType) {
        ColumnTypeModel columnTypeModel = columnTypeRepository.findById(columnType.getId())
                .orElseThrow(() -> new RuntimeException("ColumnType not found with id: " + columnType.getId()));
        columnTypeModel.setType(columnType.getType());
        columnTypeModel = this.columnTypeRepository.save(columnTypeModel);

        return new ColumnType(columnType.getId(), columnTypeModel.getType(),
                columnTypeModel.getColumnPrototype().getId());
    }

    @Override
    public boolean deleteColumnType(Long id) {
        if (!columnTypeRepository.existsById(id)) {
            return false;
        }
        columnTypeRepository.deleteById(id);
        return true;
    }

    @Override
    public List<ColumnType> getColumnTypesByColumnPrototypeId(Long columnPrototypeId) {
        ColumnPrototypeModel columnPrototypeModel = new ColumnPrototypeModel();
        columnPrototypeModel.setId(columnPrototypeId);
        List<ColumnTypeModel> columnTypeModels = this.columnTypeRepository.findByColumnPrototype(columnPrototypeModel);
        if (columnTypeModels.isEmpty()) {
            return new ArrayList<>();
        }

        List<ColumnType> columnTypes = new ArrayList<>();
        for (ColumnTypeModel columnTypeModel : columnTypeModels) {
            columnTypes.add(new ColumnType(columnTypeModel.getId(), columnTypeModel.getType(),
                    columnTypeModel.getColumnPrototype().getId()));
        }

        return columnTypes;
    }
}
