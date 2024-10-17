package com.taskify.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskify.dtos.FunctionType;
import com.taskify.services.FunctionTypeServices;

@RestController
@RequestMapping("/api/function-types")
public class FunctionTypeController {

    @Autowired
    private FunctionTypeServices functionTypeServices;

    @PostMapping
    public ResponseEntity<FunctionType> createFunctionType(@RequestBody com.taskify.dtos.FunctionType functionType) {
        FunctionType createdFunctionType = functionTypeServices.createFunctionType(functionType);
        return ResponseEntity.ok(createdFunctionType);
    }

    // Get all FunctionTypes
    @GetMapping
    public ResponseEntity<List<FunctionType>> getAllFunctionTypes() {
        List<FunctionType> functionTypes = functionTypeServices.getAllFunctionTypes();
        return ResponseEntity.ok(functionTypes);
    }

    // Get a FunctionType by ID
    @GetMapping("/{id}")
    public ResponseEntity<FunctionType> getFunctionTypeById(@PathVariable Long id) {
        FunctionType functionType = functionTypeServices.getFunctionTypeById(id);
        return ResponseEntity.ok(functionType);
    }

    // Update a FunctionType
    @PutMapping("/{id}")
    public ResponseEntity<FunctionType> updateFunctionType(@PathVariable Long id,
            @RequestBody FunctionType functionType) {
        functionType.setId(id); // Ensure the ID is set
        FunctionType updatedFunctionType = functionTypeServices.updateFunctionType(functionType);
        return ResponseEntity.ok(updatedFunctionType);
    }

}
