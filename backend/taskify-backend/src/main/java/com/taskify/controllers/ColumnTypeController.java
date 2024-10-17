package com.taskify.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.taskify.dtos.ColumnType;
import com.taskify.services.ColumnTypeServices;

@RestController
@RequestMapping("/api/column-types")
public class ColumnTypeController {

    @Autowired
    private ColumnTypeServices columnTypeServices;

    @PostMapping
    public ResponseEntity<ColumnType> createColumnType(@RequestBody ColumnType columnType) {
        ColumnType createdColumnType = columnTypeServices.createColumnType(columnType);
        return new ResponseEntity<>(createdColumnType, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ColumnType>> getAllColumnTypes() {
        List<ColumnType> columnTypes = columnTypeServices.getAllColumnTypes();
        return new ResponseEntity<>(columnTypes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ColumnType> getColumnTypeById(@PathVariable Long id) {
        try {
            ColumnType columnType = columnTypeServices.getColumnTypeById(id);
            return new ResponseEntity<>(columnType, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ColumnType> updateColumnType(@PathVariable Long id,
            @RequestBody ColumnType columnType) {
        try {
            columnType.setId(id);
            ColumnType updatedColumnType = columnTypeServices.updateColumnType(columnType);
            return new ResponseEntity<>(updatedColumnType, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteColumnType(@PathVariable Long id) {
        boolean isDeleted = columnTypeServices.deleteColumnType(id);
        if (isDeleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
