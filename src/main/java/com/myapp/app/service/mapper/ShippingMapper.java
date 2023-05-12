package com.myapp.app.service.mapper;

import com.myapp.app.domain.Shipping;
import com.myapp.app.service.dto.ShippingDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Shipping} and its DTO {@link ShippingDTO}.
 */
@Mapper(componentModel = "spring")
public interface ShippingMapper extends EntityMapper<ShippingDTO, Shipping> {}
