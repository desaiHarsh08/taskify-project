package com.taskify.models;

import com.taskify.constants.ModelConstants;
import com.taskify.models.prototypes.ColumnPrototypeModel;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = ModelConstants.COLUMN_TYPE_TABLE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ColumnTypeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    @ManyToOne(targetEntity = ColumnPrototypeModel.class)
    @JoinColumn(name = "column_prototype_id_fk")
    private ColumnPrototypeModel columnPrototype;

}
