package com.sportscar.sportscar.mapper;

import com.sportscar.sportscar.bean.Comparison;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface ComparisonMapper {
    public Comparison getComparison(int userID);
    int addComparison(Comparison comparison);
    int addComparisonAll(List<Comparison> comparisonList);

}
