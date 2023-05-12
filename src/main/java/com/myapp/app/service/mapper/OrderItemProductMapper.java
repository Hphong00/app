package com.myapp.app.service.mapper;

import com.myapp.app.domain.OrderItemProduct;
import com.myapp.app.service.dto.OrderItemProductDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link OrderItemProduct} and its DTO {@link OrderItemProductDTO}.
 */
@Mapper(componentModel = "spring")
public interface OrderItemProductMapper extends EntityMapper<OrderItemProductDTO, OrderItemProduct> {}
