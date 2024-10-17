package com.taskify.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskify.dtos.FunctionType;
import com.taskify.exceptions.ResourceNotFoundException;
import com.taskify.models.FunctionTypeModel;
import com.taskify.models.prototypes.FunctionPrototypeModel;
import com.taskify.repositories.FunctionTypeRepository;
import com.taskify.services.FunctionTypeServices;

@Service
public class FunctionTypeServicesImpl implements FunctionTypeServices {

    @Autowired
    private FunctionTypeRepository functionTypeRepository;

    @Override
    public FunctionType createFunctionType(FunctionType functionType) {
        FunctionTypeModel functionTypeModel = new FunctionTypeModel();
        functionTypeModel.setType(functionType.getType());
        FunctionPrototypeModel functionPrototypeModel = new FunctionPrototypeModel();
        functionPrototypeModel.setId(functionType.getFunctionPrototypeId());
        functionTypeModel.setFunctionPrototype(functionPrototypeModel);
        FunctionTypeModel savedModel = this.functionTypeRepository.save(functionTypeModel);
        return convertToDto(savedModel);
    }

    @Override
    public List<FunctionType> getAllFunctionTypes() {
        return this.functionTypeRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public FunctionType getFunctionTypeById(Long id) {
        FunctionTypeModel functionTypeModel = this.functionTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No function_type exist for id: " + id));
        return convertToDto(functionTypeModel);
    }

    @Override
    public FunctionType updateFunctionType(FunctionType functionType) {
        FunctionTypeModel foundFunctionTypeModel = this.functionTypeRepository.findById(functionType.getId())
                .orElseThrow(
                        () -> new ResourceNotFoundException("No function_type exist for id: " + functionType.getId()));
        foundFunctionTypeModel.setType(functionType.getType());
        FunctionTypeModel updatedModel = this.functionTypeRepository.save(foundFunctionTypeModel);
        return convertToDto(updatedModel);
    }

    @Override
    public boolean deleteFunctionType(Long id) {
        if (!functionTypeRepository.existsById(id)) {
            throw new ResourceNotFoundException("No function_type exist for id: " + id);
        }
        functionTypeRepository.deleteById(id);
        return true;
    }

    @Override
    public List<FunctionType> getFunctionTypeByFunctionPrototypeId(Long functionPrototypeId) {
        FunctionPrototypeModel functionPrototypeModel = new FunctionPrototypeModel();
        functionPrototypeModel.setId(functionPrototypeId);
        List<FunctionTypeModel> functionTypeModels = this.functionTypeRepository
                .findByFunctionPrototype(functionPrototypeModel);

        return functionTypeModels.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private FunctionType convertToDto(FunctionTypeModel model) {
        return new FunctionType(model.getId(), model.getType(), model.getFunctionPrototype().getId());
    }
}
