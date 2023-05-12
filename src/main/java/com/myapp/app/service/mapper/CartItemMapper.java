package com.myapp.app.service.mapper;

import com.myapp.app.domain.CartItem;
import com.myapp.app.service.dto.CartItemDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link CartItem} and its DTO {@link CartItemDTO}.
 */
@Mapper(componentModel = "spring")
public interface CartItemMapper extends EntityMapper<CartItemDTO, CartItem> {}
