package com.sportscar.sportscar.service;

import com.sportscar.sportscar.bean.Comparison;
import com.sportscar.sportscar.mapper.ComparisonMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComparisonService {
    @Autowired
    ComparisonMapper comparisonmapper;
    public Comparison getComparisonById(int userID){
        return comparisonmapper.getComparison(userID);
    }
}
