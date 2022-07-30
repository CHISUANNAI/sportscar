package com.sportscar.sportscar.bean;

import lombok.Data;

/** 物料的实体类 */
@Data
public class Material {
    private Integer materialID;
    private String materialName;
    private String description;
    private Float weight;
    private String factory;
}
