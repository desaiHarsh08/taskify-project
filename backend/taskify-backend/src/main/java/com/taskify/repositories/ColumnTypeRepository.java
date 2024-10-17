package com.taskify.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskify.models.ColumnTypeModel;
import java.util.List;
import java.util.Optional;
import com.taskify.models.prototypes.ColumnPrototypeModel;


@Repository
public interface ColumnTypeRepository extends JpaRepository<ColumnTypeModel, Long> {

    List<ColumnTypeModel> findByColumnPrototype(ColumnPrototypeModel columnPrototype);

    Optional<ColumnTypeModel> findByType(String type);
}
