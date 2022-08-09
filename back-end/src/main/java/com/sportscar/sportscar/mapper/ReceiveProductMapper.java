package com.sportscar.sportscar.mapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sportscar.sportscar.bean.Procurement_order;
import com.sportscar.sportscar.bean.ReceiveProduct;
import com.sportscar.sportscar.bean.ReceiveProductDetail;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Insert;
import java.util.List;

@Mapper
public interface ReceiveProductMapper extends BaseMapper<ReceiveProduct> {
    //根据订单ID查询订单详情
    @Select("SELECT * FROM sportscar.procurement_order where(orderID=#{orderID});")
    List<Procurement_order> selectOrderByID(String orderID);

    //根据大订单ID查询大收货单
    @Select("SELECT * FROM sportscar.receive_product where(orderID=#{OrderID});")
    ReceiveProduct selectReceiveByOrderID(String OrderID);

    //查询所有收货单
    @Select("SELECT * FROM sportscar.receive_product;")
    List<ReceiveProduct> selectAllReceive();

}
