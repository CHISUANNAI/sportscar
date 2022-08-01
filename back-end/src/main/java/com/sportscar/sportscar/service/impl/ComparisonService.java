package com.sportscar.sportscar.service.impl;

import com.sportscar.sportscar.bean.Comparison;
import com.sportscar.sportscar.mapper.ComparisonMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComparisonService {
    @Autowired
    ComparisonMapper comparisonmapper;
    public Comparison getComparisonById(int userID){
        return comparisonmapper.getComparison(userID);
    }
    public int addComparison(Comparison comparison){return comparisonmapper.addComparison(comparison);}
    public int addComparisonAll(List<Comparison> comparisonList){ return comparisonmapper.addComparisonAll(comparisonList);}
}

