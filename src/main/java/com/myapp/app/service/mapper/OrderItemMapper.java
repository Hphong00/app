package com.myapp.app.service.mapper;

import com.myapp.app.domain.OrderItem;
import com.myapp.app.service.dto.OrderItemDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link OrderItem} and its DTO {@link OrderItemDTO}.
 */
@Mapper(componentModel = "spring")
public interface OrderItemMapper extends EntityMapper<OrderItemDTO, OrderItem> {}
