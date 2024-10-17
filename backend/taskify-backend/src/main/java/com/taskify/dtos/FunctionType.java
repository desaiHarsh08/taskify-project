package com.taskify.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FunctionType {
    private Long id;

    private String type;

    private Long functionPrototypeId;
    
}
