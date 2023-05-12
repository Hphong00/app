package com.myapp.app.service.mapper;

import com.myapp.app.domain.Cart;
import com.myapp.app.service.dto.CartDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Cart} and its DTO {@link CartDTO}.
 */
@Mapper(componentModel = "spring")
public interface CartMapper extends EntityMapper<CartDTO, Cart> {}
