package com.taskify.services;

import java.util.List;

import com.taskify.dtos.FunctionType;

public interface FunctionTypeServices {

    FunctionType createFunctionType(FunctionType FunctionType);

    List<FunctionType> getAllFunctionTypes();

    FunctionType getFunctionTypeById(Long id);

    List<FunctionType> getFunctionTypeByFunctionPrototypeId(Long functionPrototypeId);

    FunctionType updateFunctionType(FunctionType functionType);

    boolean deleteFunctionType(Long id);

}
