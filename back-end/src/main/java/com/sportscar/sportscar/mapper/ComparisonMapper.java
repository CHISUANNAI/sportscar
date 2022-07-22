package com.sportscar.sportscar.mapper;

import com.sportscar.sportscar.bean.Comparison;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ComparisonMapper {
    public Comparison getComparison(int userID);
}
