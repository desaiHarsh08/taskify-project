package com.taskify.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskify.models.FunctionTypeModel;
import java.util.List;
import java.util.Optional;
import com.taskify.models.prototypes.FunctionPrototypeModel;

@Repository
public interface FunctionTypeRepository extends JpaRepository<FunctionTypeModel, Long> {

    List<FunctionTypeModel> findByFunctionPrototype(FunctionPrototypeModel functionPrototype);

    Optional<FunctionTypeModel> findByType(String type);

}
