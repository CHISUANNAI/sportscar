package com.sportscar.sportscar.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sportscar.sportscar.bean.ReceiveProduct;
import com.sportscar.sportscar.bean.ReceiveProductDetail;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
@Mapper
public interface ReceiveProductDetailMapper extends BaseMapper<ReceiveProductDetail> {
    //根据小订单ID查询收货详情状态
    @Select("SELECT * FROM sportscar.receive_product_detail where(sub_orderID=#{SubOrderID});")
    ReceiveProductDetail selectReceiveByID(Integer SubOrderID);

    //根据说收货单ID查询所有收货详情状态
    @Select("SELECT * FROM sportscar.receive_product_detail where(receiveID=#{receiveID});")
    List<ReceiveProductDetail> selectAllReceiveByID(Integer receiveID);

}
