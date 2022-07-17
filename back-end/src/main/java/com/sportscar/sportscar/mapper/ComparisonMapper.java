package com.sportscar.sportscar.mapper;

import com.sportscar.sportscar.bean.comparison;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ComparisonMapper {
    public comparison getComparison(int userID);
}
